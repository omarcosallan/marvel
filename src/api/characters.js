import { api } from "../api/config";

const baseURL = "https://gateway.marvel.com/v1/public";

const fetchMarvelData = async (URL) => {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

const fetchCharacters = async (limit, offset) => {
  const URL = `${baseURL}/characters?orderBy=-modified&ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}&limit=${limit}&offset=${offset}`;
  const data = await fetchMarvelData(URL);
  return data;
};

const fetchCharacter = async (id) => {
  const URL = `${baseURL}/characters/${id}?ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}`;
  const data = await fetchMarvelData(URL);
  return data;
};

const fetchSeriesCharacter = async (id, limit, offset) => {
  const URL = `${baseURL}/characters/${id}/series?orderBy=-modified&ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}&limit=${limit}&offset=${offset}`;
  const data = await fetchMarvelData(URL);
  return data;
};

const fetchComicsCharacter = async (id, limit, offset) => {
  const URL = `${baseURL}/characters/${id}/comics?orderBy=-focDate&ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}&limit=${limit}&offset=${offset}`;
  const data = await fetchMarvelData(URL);
  return data;
};

const fetchComic = async (id, limit, offset) => {
  const URL = `${baseURL}/comics/${id}?ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}&limit=${limit}&offset=${offset}`;
  const data = await fetchMarvelData(URL);
  return data;
};

const fetchSerie = async (id, limit, offset) => {
  const URL = `${baseURL}/series/${id}?ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}&limit=${limit}&offset=${offset}`;
  const data = await fetchMarvelData(URL);
  return data;
};

export {
  fetchCharacters,
  fetchCharacter,
  fetchSeriesCharacter,
  fetchComicsCharacter,
  fetchComic,
  fetchSerie,
};
