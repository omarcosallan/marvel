import md5 from "md5";

const baseURL = "https://gateway.marvel.com/v1/public";

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const timestamp = new Date().getTime().toString();
const hash = md5(`${timestamp}${privateKey}${publicKey}`);

export const api = {
  baseURL,
  publicKey,
  privateKey,
  timestamp,
  hash,
};
