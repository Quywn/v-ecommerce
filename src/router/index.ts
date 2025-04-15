import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import DefaultLayout from "@/layout/DefaultLayout.vue";
import AdminLayout from "@/layout/AdminLayout.vue";

import Home from "@/pages/HomePage.vue";
import ProductDetail from "@/pages/ProductDetailPage.vue";
import ProductManagement from "@/pages/ProductManagementPage.vue";
import AdminDashboard from "@/pages/AdminDashboardPage.vue";

Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "home", name: "routes.home", component: Home },
      {
        path: "product/:id",
        name: "routes.product/:id",
        component: ProductDetail,
      },
      {
        path: "about",
        name: "routes.about",
        component: () => import("@/views/AboutPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        name: "routes.dashboard",
        component: AdminDashboard,
      },
      {
        path: "products",
        name: "routes.products",
        component: ProductManagement,
      },
    ],
  },
  // Other routes: login, register
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/RegisterPage.vue"),
  },
];
const router = new VueRouter({
  mode: "history", // Dùng mode history để không có dấu # trong URL
  routes,
});

export default router;
