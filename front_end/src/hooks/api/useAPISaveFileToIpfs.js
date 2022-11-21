import axios from "axios";
import {
  pinataApiKey,
  pinataJwt,
  pinataSecretApiKey,
} from "../../utils/constants";
import { pinataPinFileUrl, pinataPinJsonUrl } from "../../utils/urls";

export const uploadFileToIpfs = async (file) => {
  if (!pinataApiKey || !pinataSecretApiKey) return alert("Cannot upload file");
  let data = new FormData();
  data.append("file", file);
  const res = await axios.post(pinataPinFileUrl, data, {
    headers: {
      Authorization: `Bearer ${pinataJwt}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });
  return res.data;
};

export const uploadJsonToIpfs = async (data) => {
  if (!pinataApiKey || !pinataSecretApiKey) return alert("Cannot upload file");
  const res = await axios.post(pinataPinJsonUrl, data, {
    headers: {
      Authorization: `Bearer ${pinataJwt}`,
      "Content-Type": "application/json",
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });
  return res.data;
};
