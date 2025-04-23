<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col cols="12" md="4">
          <v-img :src="product.imageUrl" height="300px" contain />
        </v-col>
        <v-col cols="12" md="8">
          <v-card-title>{{ product.productName }}</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Mã sản phẩm:</v-list-item-title>
                  <v-list-item-subtitle>{{
                    product.productCode || "N/A"
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Danh mục:</v-list-item-title>
                  <v-list-item-subtitle>{{
                    product.category.name
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Giá:</v-list-item-title>
                  <v-list-item-subtitle
                    >{{
                      product.price.toLocaleString()
                    }}
                    đ</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Số lượng trong kho:</v-list-item-title>
                  <v-list-item-subtitle>{{
                    product.quantityStock
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Đã đặt hàng:</v-list-item-title>
                  <v-list-item-subtitle>{{
                    product.quantityOrdered
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Product } from "@/models/product";

export default Vue.extend({
  name: "ProductDetail",
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
});
</script>
