<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout" text>Đăng Xuất</v-btn>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer app v-model="drawer" color="white" permanent>
      <v-list dense>
        <v-list-item
          v-for="item in menuItemsAdmin"
          :key="item.title"
          @click="goToPage(item.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Nội dung chính của trang -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      menuItemsAdmin: [
        { title: "Trang chủ", icon: "mdi-home", route: "/admin/dashboard" },
        {
          title: "Quản lý sản phẩm",
          icon: "mdi-cart",
          route: "/admin/products",
        },
        {
          title: "Quản lý người dùng",
          icon: "mdi-account",
          route: "/admin/users",
        },
        {
          title: "Quản lý hệ thống",
          icon: "mdi-cogs",
          route: "/admin/settings",
        },
      ],
    };
  },
  methods: {
    goToPage(route) {
      if (this.$route.path !== route) {
        this.$router.push(route);
      }
    },
    logout() {
      // Logic đăng xuất
      this.$router.push("/auth");
    },
  },
};
</script>
