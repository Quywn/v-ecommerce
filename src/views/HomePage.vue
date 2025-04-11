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
