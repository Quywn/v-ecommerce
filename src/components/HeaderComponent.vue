<template>
  <v-layout column>
    <v-app-bar color="primary" app dense>
      <!-- Logo -->
      <v-img src="@/assets/logo.png" alt="Logo" class="logo" contain></v-img>

      <!-- Navigation Menu -->
      <div class="d-none d-md-flex justify-center flex-grow-1">
        <v-btn text @click="goToPage('home')">Trang chủ</v-btn>
        <v-btn text @click="goToPage('about')">Giới thiệu</v-btn>
        <v-btn text @click="goToPage('products')">Sản phẩm</v-btn>
        <v-btn text @click="goToPage('voucher')">Khuyến mãi</v-btn>
      </div>
      <!-- Search and Cart icons -->
      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon @click="toggleCart">
        <v-icon>mdi-cart</v-icon>
        <v-badge color="red" content="3" overlap></v-badge>
      </v-btn>

      <v-btn icon @click="goToPage('login')">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <!-- Mobile Menu Button -->
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on"> <v-icon>mdi-menu</v-icon> </v-btn>
        </template>

        <!-- Mobile Menu Items -->
        <v-list>
          <v-list-item @click="goToPage('home')">Trang chủ</v-list-item>
          <v-list-item @click="goToPage('about')">Giới thiệu</v-list-item>
          <v-list-item @click="goToPage('products')">Sản phẩm</v-list-item>
          <v-list-item @click="goToPage('voucher')">Khuyến mãi</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Search Box -->
    <v-dialog v-model="searchDialog" max-width="400px">
      <v-card>
        <v-card-title>Tìm kiếm sản phẩm</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="searchQuery"
            label="Nhập từ khóa"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="searchDialog = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  name: "HeaderComponent",
  methods: {
    goToPage(route) {
      this.$router.push(route);
    },
  },
};
</script>
