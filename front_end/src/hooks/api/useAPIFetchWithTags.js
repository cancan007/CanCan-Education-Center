import { useQuery } from "react-query";

async function fetchWithTag(input, tag) {
  let data;
  const uri =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? "http://localhost:5001/api/references/tag"
      : "/api/references/tag";
  await fetch(uri, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...input, tag: tag }),
  })
    .then((res) => res.text())
    .then((res) => JSON.parse(res))
    .then((res) => {
      data = res;
    })
    .catch((err) => console.error(err));
  const items = await Promise.all(
    data.map(async (i) => {
      let tags = [];
      for (let m = 0; m < i.tags.length; m++) {
        let tag = i.tags[m].name;
        let id = i.tags[m]._id;
        tags.push({ name: tag, _id: id });
      }
      let item = {
        url: i.url,
        title: i.title,
        description: i.description,
        language: i.language,
        category: i.category,
        tags: tags,
      };
      return item;
    })
  );
  return items;
}

export const useAPIFetchWithTags = (input, tag, options) => {
  return useQuery("fetchWithTags", () => fetchWithTag(input, tag), options);
};
