<template>
  <v-carousel>
    <v-carousel-item v-for="(product, index) in groupedProducts" :key="index">
      <v-row>
        <v-col v-for="item in product" :key="item.id" cols="12" sm="6" md="3">
          <v-card>
            <v-img :src="item.image" height="200px" />
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-subtitle>{{ item.price | currency }}</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary">Add to Cart</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script src="@/scripts/ProductCarousel.ts"></script>
