<template>
  <v-container fluid>
    <!-- SECTION 1: Tổng quan -->
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

    <!-- SECTION 2: Tạo tài khoản admin -->
    <!--    <v-card class="my-5">-->
    <!--      <v-card-title>-->
    <!--        Quản lý tài khoản admin-->
    <!--        <v-spacer />-->
    <!--        <v-btn color="primary" @click="showCreateDialog = true">Tạo mới</v-btn>-->
    <!--      </v-card-title>-->
    <!--    </v-card>-->

    <!-- Dialog -->
    <!--    <v-dialog v-model="showCreateDialog" max-width="500px">-->
    <!--      <v-card>-->
    <!--        <v-card-title>Tạo tài khoản admin</v-card-title>-->
    <!--        <v-card-text>-->
    <!--          <v-text-field label="Họ tên" v-model="newAdmin.name" />-->
    <!--          <v-text-field label="Email" v-model="newAdmin.email" />-->
    <!--          <v-text-field-->
    <!--            label="Mật khẩu"-->
    <!--            v-model="newAdmin.password"-->
    <!--            type="password"-->
    <!--          />-->
    <!--          <v-select-->
    <!--            label="Vai trò"-->
    <!--            :items="['Admin', 'Nhân viên']"-->
    <!--            v-model="newAdmin.role"-->
    <!--          />-->
    <!--        </v-card-text>-->
    <!--        <v-card-actions>-->
    <!--          <v-spacer />-->
    <!--          <v-btn text @click="showCreateDialog = false">Hủy</v-btn>-->
    <!--          <v-btn color="primary" text @click="createAdmin">Tạo</v-btn>-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->

    <!-- SECTION 3: Lịch sử hoạt động admin -->
    <v-card class="my-5">
      <v-card-title>Lịch sử hoạt động admin</v-card-title>
      <v-data-table :headers="activityHeaders" :items="adminActivities" dense />
    </v-card>

    <!-- SECTION 4: Sản phẩm sắp hết hàng -->
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
      // Tổng quan
      overviewCards: [
        { title: "Tổng đơn hàng", value: "1,230", icon: "mdi-cart" },
        { title: "Doanh thu hôm nay", value: "₫12,000,000", icon: "mdi-cash" },
        { title: "Khách hàng", value: "845", icon: "mdi-account-group" },
        { title: "Sản phẩm", value: "320", icon: "mdi-package-variant" },
      ],

      // Tạo tài khoản admin
      showCreateDialog: false,
      newAdmin: {
        name: "",
        email: "",
        password: "",
        role: "Admin",
      },

      // Lịch sử hoạt động admin
      activityHeaders: [
        { text: "Admin", value: "admin" },
        { text: "Hành động", value: "action" },
        { text: "Thời gian", value: "time" },
      ],
      adminActivities: [
        {
          admin: "Nguyễn Văn A",
          action: "Tạo sản phẩm",
          time: "2025-04-15 10:30",
        },
        {
          admin: "Trần Thị B",
          action: "Xóa đơn hàng",
          time: "2025-04-15 09:12",
        },
      ],

      // Sản phẩm sắp hết hàng
      lowStockHeaders: [
        { text: "Tên sản phẩm", value: "name" },
        { text: "Mã SKU", value: "sku" },
        { text: "Tồn kho", value: "stock" },
      ],
      lowStockProducts: [
        { name: "Áo sơ mi trắng", sku: "SM001", stock: 3 },
        { name: "Quần jean xanh", sku: "QJ002", stock: 7 },
      ],
    };
  },
  methods: {
    createAdmin() {
      console.log("Tạo admin mới:", this.newAdmin);
      // TODO: Gửi API tạo tài khoản
      this.showCreateDialog = false;

      // Reset form
      this.newAdmin = {
        name: "",
        email: "",
        password: "",
        role: "Admin",
      };
    },
  },
});
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
