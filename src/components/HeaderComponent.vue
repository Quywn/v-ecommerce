<template>
  <v-layout column>
    <v-app-bar color="primary" app dense>
      <!-- Logo -->
      <v-img src="@/assets/logo.png" alt="Logo" class="logo" contain></v-img>

      <!-- Navigation Menu -->
      <div class="d-none d-md-flex justify-center flex-grow-1">
        <v-btn text @click="goToPath('/home')">Trang chủ</v-btn>
        <v-btn text @click="goToPath('/about')">Giới thiệu</v-btn>
        <v-btn text @click="goToPath('/products')">Sản phẩm</v-btn>
        <v-btn text @click="goToPath('/voucher')">Tin tức</v-btn>
      </div>

      <!-- Search and Cart icons -->
      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon @click="toggleCart">
        <v-icon>mdi-cart</v-icon>
        <v-badge color="red" content="3" overlap></v-badge>
      </v-btn>

      <!-- User Icon with Dropdown Menu -->
      <v-menu bottom left v-if="isLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- Profile -->
          <v-list-item @click="goToPath('/user/profile')">
            <v-list-item-icon>
              <v-icon>mdi-account-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tài khoản</v-list-item-title>
          </v-list-item>

          <!-- Orders -->
          <v-list-item @click="goToPath('/user/orders')">
            <v-list-item-icon>
              <v-icon>mdi-package-variant-closed</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Đơn hàng</v-list-item-title>
          </v-list-item>
          <!-- ADMIN MENU -->
          <v-list-item
            v-if="role === 'admin'"
            @click="goToPath('/admin/dashboard')"
          >
            <v-list-item-icon>
              <v-icon>mdi-cogs</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Quản lý website</v-list-item-title>
          </v-list-item>
          <!-- Log out -->
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- If not logged in, show login icon -->
      <v-btn icon v-else @click="goToPath('/login')">
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <!-- Mobile Menu Button -->
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <!-- Mobile Menu Items -->
        <v-list>
          <v-list-item @click="goToPath('/home')">Trang chủ</v-list-item>
          <v-list-item @click="goToPath('/about')">Giới thiệu</v-list-item>
          <v-list-item @click="goToPath('/products')">Sản phẩm</v-list-item>
          <v-list-item @click="goToPath('/voucher')">Khuyến mãi</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Search Box -->
    <v-dialog v-model="searchDialog" max-width="400px">
      <v-card>
        <v-card-title>Tìm kiếm sản phẩm</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="searchQuery"
            label="Nhập từ khóa"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="searchDialog = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Product } from "@/models/product";
import productService from "@/services/productService";
import { Getter } from "vuex-class";

@Component({
  name: "HeaderComponent",
})
export default class HeaderComponent extends Vue {
  @Getter("auth/username") username!: string;
  @Getter("auth/userRole") role!: string;
  @Getter("auth/isLoggedIn") isLoggedIn!: boolean;
  // Data
  searchDialog = false;
  searchQuery = "";
  products: Product[] = [];

  // Methods
  goToPath(path: string): void {
    if (this.$route.path !== path) {
      this.$router.push({ path });
    }
  }

  logout(): void {
    this.$store.dispatch("auth/logout");
    this.$router.push("/login");
  }

  toggleSearch(): void {
    // Todo: Handle search toggle
  }

  toggleCart(): void {
    // Todo: Handle cart toggle
  }
}
</script>

<style scoped>
.v-app-bar .logo {
  max-width: 200px;
}

/* For small windows */
@media (max-width: 767px) {
  .d-none.d-md-flex {
    display: none !important;
  }
}

/* For large windows */
@media (min-width: 768px) {
  .d-none.d-md-flex {
    display: flex;
  }
}
</style>
