import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#f3a851",
        secondary: "#ffa726",
        accent: "#82b1ff",
        error: "#e53935",
        info: "#0288d1",
        success: "#4caf50",
        warning: "#ff9800",
      },
      dark: {
        primary: "#333",
        secondary: "#ff7043",
        accent: "#8e24aa",
        error: "#ff5252",
        info: "#0288d1",
        success: "#4caf50",
        warning: "#ff9800",
      },
    },
  },
});
