import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import Home from "@/views/HomePage.vue";
import Login from "@/views/LoginPage.vue";
import ProductDetail from "@/views/ProductDetail.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        { path: "", component: Home },
        { path: "login", component: Login },
        { path: "product/:id", component: ProductDetail },
      ],
    },
  ],
});
