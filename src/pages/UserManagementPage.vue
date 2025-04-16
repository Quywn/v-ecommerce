<template>
  <v-container fluid>
    <!-- SECTION: Tabs phân loại -->
    <v-tabs v-model="activeTab" background-color="primary" dark>
      <v-tab>Khách hàng</v-tab>
      <v-tab>Admin / Nhân viên</v-tab>
    </v-tabs>

    <!-- SECTION: Danh sách User -->
    <v-tabs-items v-model="activeTab">
      <!-- TAB 1: Khách hàng -->
      <v-tab-item>
        <v-card class="my-5">
          <v-card-title>
            Danh sách khách hàng
            <v-spacer />
            <v-text-field
              v-model="searchCustomer"
              append-icon="mdi-magnify"
              label="Tìm kiếm"
              single-line
              hide-details
              dense
            />
          </v-card-title>
          <v-data-table :headers="userHeaders" :items="filteredCustomers" dense>
            <template slot="item.actions" slot-scope="props">
              <v-btn icon small @click="editUser(props.item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon small @click="deactivateUser(props.item)">
                <v-icon color="red">mdi-block-helper</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <!-- TAB 2: Admin / Nhân viên -->
      <v-tab-item>
        <v-card class="my-5">
          <v-card-title>
            Danh sách admin / nhân viên
            <v-spacer />
            <v-text-field
              v-model="searchAdmin"
              append-icon="mdi-magnify"
              label="Tìm kiếm"
              single-line
              hide-details
              dense
            />
          </v-card-title>
          <v-data-table :headers="userHeaders" :items="filteredAdmins" dense>
            <template slot="item.actions" slot-scope="props">
              <v-btn icon small @click="editUser(props.item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon small @click="deactivateUser(props.item)">
                <v-icon color="red">mdi-block-helper</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  active: boolean;
}

export default Vue.extend({
  name: "AdminUser",
  data() {
    return {
      activeTab: 0,
      searchCustomer: "",
      searchAdmin: "",
      userHeaders: [
        { text: "Họ tên", value: "name" },
        { text: "Email", value: "email" },
        { text: "Vai trò", value: "role" },
        { text: "Ngày tạo", value: "createdAt" },
        { text: "Trạng thái", value: "active" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      users: [
        {
          id: 1,
          name: "Nguyễn Văn A",
          email: "a@example.com",
          role: "Khách hàng",
          createdAt: "2025-04-01",
          active: true,
        },
        {
          id: 2,
          name: "Trần Thị B",
          email: "b@example.com",
          role: "Admin",
          createdAt: "2025-03-28",
          active: true,
        },
        {
          id: 3,
          name: "Lê Văn C",
          email: "c@example.com",
          role: "Nhân viên",
          createdAt: "2025-03-20",
          active: false,
        },
      ] as User[],
    };
  },
  computed: {
    filteredCustomers(): User[] {
      return this.users.filter(
        (u) =>
          u.role === "Khách hàng" &&
          (u.name.toLowerCase().includes(this.searchCustomer.toLowerCase()) ||
            u.email.toLowerCase().includes(this.searchCustomer.toLowerCase()))
      );
    },
    filteredAdmins(): User[] {
      return this.users.filter(
        (u) =>
          (u.role === "Admin" || u.role === "Nhân viên") &&
          (u.name.toLowerCase().includes(this.searchAdmin.toLowerCase()) ||
            u.email.toLowerCase().includes(this.searchAdmin.toLowerCase()))
      );
    },
  },
  methods: {
    editUser(user: User) {
      console.log("Chỉnh sửa:", user);
      // TODO: Mở form chỉnh sửa
    },
    deactivateUser(user: User) {
      console.log("Vô hiệu hóa:", user);
      // TODO: Gọi API vô hiệu hóa tài khoản
    },
  },
});
</script>

<style scoped></style>
