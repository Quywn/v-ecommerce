import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "homepage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
