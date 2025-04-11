<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="400">
      <v-card-title class="text-h6">Đăng nhập</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field v-model="email" label="Email" required />
          <v-text-field
            v-model="password"
            label="Mật khẩu"
            type="password"
            required
          />
          <v-btn color="primary" type="submit" block>Đăng nhập</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  // Giả lập xử lý đăng nhập
  console.log("Email:", email.value);
  console.log("Password:", password.value);
};
</script>
