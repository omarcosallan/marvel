import { api } from "../api/config";

async function handleApiResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || "An error occurred.";
    throw new Error(errorMessage);
  }
  return response.json();
}

const fetchCharacters = async (limit, offset) => {
  const URL = `${api.baseURL}/characters?orderBy=-modified&ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}&limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(URL);
    return handleApiResponse(response);
  } catch (error) {
    throw error;
  }
};

const fetchCharacter = async (id) => {
  const URL = `${api.baseURL}/characters/${id}?ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}`;

  try {
    const response = await fetch(URL);
    return handleApiResponse(response);
  } catch (error) {
    throw error;
  }
};

const fetchSeriesCharacter = async (id, limit, offset) => {
  const URL = `${api.baseURL}/characters/${id}/series?orderBy=-modified&ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}&limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(URL);
    return handleApiResponse(response);
  } catch (error) {
    throw error;
  }
};

const fetchComicsCharacter = async (id, limit, offset) => {
  const URL = `${api.baseURL}/characters/${id}/comics?orderBy=-focDate&ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}&limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(URL);
    return handleApiResponse(response);
  } catch (error) {
    throw error;
  }
};

const fetchComic = async (id, limit, offset) => {
  const URL = `${api.baseURL}/comics/${id}?ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}&limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(URL);
    return handleApiResponse(response);
  } catch (error) {
    throw error;
  }
};

const fetchSerie = async (id, limit, offset) => {
  const URL = `${api.baseURL}/series/${id}?ts=${api.timestamp}&apikey=${api.publicKey}&hash=${api.hash}&limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(URL);
    return handleApiResponse(response);
  } catch (error) {
    throw error;
  }
};

export {
  fetchCharacters,
  fetchCharacter,
  fetchSeriesCharacter,
  fetchComicsCharacter,
  fetchComic,
  fetchSerie,
};
