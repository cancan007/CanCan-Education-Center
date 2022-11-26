import { useQuery } from "react-query";

async function fetchLangs() {
  let data3;
  const uri =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? "http://localhost:5001/api/references/language"
      : "/api/references/language";
  await fetch(uri, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((res) => JSON.parse(res))
    .then((res) => {
      data3 = res;
    })
    .catch((err) => console.error(err));
  return data3.languages;
}

export const useAPIFetchLanguages = (options) => {
  return useQuery("fetchLanguages", () => fetchLangs(), options);
};
