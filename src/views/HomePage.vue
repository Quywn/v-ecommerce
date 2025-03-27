<template>
  <v-app>
    <!-- Header -->
    <v-toolbar app>
      <v-toolbar-title>
        <img src="@/assets/logo.png" alt="Logo" height="40" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Navigation Menu -->
      <v-btn text>Trang chủ</v-btn>
      <v-btn text>Sản phẩm</v-btn>
      <v-btn text>Liên hệ</v-btn>
      <!-- Search Icon -->
      <v-icon>mdi-magnify</v-icon>
      <!-- Cart Icon -->
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-toolbar>

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
            <v-card-subtitle>{{ product.price | currency }}</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary">Thêm vào giỏ</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

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

<script src="@/scripts/HomePage.ts"></script>
<style scoped src="@/styles/HomePage.css"></style>
