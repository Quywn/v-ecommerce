import axios from "axios";

const API_URL = "http://localhost:1234/";

export const login = (username: string, password: string) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const register = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return axios.post(`${API_URL}/register`, data);
};
