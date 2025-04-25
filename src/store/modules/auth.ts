import { Module, ActionTree, MutationTree, GetterTree } from "vuex";
import { AuthState } from "@/models/authState";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/models/jwtPayload ";

const state: AuthState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  username: localStorage.getItem("username"),
};

const mutations: MutationTree<AuthState> = {
  setAuth(state, { token, role, username }) {
    state.token = token;
    state.role = role;
    state.username = username;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
  },
  logout(state) {
    state.token = null;
    state.role = null;
    state.username = null;
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  },
};

const actions: ActionTree<AuthState, any> = {
  async login({ commit }, { username, password }) {
    const axios = (await import("@/plugins/axios")).default;
    const res = await axios.post("/login", { username, password });

    const token = res.data.token;

    // Decode JWT
    const decoded = jwtDecode<JwtPayload>(token);

    // Get username và authorities (role)
    username = decoded.sub; // sub chứa username
    const authorities = decoded.authorities; // authorities chứa các role

    // First Role = Primary role
    const role = authorities.includes("ROLE_ADMIN") ? "admin" : "user";

    // Commit to Vuex
    commit("setAuth", { token, role, username });

    return role;
  },

  logout({ commit }) {
    commit("logout");
  },
};

const getters: GetterTree<AuthState, any> = {
  isLoggedIn: (state) => !!state.token,
  userRole: (state) => state.role,
  username: (state) => state.username,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
