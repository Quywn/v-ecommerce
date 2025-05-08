import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

import DefaultLayout from "@/layout/DefaultLayout.vue";
import AdminLayout from "@/layout/AdminLayout.vue";

import Home from "@/pages/HomePage.vue";
import ProductDetail from "@/pages/Product/ProductDetailPage.vue";
import ProductManagement from "@/pages/Product/ProductManagementPage.vue";
import AdminDashboard from "@/pages/AdminDashboardPage.vue";
import UserManagement from "@/pages/User/UserManagementPage.vue";
import Setting from "@/pages/SettingPage.vue";
import OrderManagement from "@/pages/Order/OrderManagementPage.vue";

Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    path: "/",
    redirect: "/home",
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
      {
        path: "categories",
        name: "routes.product/:id",
        component: import("@/pages/Product/CategoryPage.vue"),
      },
      {
        path: "info",
        name: "routes.info",
        component: () => import("@/pages/NewsPage.vue"),
      },
      {
        path: "/cart",
        name: "routes.cart",
        component: () => import("@/pages/Order/CartPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
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
      {
        path: "orders",
        name: "routes.orders",
        component: OrderManagement,
      },
    ],
  },
  // Other routes: login, register, unauthorized
  {
    path: "/login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("@/pages/RegisterPage.vue"),
  },
  {
    path: "/unauthorized",
    component: () => import("@/pages/Unauthorized.vue"),
  },
  {
    path: "/user/profile",
    component: () => import("@/pages/User/ProfilePage.vue"),
  },
  {
    path: "/user/orders",
    component: () => import("@/pages/Order/OrdersHistoryPage.vue"),
  },
  {
    path: "/search",
    name: "SearchResults",
    component: () => import("@/pages/Product/SearchResults.vue"),
  },
  {
    path: "/checkout",
    name: "CheckOutPage",
    component: () => import("@/pages/Order/CheckOutPage.vue"),
  },
  {
    path: "*",
    redirect: "/home",
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});

// Before to route
router.beforeEach(async (to, from, next) => {
  const token = store.state.auth.token;
  const role = store.state.auth.role;

  // If !role (when F5), -> init role from token
  if (token && !role) {
    await store.dispatch("auth/initAuth");
  }

  // Check role init
  const updatedRole = store.state.auth.role;
  const isLoggedIn = !!store.state.auth.token;

  // 1. need admin but !admin
  if (
    to.matched.some((record) => record.meta.requiresAdmin) &&
    updatedRole !== "admin"
  ) {
    next("/unauthorized");
  }
  // 2. need login but !login
  else if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isLoggedIn
  ) {
    next("/login");
  }
  // 3. next
  else {
    next();
  }
});
export default router;
