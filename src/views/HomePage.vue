<template>
  <v-app>
    <v-app-bar app dense>
      <!-- Logo -->
      <v-img src="@/assets/logo.png" alt="Logo" class="logo" contain></v-img>

      <!-- Navigation Menu -->
      <div class="d-none d-md-flex justify-center flex-grow-1">
        <v-btn text @click="goToPage('home')">Trang chủ</v-btn>
        <v-btn text @click="goToPage('about')">Giới thiệu</v-btn>
        <v-btn text @click="goToPage('products')">Sản phẩm</v-btn>
        <v-btn text @click="goToPage('contact')">Liên hệ</v-btn>
      </div>
      <!-- Search and Cart icons -->
      <div class="d-flex justify-end">
        <v-btn icon @click="toggleSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon @click="toggleCart">
          <v-icon>mdi-cart</v-icon>
          <v-badge color="red" content="3" overlap></v-badge>
          <!-- Giỏ hàng với số lượng -->
        </v-btn>
      </div>
      <!-- Mobile Menu Button -->
      <v-menu
        v-model="menuOpen"
        transition="slide-x-reverse-transition"
        class="d-md-none"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <!-- Mobile Menu Items -->
        <v-list>
          <v-list-item @click="goToPage('home')">Trang chủ</v-list-item>
          <v-list-item @click="goToPage('about')">Giới thiệu</v-list-item>
          <v-list-item @click="goToPage('products')">Sản phẩm</v-list-item>
          <v-list-item @click="goToPage('contact')">Liên hệ</v-list-item>
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

    <v-main>
      <v-container>
        <!-- Banner -->
        <v-img src="@/assets/banner.png" alt="Banner" height="auto" contain>
          <v-row class="fill-height" align="center" justify="center"> </v-row>
        </v-img>

        <!-- Favorite Products Section -->
        <v-container>
          <v-row>
            <v-col
              v-for="product in favoriteProducts"
              :key="product.id"
              cols="12"
              md="4"
            >
              <v-card>
                <v-img :src="product.image" height="200px"></v-img>
                <v-card-title>{{ product.name }}</v-card-title>
                <v-card-subtitle>{{
                  product.price | currency
                }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary">Thêm vào giỏ</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>
    <!-- Footer -->
    <v-footer padless>
      <v-container>
        <div class="footer-container">
          <!-- Footer Section 1: Giới thiệu -->
          <div class="footer-section">
            <h3>Giới thiệu</h3>
            <p>
              Chúng tôi chuyên cung cấp các loại bánh ngọt, bánh mặn tươi ngon,
              được làm từ nguyên liệu chất lượng cao.
            </p>
          </div>

          <!-- Footer Section 2: Thông tin liên hệ -->
          <div class="footer-section">
            <h3>Thông tin liên hệ</h3>
            <p>Địa chỉ: #address</p>
            <p>Điện thoại: 0xx.xxx.xxx</p>
            <p>Email: lienhe@banhngon.com</p>
          </div>

          <!-- Footer Section 3: Shop Online -->
          <div class="footer-section">
            <h3>Shop Online - Truy cập</h3>
            <ul>
              <li>
                <a href="https://www.facebook.com/quyencake" target="_blank">
                  <i class="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a href="https://shopee.vn/quyencake" target="_blank">
                  <i class="fab fa-shopify"></i> Shopee
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <p>&copy; 2025 Cửa hàng Bánh Online - Hotline: 0xx.xxx.xxx</p>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<!--<script src="@/scripts/HomePage.ts"></script>-->
<script>
import { defineComponent } from "vue";
import useHeader from "@/scripts/HomePage.ts";

export default defineComponent({
  setup() {
    const { menuOpen, searchDialog, searchQuery, toggleSearch, toggleCart } =
      useHeader();

    return {
      menuOpen,
      searchDialog,
      searchQuery,
      toggleSearch,
      toggleCart,
    };
  },
});
</script>
<style scoped src="@/styles/HomePage.css"></style>
