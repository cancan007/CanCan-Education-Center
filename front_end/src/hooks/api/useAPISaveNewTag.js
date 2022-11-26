import { useMutation } from "react-query";

async function addPostTag({ formTag, reference }) {
  if (!formTag.name || !reference.language || !reference.category) return;
  let reqTag = {
    name: formTag.name,
    language: reference.language,
    category: reference.category,
  };
  const uri =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? "http://localhost:5001/api/tags"
      : "/api/tags";
  await fetch(uri, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqTag),
  })
    .then((res) => res.text())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

export const useAPISaveNewTag = (options) => {
  return useMutation((obj) => addPostTag(obj), options);
};
