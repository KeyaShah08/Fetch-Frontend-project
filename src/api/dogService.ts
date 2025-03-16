import axios from "axios";

const BASE_URL = "https://frontend-take-home.fetch.com";

export const loginUser = async (name: string, email: string) => {
  return axios.post(`${BASE_URL}/auth/login`, { name, email }, { withCredentials: true });
};

export const fetchBreeds = async () => {
  const response = await axios.get(`${BASE_URL}/dogs/breeds`, { withCredentials: true });
  return response.data;
};

export const searchDogs = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/dogs/search?${query}`, { withCredentials: true });
  return response.data;
};

export const fetchDogsByIds = async (ids: string[]) => {
  const response = await axios.post(`${BASE_URL}/dogs`, ids, { withCredentials: true });
  return response.data;
};

export const matchDog = async (ids: string[]) => {
  const response = await axios.post(`${BASE_URL}/dogs/match`, ids, { withCredentials: true });
  return response.data.match;
};
