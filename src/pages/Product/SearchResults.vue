<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Kết quả tìm kiếm cho: "{{ keyword }}"</h2>
        <v-alert v-if="loading" type="info">Đang tìm kiếm...</v-alert>
        <v-alert v-else-if="!products.length && !loading" type="warning">
          Không tìm thấy sản phẩm nào.
        </v-alert>
      </v-col>

      <v-col
        v-for="(product, index) in products"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img :src="product.imageUrl" height="200px" />
          <v-card-title>{{ product.productName }}</v-card-title>
          <v-card-subtitle>{{ formatCurrency(product.price) }}</v-card-subtitle>
          <v-card-text>{{ product.description }}</v-card-text>
          <v-card-actions>
            <v-btn text color="primary">Xem chi tiết</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import productService from "@/services/productService";
import { Product } from "@/models/product";

@Component
export default class SearchResults extends Vue {
  keyword = "";
  products: Product[] = [];
  loading = false;

  mounted() {
    this.keyword = (this.$route.query.q as string) || "";
    this.fetchProducts();
  }

  @Watch("$route", { immediate: false })
  onRouteChanged(to: any) {
    const newKeyword = to.query.q || "";
    if (newKeyword !== this.keyword) {
      this.keyword = newKeyword;
      this.fetchProducts();
    }
  }

  async fetchProducts() {
    if (!this.keyword) return;
    this.loading = true;
    try {
      this.products = await productService.searchProducts(this.keyword);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm:", err);
      this.products = [];
    } finally {
      this.loading = false;
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
