import { create as ipfsHttpClient } from "ipfs-http-client"; // to connect IPFS
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useAPIFetchTags } from "../../hooks/api/useAPIFetchTags";
import { useAPIFetchLanguages } from "../../hooks/api/useAPIFetchLanguages";
import { useAPISaveNewTag } from "../../hooks/api/useAPISaveNewTag";
import { uploadFileToIpfs } from "../../hooks/api/useAPISaveFileToIpfs";
import { pinataDedicatedDomain } from "../../utils/constants";
import { useAPISaveNewReference } from "../../hooks/api/useAPISaveNewReference";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function AddReference() {
  let [refeTags, setRefeTags] = useState([]);
  const categories = [
    "Math",
    "Science",
    "Language",
    "History",
    "Sociology",
    "Geography",
    "Music",
    "Programming",
  ];
  const [reference, updateReference] = useState({
    url: "",
    title: "",
    description: "",
    language: "",
    category: "",
    tags: [],
  });
  console.log(reference);
  const [formTag, updateTag] = useState({ name: "" }); // use reference's language, category
  const [tags, setTags] = useState([]);

  const [langs, setLangs] = useState([]);
  const [flagUrlPdf, setFlag] = useState(false);
  const [file, setFile] = useState(false);

  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    refetchLanguages();
  }, []);

  useEffect(() => {
    setTimeout(() => refetchTags(), 100);
  }, [reference.language, reference.category]);

  useEffect(() => {
    setRefeTags(reference.tags);
    //console.log(refeTags)
  }, [reference]);

  const { refetch: refetchTags } = useAPIFetchTags(
    { ...reference },
    {
      onSuccess: (res) => {
        setTags(res);
      },
    }
  );

  const { refetch: refetchLanguages } = useAPIFetchLanguages({
    onSuccess: (res) => {
      setLangs(res);
    },
  });

  function addTag(tag) {
    let tags = reference.tags;
    tags.push(tag);
    console.log(tags);
    updateReference({ ...reference, tags: tags });
  }

  function removeTag(id) {
    let tags = [];
    for (let i = 0; i < reference.tags.length; i++) {
      if (reference.tags[i].id === id) {
        continue;
      }
      tags.push(reference.tags[i]);
    }
    updateReference({ ...reference, tags: tags });
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const { mutate: mutateSaveNewTag } = useAPISaveNewTag({
    onSuccess: (res) => {
      refetchTags();
      updateTag({ ...formTag, name: "" });
    },
  });

  async function createUrl(e) {
    if (!file) {
      alert("You didn't select the file yet");
      return;
    } else if (reference.url) {
      alert("You already uploaded file");
      return;
    }
    alert("This file will not be deleted. If you are fine, please confirm!");
    const res = await uploadFileToIpfs(file);
    let url = `https://${pinataDedicatedDomain}/ipfs/${res.IpfsHash}`;
    updateReference({ ...reference, url: url });
  }

  const { mutate: mutateSaveNewReference } = useAPISaveNewReference();

  const flagTag = reference.language && reference.category;

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-2/3">
        <div className="flex flex-col pb-12">
          <input
            placeholder="Title"
            className="mt-8 border rounded p-4"
            onChange={(e) =>
              updateReference({ ...reference, title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="mt-2 border rounded p-4"
            onChange={(e) =>
              updateReference({ ...reference, description: e.target.value })
            }
          />
          <div className="flex">
            <input
              placeholder="Language"
              className="mt-2 border rounded p-4"
              value={reference.language}
              onChange={(e) =>
                updateReference({ ...reference, language: e.target.value })
              }
            />
            <Menu
              as="div"
              className="relative inline-block text-left w-1/3 mt-4 ml-2"
            >
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  Language
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {langs &&
                      langs.map((lang, i) => (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              key={i}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm w-full"
                              )}
                              onClick={() =>
                                updateReference({
                                  ...reference,
                                  language: lang,
                                })
                              }
                            >
                              {lang}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="flex">
            <div className="w-2/3 flex justify-center mt-5">
              <p className="text-blue-500 text-xl">{reference.category}</p>
            </div>
            <Menu
              as="div"
              className="relative inline-block text-left w-1/3 mt-4 ml-2"
            >
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  Category
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {categories.map((cat, i) => (
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm w-full"
                            )}
                            onClick={() =>
                              updateReference({ ...reference, category: cat })
                            }
                          >
                            {cat}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="flex">
            <div className="flex flex-wrap w-2/3">
              {refeTags.map((tag, i) => (
                <button
                  key={i}
                  className="text-pink-500 hover:text-pink-700 m-1"
                  onClick={() => removeTag(tag.id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
            <Menu
              as="div"
              className="relative inline-block text-left w-1/3 mt-4 ml-2"
            >
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  Tags
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {tags.map((tag, i) => (
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm w-full"
                            )}
                            onClick={() => addTag(tag)}
                          >
                            {tag.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div className="flex">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => setFlag(false)}
            >
              URL
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ml-2 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => setFlag(true)}
            >
              PDF
            </button>
          </div>

          {flagUrlPdf && (
            <div className="flex flex-col">
              <input
                type="file"
                name="Add reference"
                className="my-4"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file && (
                <button
                  className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded"
                  onClick={createUrl}
                >
                  {reference.url
                    ? "Succeeded to upload file!"
                    : "Upload file to IPFS"}
                </button>
              )}
            </div>
          )}
          {!flagUrlPdf && (
            <input
              placeholder="Add reference's URL"
              className="mt-8 border rounded p-4"
              onChange={(e) =>
                updateReference({ ...reference, url: e.target.value })
              }
            />
          )}
          <button
            className="font-bold mt-4 bg-transparent border-2 border-pink-500 hover:border-pink-200 text-pink-700 hover:text-pink-300 rounded p-4 shadow-lg"
            onClick={() => mutateSaveNewReference({ reference })}
          >
            Provide reference
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center">
        {flagTag && (
          <div className="flex">
            <input
              placeholder="Add new tag"
              className="mt-2 border rounded p-4"
              value={formTag.name}
              onChange={(e) => updateTag({ ...formTag, name: e.target.value })}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg m-3 px-2 shadow-lg"
              onClick={() => mutateSaveNewTag({ formTag, reference })}
            >
              Add Tag
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
