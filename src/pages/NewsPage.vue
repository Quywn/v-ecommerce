<template>
  <v-container class="py-10">
    <h1 class="text-h4 font-weight-bold mb-6">Tin tức mới nhất</h1>

    <v-row>
      <v-col cols="12" md="4" v-for="article in articles" :key="article.title">
        <v-card class="mb-4" elevation="2">
          <v-img :src="article.image" height="200px" />
          <v-card-title>{{ article.title }}</v-card-title>
          <v-card-text>{{ article.summary }}</v-card-text>
          <v-card-actions>
            <v-btn text color="primary">Xem thêm</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const articles = [
  {
    title: "Bánh mì mới ra lò!",
    summary: "Khám phá sản phẩm đặc biệt của tháng này.",
    image: require("../assets/logo.png"),
  },
  {
    title: "Ưu đãi tháng 5 - Khai trương",
    summary: "Giảm giá 20% cho đơn hàng online.",
    image: require("../assets/logo.png"),
  },
];
</script>
