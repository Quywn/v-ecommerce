<template>
  <v-container fluid>
    <!-- SECTION: Active Tabs: Admin User -->
    <v-tabs v-model="activeTab" background-color="primary" dark>
      <v-tab>Khách hàng</v-tab>
      <v-tab>Admin</v-tab>
    </v-tabs>

    <!-- SECTION: User List -->
    <v-tabs-items v-model="activeTab">
      <!-- TAB 1: User -->
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

      <!-- TAB 2: Admin -->
      <v-tab-item>
        <v-card class="my-5">
          <v-card-title>
            Danh sách admin
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
import { User } from "@/models/user";
import UserService from "@/services/userService";

export default Vue.extend({
  name: "UserManagementPage",
  data() {
    return {
      activeTab: 0,
      searchCustomer: "",
      searchAdmin: "",
      users: [] as User[],
      userHeaders: [
        { text: "Tên đăng nhập", value: "username" },
        { text: "Email", value: "email" },
        { text: "Họ tên", value: "name" },
        { text: "Số điện thoại", value: "phone" },
        { text: "Địa chỉ", value: "address" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    filteredCustomers(): User[] {
      return this.users.filter(
        (u) =>
          this.hasRole(u, "USER") &&
          (u.name?.toLowerCase().includes(this.searchCustomer.toLowerCase()) ||
            u.email?.toLowerCase().includes(this.searchCustomer.toLowerCase()))
      );
    },
    filteredAdmins(): User[] {
      return this.users.filter(
        (u) =>
          (this.hasRole(u, "ADMIN") || this.hasRole(u, "STAFF")) &&
          (u.name?.toLowerCase().includes(this.searchAdmin.toLowerCase()) ||
            u.email?.toLowerCase().includes(this.searchAdmin.toLowerCase()))
      );
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserService.getAllUsers();
        this.users = response;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách user:", error);
      }
    },
    hasRole(user: any, roleName: string): boolean {
      return (
        Array.isArray(user.roles) &&
        user.roles.some((r: any) => r.roleName === roleName)
      );
    },
    editUser(user: User) {
      console.log("Chỉnh sửa:", user);
      // TODO: mở form chỉnh sửa user
    },
    deactivateUser(user: User) {
      console.log("Vô hiệu hóa:", user);
      // TODO: gọi API để vô hiệu hóa user
    },
  },
  mounted() {
    this.fetchUsers();
  },
});
</script>
