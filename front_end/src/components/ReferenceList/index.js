import { useContext, useEffect, useState, memo } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { CloseContext, SearchContext } from "../../App";
const ReferenceList = ({
  refes,
  langs,
  _tags,
  formInput,
  setTag,
  updateFormInput,
  refresh,
  classNames,
}) => {
  const searchRef = useContext(SearchContext);
  const clickClose = useContext(CloseContext);
  return (
    <div className="flex">
      <div className="flex flex-col divide-y divide-solid w-full md:w-2/3 px-20 md:px-0">
        <h1 className="text-3xl font-bold">{formInput.category} References</h1>
        {refes.length === 0 ? (
          <h1 className="text-4xl">No references</h1>
        ) : (
          <div className="h-[600px] overflow-x-auto scroll-smooth">
            {refes.map((refe, i) => (
              <div key={i} className="w-full flex">
                <div className="w-2/3 shadow-lg">
                  <a
                    href={refe.url}
                    className="ml-2 text-2xl font-bold hover:text-pink-300"
                  >
                    {refe.title}
                  </a>
                  <p className="text-base">{refe.description}</p>
                </div>
                <div className="w-1/3 shadow-lg flex flex-col">
                  {refe.tags.map((tag, n) => (
                    <button
                      key={n}
                      className="text-blue-500 hover:text-blue-700 px-4"
                      onClick={() => setTag(tag.name)}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        ref={searchRef}
        className="absolute bg-gray-500 md:bg-transparent right-0 md:static w-screen h-screen md:w-1/3 md:h-auto mx-3 hidden md:flex flex-col items-center"
      >
        <div className="flex-container">
          <input
            placeholder="Search referece"
            className="mt-8 border rounded p-2"
            onChange={(e) =>
              updateFormInput({ ...formInput, filter: e.target.value })
            }
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 rounded text-white font-bold mx-2 px-2 pb-1 border border-blue-700"
            onClick={() => {
              refresh();
              clickClose();
            }}
          >
            search
          </button>
        </div>

        <div className="flex">
          <input
            placeholder="Set language"
            className="mt-8 border rounded p-2 w-1/2"
            value={formInput.language}
            onChange={(e) =>
              updateFormInput({ ...formInput, language: e.target.value })
            }
          />
          <Menu
            as="div"
            className="relative inline-block text-left w-1/3 mt-8 ml-2"
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                              updateFormInput({ ...formInput, language: lang })
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

        <div className="flex flex-wrap mt-3">
          {_tags.map((tag, i) => (
            <button
              key={i}
              className="text-purple-500 hover:text-purple-700 px-4"
              onClick={() => setTag(tag.name)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ReferenceList);
