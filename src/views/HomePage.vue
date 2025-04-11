<template>
  <v-main>
    <!-- Banner -->
    <v-carousel cycle hide-delimiters show-arrows interval="5000" height="auto">
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
</template>

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
  methods: {
    // toggleTheme() {
    //   this.isDark = !this.isDark;
    //   this.$vuetify.theme.dark = this.isDark;
    // },
    addToCart(product) {
      //add logic
      console.log(`Đã thêm ${product.name} vào giỏ.`);
    },
  },
  //fake data demo
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
