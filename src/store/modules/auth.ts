import { Module, ActionTree, MutationTree, GetterTree } from "vuex";
import { AuthState } from "@/models/authState";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/models/jwtPayload";

const state: AuthState = {
  token: localStorage.getItem("token"),
  role: null,
  username: null,
};

const mutations: MutationTree<AuthState> = {
  setToken(state, token: string) {
    state.token = token;
    localStorage.setItem("token", token);

    // Decode token to get role & username
    const decoded = jwtDecode<JwtPayload>(token);
    state.username = decoded.sub;
    state.role = decoded.authorities.includes("ROLE_ADMIN") ? "admin" : "user";
  },

  clearAuth(state) {
    state.token = null;
    state.role = null;
    state.username = null;
    localStorage.removeItem("token");
  },
};

const actions: ActionTree<AuthState, any> = {
  async login({ commit }, { username, password }) {
    const axios = (await import("@/plugins/axios")).default;
    const res = await axios.post("/login", { username, password });

    const token = res.data.token;

    // Call mutation to set token + decode info
    commit("setToken", token);

    return jwtDecode<JwtPayload>(token).authorities.includes("ROLE_ADMIN")
      ? "admin"
      : "user";
  },

  logout({ commit }) {
    commit("clearAuth");
  },

  initAuth({ commit }) {
    const token = localStorage.getItem("token");
    if (token) {
      commit("setToken", token);
    }
  },
};

const getters: GetterTree<AuthState, any> = {
  isLoggedIn: (state) => !!state.token,
  userRole: (state) => state.role,
  username: (state) => state.username,
  isAdmin: (state) => state.role === "admin",
  isUser: (state) => state.role === "user",
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
