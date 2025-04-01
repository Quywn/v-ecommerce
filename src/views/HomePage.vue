<template>
  <v-app>
    <v-app-bar color="primary" app dense>
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
      <v-menu
        v-model="menuVisible"
        :close-on-content-click="false"
        v-if="$vuetify.breakpoint.xs"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
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

    <!-- Banner -->
    <v-carousel
      cycle
      hide-delimiters
      show-arrows
      interval="5000"
      height="auto"
      class="full-height"
    >
      <!-- Banner 1 -->
      <v-carousel-item>
        <v-img
          src="@/assets/banner1.png"
          alt="Banner 1"
          class="custom-banner"
        ></v-img>
      </v-carousel-item>

      <!-- Banner 2 -->
      <v-carousel-item>
        <v-img
          src="@/assets/banner2.png"
          alt="Banner 2"
          class="custom-banner"
        ></v-img>
      </v-carousel-item>

      <!-- Banner 3 -->
      <v-carousel-item>
        <v-img
          src="@/assets/banner3.gif"
          alt="Banner 3"
          class="custom-banner"
        ></v-img>
      </v-carousel-item>
    </v-carousel>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-divider></v-divider>
            <h2>Sản phẩm bán chạy</h2>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="product in bestSellers"
            :key="product.id"
            cols="12"
            md="4"
          >
            <v-card>
              <v-img :src="product.image" height="200px"></v-img>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle>\${{ product.price }}</v-card-subtitle>
              <v-card-actions>
                <v-btn @click="addToCart(product)">Thêm vào giỏ</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-btn @click="toggleTheme"> Chuyển đổi theme </v-btn>

    <!-- Footer -->
    <FooterComponent></FooterComponent>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import useHeader from "@/scripts/HomePage.ts";
import FooterComponent from "@/components/FooterComponent.vue";

export default defineComponent({
  components: {
    FooterComponent,
  },
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
  methods: {
    goToPage(page) {
      const currentRouteName = this.$route.name;
      if (currentRouteName !== page) {
        this.$router.push({ name: page });
      }
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      this.$vuetify.theme.dark = this.isDark;
    },
    addToCart(product) {
      //add logic
      console.log(`Đã thêm ${product.name} vào giỏ.`);
    },
  },
  data() {
    return {
      bestSellers: [
        {
          id: 1,
          name: "Sản phẩm 1",
          image: "https://via.placeholder.com/200",
          price: 0.0,
        },
        {
          id: 2,
          name: "Sản phẩm 2",
          image: "https://via.placeholder.com/200",
          price: 0.0,
        },
        {
          id: 3,
          name: "Sản phẩm 3",
          image: "https://via.placeholder.com/200",
          price: 0.0,
        },
      ],
      menuVisible: false,
    };
  },
});
</script>
<style scoped src="@/styles/HomePage.css"></style>
