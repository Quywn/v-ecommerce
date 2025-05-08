<template>
  <v-container>
    <h2 class="mb-4">Thông tin hóa đơn</h2>

    <!-- Hiển thị danh sách sản phẩm trong giỏ hàng -->
    <v-table dense>
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Giá</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ formatCurrency(item.price) }}</td>
          <td>{{ formatCurrency(item.price * item.quantity) }}</td>
        </tr>
      </tbody>
    </v-table>

    <v-divider class="my-4"></v-divider>

    <!-- Hiển thị tổng tiền của giỏ hàng -->
    <h3 class="text-right">Tổng tiền: {{ formatCurrency(cartTotal) }}</h3>

    <!-- Thông tin người dùng để điền vào khi thanh toán -->
    <v-form>
      <v-text-field
        label="Họ tên"
        v-model="userInfo.name"
        required
      ></v-text-field>
      <v-text-field
        label="Địa chỉ"
        v-model="userInfo.address"
        required
      ></v-text-field>
      <v-text-field
        label="Số điện thoại"
        v-model="userInfo.phone"
        required
      ></v-text-field>

      <!-- Nút xác nhận thanh toán -->
      <v-btn color="primary" @click="confirmOrder">Mua hàng</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "CheckoutPage",
  data() {
    return {
      userInfo: {
        name: "",
        address: "",
        phone: "",
      },
    };
  },
  computed: {
    // Lấy dữ liệu giỏ hàng từ Vuex
    ...mapGetters("cart", ["cartItems", "cartTotal"]),
  },
  methods: {
    // Định dạng tiền tệ
    formatCurrency(value: number) {
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    // Xử lý việc xác nhận đơn hàng (mua hàng)
    confirmOrder() {
      // Kiểm tra thông tin người dùng trước khi gửi yêu cầu
      if (
        !this.userInfo.name ||
        !this.userInfo.address ||
        !this.userInfo.phone
      ) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      // Gửi yêu cầu tạo đơn hàng (có thể gọi API ở đây)
      const orderData = {
        userInfo: this.userInfo,
        cartItems: this.cartItems,
        totalAmount: this.cartTotal,
      };

      // Giả sử bạn có một action Vuex để tạo đơn hàng
      this.$store
        .dispatch("order/createOrder", orderData)
        .then(() => {
          // Điều hướng đến trang xác nhận đơn hàng hoặc trang chủ
          this.$router.push("/order-confirmation");
        })
        .catch((error) => {
          console.error("Lỗi khi tạo đơn hàng:", error);
          alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
        });
    },
  },
});
</script>

<style scoped>
.v-table th {
  text-align: left;
}
.v-table td {
  text-align: right;
}
</style>
