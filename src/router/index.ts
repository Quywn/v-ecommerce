import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import DefaultLayout from "@/layout/DefaultLayout.vue";
import AdminLayout from "@/layout/AdminLayout.vue";

import Home from "@/pages/HomePage.vue";
import ProductDetail from "@/pages/ProductDetailPage.vue";
import ProductManagement from "@/pages/ProductManagementPage.vue";
import AdminDashboard from "@/pages/dashboard/AdminDashboardPage.vue";
import UserManagement from "@/pages/UserManagementPage.vue";
import Setting from "@/pages/SettingPage.vue";

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
        component: () => import("@/pages/AboutPage.vue"),
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
      {
        path: "users",
        name: "routes.users",
        component: UserManagement,
      },
      {
        path: "settings",
        name: "routes.settings",
        component: Setting,
      },
    ],
  },
  // Other routes: login, register
  {
    path: "/login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("@/pages/RegisterPage.vue"),
  },
];
const router = new VueRouter({
  mode: "history", // Dùng mode history để không có dấu # trong URL
  routes,
});

export default router;
