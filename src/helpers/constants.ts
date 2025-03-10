import { config } from "../../playwright.config";

const defaultBaseURL: string = "http://127.0.0.1:3000";
const baseURL: string = config.use?.baseURL ?? defaultBaseURL;

export const URLs = {
  login: `${baseURL}/login`,
  loads: `${baseURL}/loads`,
  createLoad: `${baseURL}/loads/create/new`,
  library: `${baseURL}/organization-library`,
  drafts: `${baseURL}/drafts`,
  generalSettings: `${baseURL}/general-settings`,
};
