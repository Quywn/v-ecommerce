<template>
  <v-app>
    <header-component />

    <v-container>
      <!-- Banner -->
      <v-img src="@/assets/banner.png" height="400px" class="my-4" />

      <!-- Product Carousel -->
      <product-carousel :products="products" />
    </v-container>

    <footer-component />
  </v-app>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import ProductCarousel from "@/components/ProductCarousel.vue";
import FooterComponent from "@/components/Footer.vue";

export default {
  name: "HomePage",
  components: {
    HeaderComponent,
    ProductCarousel,
    FooterComponent,
  },
  data() {
    return {
      products: [
        { id: 1, name: "Product 1", price: 100, image: "/path/to/image1.jpg" },
        { id: 2, name: "Product 2", price: 200, image: "/path/to/image2.jpg" },
        { id: 3, name: "Product 3", price: 300, image: "/path/to/image3.jpg" },
        { id: 4, name: "Product 4", price: 400, image: "/path/to/image4.jpg" },
        { id: 5, name: "Product 5", price: 500, image: "/path/to/image5.jpg" },
        { id: 6, name: "Product 6", price: 600, image: "/path/to/image6.jpg" },
        { id: 7, name: "Product 7", price: 700, image: "/path/to/image7.jpg" },
        { id: 8, name: "Product 8", price: 800, image: "/path/to/image8.jpg" },
      ],
    };
  },
};
</script>
