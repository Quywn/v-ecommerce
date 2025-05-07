<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <span class="headline">Quản lý đơn hàng</span>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Tìm kiếm đơn hàng..."
          single-line
          hide-details
        />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="filteredOrders"
        item-key="id"
        :items-per-page="10"
        class="elevation-1"
      >
        <template slot="item.status" slot-scope="props">
          <v-select
            v-model="props.item.status"
            :items="orderStatuses"
            dense
            solo
            hide-details
            @change="updateOrderStatus(props.item)"
          />
        </template>

        <template slot="item.actions" slot-scope="props">
          <v-btn icon @click="viewOrder(props.item)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog Chi tiết đơn hàng -->
    <v-dialog v-model="detailDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Chi tiết đơn hàng</span>
        </v-card-title>
        <v-card-text>
          <p><strong>Mã đơn hàng:</strong> {{ selectedOrder?.id }}</p>
          <p><strong>Khách hàng:</strong> {{ selectedOrder?.customerName }}</p>
          <p><strong>Trạng thái:</strong> {{ selectedOrder?.status }}</p>
          <p>
            <strong>Tổng tiền:</strong> {{ selectedOrder?.total | currency }}
          </p>
          <!-- todo: Product Detail -->
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="detailDialog = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

interface Order {
  id: string;
  customerName: string;
  status: string;
  total: number;
}

export default Vue.extend({
  name: "OrderManagementPage",
  data() {
    return {
      search: "",
      detailDialog: false,
      selectedOrder: null as Order | null,
      orders: [] as Order[],
      orderStatuses: ["Chờ xử lý", "Đang giao", "Đã giao", "Đã hủy"],
      headers: [
        { text: "Mã đơn hàng", value: "id" },
        { text: "Khách hàng", value: "customerName" },
        { text: "Trạng thái", value: "status" },
        { text: "Tổng tiền", value: "total" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    filteredOrders(): Order[] {
      const term = this.search.toLowerCase();
      return this.orders.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.customerName.toLowerCase().includes(term)
      );
    },
  },
  methods: {
    viewOrder(order: Order) {
      this.selectedOrder = order;
      this.detailDialog = true;
    },
    updateOrderStatus(order: Order) {
      // todo API BE /order/update
      console.log(`Cập nhật trạng thái đơn ${order.id} thành ${order.status}`);
      this.$emit("show-toast", `Đã cập nhật trạng thái đơn ${order.id}`);
    },
    fetchOrders() {
      // todo Gọi API BE GET /orders (demo fake)
      this.orders = [
        {
          id: "1",
          customerName: "User 1",
          status: "Chờ xử lý",
          total: 450000,
        },
        {
          id: "2",
          customerName: "User 2",
          status: "Đang giao",
          total: 780000,
        },
        {
          id: "3",
          customerName: "User 3",
          status: "Đã giao",
          total: 1200000,
        },
      ];
    },
  },
  filters: {
    currency(value: number) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
  mounted() {
    this.fetchOrders();
  },
});
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
