import axios from "axios";
import store from "@/store";
import router from "@/router";

const instance = axios.create({
  baseURL: "http://localhost:1234", // chỉnh baseURL nếu cần
});

instance.interceptors.request.use((config) => {
  const token = store.state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👉 Bắt lỗi 401 để logout tự động
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch("auth/logout");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
