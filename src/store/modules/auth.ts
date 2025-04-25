import { Module, ActionTree, MutationTree, GetterTree } from "vuex";
import { AuthState } from "@/models/authState";

const state: AuthState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
};

const mutations: MutationTree<AuthState> = {
  setAuth(state, { token, role }) {
    state.token = token;
    state.role = role;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  },
  logout(state) {
    state.token = null;
    state.role = null;
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },
};

const actions: ActionTree<AuthState, any> = {
  async login({ commit }, { username, password }) {
    const axios = (await import("@/plugins/axios")).default;
    const res = await axios.post("/login", { username, password });

    const { token, role } = res.data; // Get token and role from API
    commit("setAuth", { token, role });
    return role;
  },

  logout({ commit }) {
    commit("logout");
  },
};

const getters: GetterTree<AuthState, any> = {
  isLoggedIn: (state) => !!state.token,
  userRole: (state) => state.role,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
