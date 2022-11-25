import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useAPIFetchReferences } from "../../hooks/api/useAPIFetchReferences";
import { useAPIFetchTags } from "../../hooks/api/useAPIFetchTags";
import { useAPIFetchLanguages } from "../../hooks/api/useAPIFetchLanguages";
import { useAPIFetchWithTags } from "../../hooks/api/useAPIFetchWithTags";
import ReferenceList from "../ReferenceList";

export default function History() {
  const [refes, setRefes] = useState([]);
  const [_tags, setTags] = useState([]);
  const [langs, setLangs] = useState([]);
  const [tag, setTag] = useState();
  const [formInput, updateFormInput] = useState({
    language: "",
    category: "History",
    filter: "",
  });

  const { data: references, refetch: refetchReferences } =
    useAPIFetchReferences(formInput, {
      onSuccess: (res) => {
        setRefes(res);
      },
    });

  const { data: tags, refetch: refetchTags } = useAPIFetchTags(formInput, {
    onSuccess: (res) => {
      setTags(res);
    },
  });

  const { data: languages, refetch: refetchLanguages } = useAPIFetchLanguages({
    onSuccess: (res) => {
      setLangs(res.languages);
    },
  });

  const { data: referencesByTag, refetch: refetchReferencesByTag } =
    useAPIFetchWithTags(formInput, tag, {
      onSuccess: (res) => {
        if (res.length === 0) return;
        setRefes(res);
      },
    });

  useEffect(() => {
    if (!tag) return;
    refetchReferencesByTag();
  }, [tag]);

  async function refresh() {
    refetchTags();
    refetchReferences();
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <ReferenceList
      refes={refes}
      langs={langs}
      _tags={_tags}
      formInput={formInput}
      setTag={setTag}
      updateFormInput={updateFormInput}
      refresh={refresh}
      classNames={classNames}
    />
  );
}
