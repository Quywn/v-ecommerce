<template>
  <v-main>
    <!-- Banner -->
    <v-carousel cycle hide-delimiters show-arrows interval="5000" height="auto">
      <v-carousel-item v-for="(banner, index) in banners" :key="index">
        <v-img :src="banner" alt="Banner" class="custom-banner"></v-img>
      </v-carousel-item>
    </v-carousel>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
          <h2>Danh sách sản phẩm</h2>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          <p>Đang tải sản phẩm...</p>
        </v-col>
      </v-row>

      <v-row v-else-if="products.length">
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="hover-card" outlined>
            <v-img
              :src="product.image"
              height="200px"
              class="product-image"
            ></v-img>
            <v-card-title class="text-truncate">{{
              product.name
            }}</v-card-title>
            <v-card-subtitle class="font-weight-bold">
              {{ formatCurrency(product.price) }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" @click="addToCart(product)"
                >Thêm vào giỏ</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12" class="text-center">
          <p>Không có sản phẩm nào được tìm thấy.</p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      banners: [
        require("@/assets/banner1.png"),
        require("@/assets/banner2.png"),
        require("@/assets/banner3.gif"),
      ],
      products: [] as Product[],
      loading: true,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          "http://localhost:1234/general/products"
        );

        this.products = response.data.map((item: any) => ({
          id: item.productCode,
          name: item.productName,
          price: item.price,
          image: item.imageUrl || "https://via.placeholder.com/200", // fallback image
        }));
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm bán chạy:", error);
      } finally {
        this.loading = false;
      }
    },
    addToCart(product: Product) {
      this.$store.dispatch("cart/addToCart", product);
      console.log("Đã thêm vào giỏ hàng!"); // todo: Chuyển sang dùng toast
    },
    formatCurrency(value: number) {
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
});
</script>
