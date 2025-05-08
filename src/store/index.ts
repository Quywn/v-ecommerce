import Vue from "vue";
import Vuex from "vuex";
import product from "./modules/product";
import category from "./modules/category";
import auth from "./modules/auth";
import cart from "./modules/cart";
// import order from "./modules/order";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    product,
    category,
    auth,
    cart,
    // order,
  },
});
