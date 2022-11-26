import { useMutation } from "react-query";

async function addNewReference({ reference }) {
  if (
    !reference.url ||
    !reference.title ||
    !reference.description ||
    !reference.language ||
    !reference.category
  ) {
    alert("You have to fill all form");
    return;
  }
  let tag_ids = [];
  for (let i = 0; i < reference.tags.length; i++) {
    let tag = reference.tags[i];
    tag_ids.push(tag.id);
  }

  const uri =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? "http://localhost:5001/api/references/add"
      : "/api/references/add";

  await fetch(uri, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...reference, tags: tag_ids }),
  })
    .then((res) => res.text())
    .then((res) => {
      window.location.href = `/${reference.category.toLowerCase()}`;
    })
    .catch((err) => console.error(err));
}

export const useAPISaveNewReference = (options) => {
  return useMutation((obj) => addNewReference(obj), options);
};
