<template>
  <v-container>
    <!-- User's information -->
    <v-card class="mt-6 pa-4" v-if="user">
      <v-card-title>Thông tin người nhận</v-card-title>
      <v-card-text>
        <p><strong>Họ tên:</strong> {{ user.username }}</p>
        <p><strong>Địa chỉ:</strong> {{ user.address }}</p>
        <p><strong>Số điện thoại:</strong> {{ user.phone }}</p>
      </v-card-text>
    </v-card>

    <h2 class="mt-8 mb-4">Thông tin hóa đơn</h2>

    <!-- Product's List -->
    <v-simple-table dense>
      <thead>
        <tr>
          <th class="text-left">Tên sản phẩm</th>
          <th class="text-right">Số lượng</th>
          <th class="text-right">Giá</th>
          <th class="text-right">Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="index">
          <td>{{ item.product.productName }}</td>
          <td class="text-right">{{ item.quantity }}</td>
          <td class="text-right">{{ formatCurrency(item.product.price) }}</td>
          <td class="text-right">
            {{ formatCurrency(item.product.price * item.quantity) }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <v-divider class="my-4"></v-divider>
    <h3 class="text-right">Tổng tiền: {{ formatCurrency(cartTotal) }}</h3>

    <v-btn
      class="mt-4"
      :loading="isLoading"
      color="primary"
      @click="confirmOrder"
    >
      Xác nhận đặt hàng
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import axios from "@/plugins/axios";
import { CartItem } from "@/models/cartItem";
import { User } from "@/models/user";

// Vuex namespace binding
const CartModule = namespace("cart");
const AuthModule = namespace("auth");
const UserModule = namespace("user");

@Component
export default class CheckOutPage extends Vue {
  isLoading = false;

  // Cart getters & actions
  @CartModule.Getter("items") cartItems!: CartItem[];
  @CartModule.Getter("total") cartTotal!: number;
  @CartModule.Action("clearCartByUsername") clearCartByUsername!: (
    username: string
  ) => Promise<void>;

  // Auth getter
  @AuthModule.Getter("username") username!: string;

  // User profile & fetcher
  @UserModule.Getter("profile") user!: User | null;
  @UserModule.Action("fetchUserProfile") fetchUserProfile!: (
    username: string
  ) => Promise<void>;

  async mounted() {
    console.log("Mounted - username:", this.username);
    if (!this.user && this.username) {
      await this.fetchUserProfile(this.username);
      console.log("Fetched user:", this.user);
    }
  }

  formatCurrency(value: number): string {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  async confirmOrder() {
    if (!this.user) {
      alert("Không thể xác định thông tin người dùng!");
      return;
    }

    this.isLoading = true;
    try {
      await axios.post("/user/checkout", null, {
        params: { username: this.username },
      });

      await this.clearCartByUsername(this.username);
      alert("Đặt hàng thành công!");
      this.$router.push("/home");
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
</style>
