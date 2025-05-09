<template>
  <v-container>
    <h2 class="mb-4">Lịch sử đơn hàng</h2>

    <v-alert
      v-if="orders.length === 0"
      type="info"
      border="left"
      colored-border
    >
      Bạn chưa có đơn hàng nào.
    </v-alert>

    <v-expansion-panels focusable>
      <v-expansion-panel v-for="(order, index) in orders" :key="index">
        <v-expansion-panel-header>
          <div class="d-flex justify-space-between align-center w-100">
            <div>
              <strong>Đơn hàng #{{ order.id }}</strong> - Ngày:
              {{ formatDate(order.orderDate) }}
            </div>
            <div class="font-weight-bold">
              {{ formatCurrency(order.totalAmount) }}
            </div>
          </div>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left">Sản phẩm</th>
                <th class="text-right">Số lượng</th>
                <th class="text-right">Giá</th>
                <th class="text-right">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in order.items" :key="idx">
                <td>{{ item.productName }}</td>
                <td class="text-right">{{ item.quantity }}</td>
                <td class="text-right">{{ formatCurrency(item.price) }}</td>
                <td class="text-right">
                  {{ formatCurrency(item.quantity * item.price) }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <div class="mt-2 text-right">
            <strong>Trạng thái:</strong> {{ order.status }}
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "@/plugins/axios";
import { namespace } from "vuex-class";

const AuthModule = namespace("auth");

@Component
export default class OrdersHistoryPage extends Vue {
  @AuthModule.Getter("username") username!: string;

  orders: any[] = [];

  async mounted() {
    if (this.username) {
      try {
        const response = await axios.get("/user/history", {
          params: { username: this.username },
        });

        console.log("📦 Raw response data:", response.data);

        this.orders = response.data.map((order: any) => {
          const items = Object.entries(order.orderedProducts)
            .map(([key, quantity]) => {
              const regex = /productName=([^,]+), price=([\d.]+),/;
              const match = key.match(regex);
              return match
                ? {
                    productName: match[1],
                    price: parseFloat(match[2]),
                    quantity: quantity,
                  }
                : null;
            })
            .filter((item) => item !== null);

          return {
            id: order.orderId,
            orderDate: new Date().toISOString(), // todo: fix date-time BE
            totalAmount: items.reduce(
              (sum, item) => sum + item!.price * item!.quantity,
              0
            ),
            status: "Đã giao",
            items,
          };
        });

        console.log("Parsed orders:", this.orders);
      } catch (error) {
        console.error("Không thể lấy lịch sử đơn hàng:", error);
        alert("Lỗi khi tải lịch sử đơn hàng.");
      }
    }
  }

  formatCurrency(value: number): string {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN");
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
