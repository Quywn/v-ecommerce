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
              :src="product.imageUrl"
              height="200px"
              class="product-image"
            ></v-img>
            <v-card-title class="text-truncate">{{
              product.productName
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
import { Product } from "@/models/product";

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
          productCode: item.productCode,
          productName: item.productName,
          price: item.price,
          imageUrl: item.imageUrl || "https://via.placeholder.com/200", // fallback image
        }));
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      } finally {
        this.loading = false;
      }
    },

    addToCart(product: Product) {
      if (!this.$store.getters["auth/isLoggedIn"]) {
        this.$toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng.");
        return;
      }

      this.$store
        .dispatch("cart/addOneProductToCart", product)
        .then(() => {
          this.$toast.success("Đã thêm sản phẩm vào giỏ hàng!");
        })
        .catch(() => {
          this.$toast.error("Không thể thêm sản phẩm vào giỏ hàng.");
        });
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
