import axios from "axios";
import {getUserData, deleteUserData} from "../util/util";
import {endPoints} from "./apiEndpoint";
const baseUrl = process.env.REACT_APP_API_URL;

export const loadUserAuthData = () => {
  const loginSession = getUserData();
  if (loginSession) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginSession}`,
    };
    axiosInstance.defaults.headers = headers;
  }
};

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      deleteUserData();
      window.location.assign("/auth/login");
    }
    // if (error.response.status === 400) {
    //   return Promise.reject(error.response.data.message);
    // }
    return Promise.reject(error.response.data);
  },
);

(function () {
  loadUserAuthData();
})();

export const login = async (params) => {
  const {data} = await axiosInstance.post(`${baseUrl}${endPoints.login}`, params);
  return data;
};
export const register = async (params) => {
  const {data} = await axiosInstance.post(`${baseUrl}${endPoints.signup}`, params);
  return data[0];
};

export const getUser = async () => {
  const {data} = await axiosInstance.get(`${baseUrl}${endPoints.getUser}`);
  return data;
};
