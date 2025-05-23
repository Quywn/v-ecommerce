<template>
  <v-container>
    <h1 class="mb-4">Giỏ hàng của bạn</h1>

    <v-alert v-if="filteredItems.length === 0" type="info" dense>
      Giỏ hàng trống.
    </v-alert>

    <v-row v-else>
      <v-col cols="12" v-for="(item, index) in filteredItems" :key="index">
        <v-card class="mb-3">
          <v-row no-gutters>
            <v-col cols="3">
              <v-img :src="item.product.imageUrl" height="100px"></v-img>
            </v-col>

            <v-col cols="6">
              <v-card-title>{{ item.product.productName }}</v-card-title>
              <v-card-subtitle
                >Đơn giá:
                {{ formatCurrency(item.product.price) }}</v-card-subtitle
              >

              <div class="d-flex align-center">
                <v-btn
                  small
                  @click="changeQuantity(item, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                  >-</v-btn
                >
                <v-text-field
                  v-model.number="item.quantity"
                  type="number"
                  min="1"
                  class="mx-2"
                  style="max-width: 60px"
                  @blur="updateQuantity(item)"
                />
                <v-btn small @click="changeQuantity(item, item.quantity + 1)"
                  >+</v-btn
                >
              </div>

              <div>
                Thành tiền:
                {{ formatCurrency(item.product.price * item.quantity) }}
              </div>
            </v-col>

            <v-col cols="3" class="text-right">
              <v-btn icon @click="removeItem(item.product.productCode)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Tổng tiền -->
      <v-col cols="12" class="text-right">
        <h3 class="mt-4">Tổng cộng: {{ formatCurrency(cartTotal) }}</h3>
        <v-btn color="primary" @click="goToCheckout"
          >Tiến hành thanh toán</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CartItem } from "@/models/cartItem";
import { mapGetters } from "vuex";

@Component({
  name: "CartPage",
  computed: {
    ...mapGetters("auth", ["username"]),
    ...mapGetters("cart", ["items", "total"]),
  },
})
export default class CartPage extends Vue {
  get cartItems(): CartItem[] {
    return this.$store.getters["cart/items"];
  }

  get cartTotal(): number {
    return this.$store.getters["cart/total"];
  }

  get filteredItems(): CartItem[] {
    // Chỉ hiển thị những sản phẩm có số lượng > 0
    return this.cartItems.filter((item) => item.quantity > 0);
  }

  get username(): string {
    return this.$store.getters["auth/username"];
  }

  mounted() {
    if (this.username) {
      this.$store.dispatch("cart/fetchCart", this.username);
    }
  }

  formatCurrency(value: number): string {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  removeItem(productCode: string) {
    this.$store.dispatch("cart/removeProductFromCart", {
      productCode: productCode,
      username: this.username,
    });
  }

  changeQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity < 1) return;
    item.quantity = newQuantity;
    this.updateQuantity(item);
  }

  updateQuantity(item: CartItem) {
    this.$store.dispatch("cart/updateProductQuantity", {
      productCode: item.product.productCode,
      quantity: item.quantity,
      username: this.username,
    });
  }

  goToCheckout() {
    this.$router.push("/checkout");
  }
}
</script>

<style scoped>
.v-img {
  object-fit: contain;
}
</style>
