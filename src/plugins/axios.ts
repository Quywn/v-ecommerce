import axios from "axios";

// Tạo instance riêng
const instance = axios.create({
  baseURL: "https://api.example.com", // ⚠
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Gắn token nếu có
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // hoặc từ Vuex
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Xử lý lỗi trả về từ server
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Hiển thị lỗi cụ thể nếu có
    const message = error.response?.data?.message || "Có lỗi xảy ra";
    console.error("API Error:", message);

    // (Tuỳ chọn) nếu lỗi 401 → chuyển sang login
    if (error.response?.status === 401) {
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
