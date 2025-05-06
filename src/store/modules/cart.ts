import { Module } from "vuex";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartState {
  items: Product[];
}

const cart: Module<CartState, any> = {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    ADD_TO_CART(state, product: Product) {
      state.items.push(product); //to do: ProductQuantity
    },
  },
  actions: {
    addToCart({ commit }, product: Product) {
      commit("ADD_TO_CART", product);
    },
  },
  getters: {
    cartItemCount: (state) => state.items.length,
    cartItems: (state) => state.items,
  },
};

export default cart;
