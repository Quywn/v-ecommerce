import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import DefaultLayout from "@/layout/DefaultLayout.vue";
import AdminLayout from "@/layout/AdminLayout.vue";

import Home from "@/views/HomePage.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import ProductManagement from "@/components/ProductManagement.vue";
import AdminDashboard from "@/components/AdminDashboard.vue";

Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", component: Home },
      { path: "product/:id", component: ProductDetail },
      { path: "about", component: () => import("@/views/AboutPage.vue") },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        component: AdminDashboard,
      },
      {
        path: "products",
        component: ProductManagement,
      },
    ],
  },
  // Other routes: login, register
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
];
const router = new VueRouter({
  mode: "history", // Dùng mode history để không có dấu # trong URL
  routes,
});

export default router;
