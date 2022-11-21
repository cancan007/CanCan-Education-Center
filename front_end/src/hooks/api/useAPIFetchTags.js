import { useQuery } from "react-query";

async function fetchTags(input) {
  let data2;
  const uri =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? "http://localhost:5001/api/tags/get"
      : "/api/tags/get";
  await fetch(uri, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...input }),
  })
    .then((res) => res.text())
    .then((res) => JSON.parse(res))
    .then((res) => {
      data2 = res;
    })
    .catch((err) => console.error(err));
  const items = await Promise.all(
    data2.map(async (i) => {
      let item = {
        name: i.name,
        language: i.language,
        category: i.category,
        id: i._id,
      };
      return item;
    })
  );
  return items;
}

export const useAPIFetchTags = (input, options) => {
  return useQuery(["fetchTags"], () => fetchTags(input), options);
};
