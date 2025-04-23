<template>
  <v-container fluid>
    <!-- SECTION 1: Overview -->
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="card in overviewCards"
        :key="card.title"
      >
        <v-card class="pa-3">
          <v-icon size="30" color="primary">{{ card.icon }}</v-icon>
          <div class="headline mt-2">{{ card.value }}</div>
          <div class="caption">{{ card.title }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- SECTION 2: Admin's history actions -->
    <v-card class="my-5">
      <v-card-title>Lịch sử hoạt động admin</v-card-title>
      <v-data-table :headers="activityHeaders" :items="adminActivities" dense />
    </v-card>

    <!-- SECTION 3: Products need to stock -->
    <v-card class="mb-5">
      <v-card-title>Sản phẩm sắp hết hàng</v-card-title>
      <v-data-table :headers="lowStockHeaders" :items="lowStockProducts" dense>
        <template slot="item.stock" slot-scope="props">
          <v-chip :color="props.item.stock <= 5 ? 'red' : 'orange'" dark>
            {{ props.item.stock }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AdminDashboard",
  data() {
    return {
      overviewCards: [
        { title: "Tổng đơn hàng", value: "1,230", icon: "mdi-cart" },
        { title: "Doanh thu hôm nay", value: "₫12,000,000", icon: "mdi-cash" },
        { title: "Khách hàng", value: "845", icon: "mdi-account-group" },
        { title: "Sản phẩm", value: "320", icon: "mdi-package-variant" },
      ],
      //Admin's activities
      activityHeaders: [
        { text: "Admin", value: "admin" },
        { text: "Hành động", value: "action" },
        { text: "Thời gian", value: "time" },
      ],
      adminActivities: [
        {
          admin: "Admin 1",
          action: "Tạo sản phẩm",
          time: "2025-04-15 10:30",
        },
        {
          admin: "Admin 2",
          action: "Xóa đơn hàng",
          time: "2025-04-15 09:12",
        },
      ],

      // Need Stocking Product
      lowStockHeaders: [
        { text: "Tên sản phẩm", value: "product_name" },
        { text: "Mã SP", value: "code" },
        { text: "Tồn kho", value: "stock" },
      ],
      lowStockProducts: [
        { product_name: "Hamburger", code: "0001_000001", stock: 3 },
        { product_name: "Bread", code: "0001_000002", stock: 4 },
      ],
    };
  },
  methods: {},
});
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
