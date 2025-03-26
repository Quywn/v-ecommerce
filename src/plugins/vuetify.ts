// src/plugins/vuetify.ts

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // Cấu hình màu cho theme sáng (light theme)
        primary: "#333", // Màu chính
        secondary: "#333", // Màu phụ
        accent: "#333", // Màu nhấn
        error: "#333", // Màu lỗi
        info: "#333", // Màu thông tin
        success: "#333", // Màu thành công
        warning: "#333", // Màu cảnh báo
        background: "#333",
      },
      dark: {
        // Cấu hình màu cho theme tối (dark theme)
        primary: "#333",
        secondary: "#333",
        accent: "#333",
        error: "#333",
        info: "#333",
        success: "#333",
        warning: "#333",
        background: "#333",
      },
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});
