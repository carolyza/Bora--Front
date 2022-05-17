import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:5000/",
});

export interface Category {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface State {
  id: number;
  name: string;
}

export interface Pg {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

async function createArt(createData: any) {
  await baseAPI.post("/adicionar", createData);
}

async function getCategories() {
  return baseAPI.get<{ categories: Category[] }>("/categories");
}

async function getCities(state: number) {
  return baseAPI.get(`/cities/${state}`);
}

async function getPgs() {
  return baseAPI.get<{ classifications: Pg[] }>(`/classification`);
}

async function getStates() {
  return baseAPI.get<{ states: State[] }>(`/states`);
}

async function getTags() {
  return baseAPI.get<{ tags: Tag[] }>(`/tags`);
}

const api = {
  createArt,
  getCategories,
  getCities,
  getPgs,
  getStates,
  getTags,
};

export default api;
