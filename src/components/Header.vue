<template>
  <v-app-bar app>
    <v-img src="@/assets/logo.png" contain height="50px" class="mr-4" />
    <v-spacer></v-spacer>

    <v-btn text>GIỚI THIỆU</v-btn>
    <v-btn text>SẢN PHẨM</v-btn>
    <v-btn text>TÀI KHOẢN</v-btn>

    <v-spacer></v-spacer>

    <v-text-field
      v-model="searchQuery"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      class="mr-4"
      outlined
    />

    <v-btn icon>
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "HeaderPage",
};
</script>
