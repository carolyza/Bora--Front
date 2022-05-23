import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:5000/",
});

export interface Category {
  id: number;
  name: string;
}

export interface SubCategory {
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

export interface DateTime {
  date: string;
  hour: string;
}

async function createArt(createData: any) {
  return await baseAPI.post("/adicionar", createData);
}

async function postTag(tags: any) {
  return await baseAPI.post("/tagsArt", tags);
}

async function patchTag(id: any, tags: any) {
  return await baseAPI.patch(`/tagsArt/${id}`, tags);
}

async function createSession(formData: any) {
  return await baseAPI.post("/sessao", formData);
}

async function createSessions(formData: any) {
  await baseAPI.post("/sessoes", formData);
}

async function getCategories() {
  return baseAPI.get<{ categories: Category[] }>("/categories");
}

async function getSubCategories() {
  return baseAPI.get<{ subcategories: SubCategory[] }>("/subcategories");
}

async function getCities(state: number) {
  return baseAPI.get(`/cities/${state}`);
}

async function getPgs() {
  return baseAPI.get<{ classifications: Pg[] }>(`/classification`);
}

async function getTagsArt(formData: any) {
  return baseAPI.get<any>("/tagsart", formData);
}

async function getMyPg(formData: any) {
  return baseAPI.get<any>("/pg/selected", formData);
}

async function getStates() {
  return baseAPI.get<{ states: State[] }>(`/states`);
}

async function getTags() {
  return baseAPI.get<{ tags: Tag[] }>(`/tags`);
}

async function getTeather(formData: any) {
  return baseAPI.get<any>(`/teatro`, formData);
}

async function getShow(formData: any) {
  return baseAPI.get<any>(`/show`, formData);
}

async function getLgbt(formData: any) {
  return baseAPI.get<any>(`/lgbtqia`, formData);
}

async function getFeminist(formData: any) {
  return baseAPI.get<any>(`/feminista`, formData);
}

async function getExpo(formData: any) {
  return baseAPI.get<any>(`/exposicao`, formData);
}

async function getEvent(formData: any) {
  return baseAPI.get<any>(`/eventos`, formData);
}

async function getDance(formData: any) {
  return baseAPI.get<any>(`/danca`, formData);
}

async function getBlackArt(formData: any) {
  return baseAPI.get<any>(`/artepreta`, formData);
}

async function getSession(formData: any) {
  return baseAPI.get<any>(`/sessao`, formData);
}

async function getSessions(sessionId: any) {
  console.log(sessionId);
  return baseAPI.get(`/sessoes/${sessionId}`);
}

const api = {
  createArt,
  getCategories,
  getCities,
  getSession,
  getSessions,
  getPgs,
  getStates,
  getTags,
  getSubCategories,
  createSession,
  postTag,
  patchTag,
  createSessions,
  getDance,
  getLgbt,
  getExpo,
  getEvent,
  getShow,
  getBlackArt,
  getTeather,
  getFeminist,
  getTagsArt,
  getMyPg,
};

export default api;
