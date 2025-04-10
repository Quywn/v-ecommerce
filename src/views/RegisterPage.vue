<template>
  <v-container>
    <v-form>
      <v-text-field label="Username" v-model="username" />
      <v-text-field label="Email" v-model="email" />
      <v-text-field label="Password" type="password" v-model="password" />
      <v-btn @click="register">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      // add logic
      console.log("Đăng ký với tên người dùng:", this.username);
    },
  },
};
</script>
