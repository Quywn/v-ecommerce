<template>
  <v-container>
    <v-form>
      <v-text-field label="Email" v-model="email" />
      <v-text-field label="Password" type="password" v-model="password" />
      <v-btn @click="login">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Thực hiện logic đăng nhập ở đây
      console.log("Đăng nhập với email:", this.email);
    },
  },
};
</script>
