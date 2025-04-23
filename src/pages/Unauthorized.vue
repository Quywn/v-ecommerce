<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="400">
      <v-card-title class="text-h5">Lỗi quyền truy cập</v-card-title>
      <v-card-text class="text-center">
        <v-img
          src="@/assets/no-access.png"
          alt="No Access"
          height="200px"
        ></v-img>
        <p>Xin lỗi, bạn không có quyền truy cập vào trang này.</p>
        <v-btn @click="goHome" color="primary" block>Về trang chủ</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "UnauthorizedPage",
  methods: {
    goHome() {
      this.$router.push("/home");
    },
  },
};
</script>
