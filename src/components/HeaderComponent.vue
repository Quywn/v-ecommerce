<template>
  <v-layout column>
    <v-app-bar color="primary" app dense>
      <!-- Logo -->
      <v-img src="@/assets/logo.png" alt="Logo" class="logo" contain></v-img>

      <!-- Navigation Menu -->
      <div class="d-none d-md-flex justify-center flex-grow-1">
        <v-btn text @click="goToPath('/home')">Trang chủ</v-btn>
        <v-btn text @click="goToPath('/about')">Giới thiệu</v-btn>
        <v-btn text @click="goToPath('/info')">Tin tức</v-btn>
        <v-btn text @click="goToPath('/categories')">Danh mục</v-btn>
      </div>

      <!-- Search and Cart icons -->
      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon to="/cart">
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <!-- User Icon with Dropdown Menu -->
      <v-menu bottom left v-if="isLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="goToPath('/user/profile')">
            <v-list-item-icon>
              <v-icon>mdi-account-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sửa Đổi Tài khoản</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToPath('/user/orders')">
            <v-list-item-icon>
              <v-icon>mdi-package-variant-closed</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Lịch Sử Đơn hàng</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="role === 'admin'"
            @click="goToPath('/admin/dashboard')"
          >
            <v-list-item-icon>
              <v-icon>mdi-cogs</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Quản Lý Website</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Đăng Xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Login icon if not logged in -->
      <v-btn icon v-else @click="goToPath('/login')">
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <!-- Mobile menu -->
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="goToPath('/home')">Trang chủ</v-list-item>
          <v-list-item @click="goToPath('/about')">Giới thiệu</v-list-item>
          <v-list-item @click="goToPath('/info')">Tin tức</v-list-item>
          <v-list-item @click="goToPath('/categories')">Danh mục</v-list-item>
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
            @keyup.enter="performSearch"
          ></v-text-field>

          <div class="mt-4">
            <div class="subtitle-2 font-weight-bold mb-2">
              Từ khóa phổ biến:
            </div>
            <v-chip-group column>
              <v-chip
                v-for="(keyword, index) in popularKeywords"
                :key="'popular-' + index"
                @click="selectKeyword(keyword)"
                outlined
                small
              >
                {{ keyword }}
              </v-chip>
            </v-chip-group>
          </div>

          <div class="mt-4">
            <div class="subtitle-2 font-weight-bold mb-2">
              Tìm kiếm gần đây:
            </div>
            <v-chip-group column>
              <v-chip
                v-for="(keyword, index) in recentKeywords"
                :key="'recent-' + index"
                @click="selectKeyword(keyword)"
                small
                close
                @click:close="removeRecent(index)"
              >
                {{ keyword }}
              </v-chip>
            </v-chip-group>
          </div>
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
import { Getter } from "vuex-class";

@Component({
  name: "HeaderComponent",
})
export default class HeaderComponent extends Vue {
  @Getter("auth/username") username!: string;
  @Getter("auth/userRole") role!: string;
  @Getter("auth/isLoggedIn") isLoggedIn!: boolean;

  searchDialog = false;
  searchQuery = "";
  popularKeywords: string[] = ["Juice", "Cupcakes"];
  recentKeywords: string[] = [];

  performSearch(): void {
    if (!this.searchQuery.trim()) return;

    if (!this.recentKeywords.includes(this.searchQuery)) {
      this.recentKeywords.unshift(this.searchQuery);
      if (this.recentKeywords.length > 5) {
        this.recentKeywords.pop();
      }
    }

    this.$router.push({ path: "/search", query: { q: this.searchQuery } });
    this.searchDialog = false;
  }

  selectKeyword(keyword: string): void {
    this.searchQuery = keyword;
    this.performSearch();
  }

  removeRecent(index: number): void {
    this.recentKeywords.splice(index, 1);
  }

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
    this.searchDialog = true;
  }
}
</script>

<style scoped>
.v-app-bar .logo {
  max-width: 200px;
}

@media (max-width: 767px) {
  .d-none.d-md-flex {
    display: none !important;
  }
}

@media (min-width: 768px) {
  .d-none.d-md-flex {
    display: flex;
  }
}
</style>
