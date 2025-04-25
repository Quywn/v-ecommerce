<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="400">
      <v-card-title class="text-h6">Đăng nhập</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="username"
            label="Tên đăng nhập"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Mật khẩu"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="togglePassword"
            required
          ></v-text-field>

          <v-btn color="primary" type="submit" block>Đăng nhập</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <span>Bạn chưa có tài khoản?</span>
        <v-btn text color="primary" @click="goToRegister">Đăng ký</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LoginPage extends Vue {
  username = "";
  password = "";
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async handleLogin() {
    try {
      const role: string = await this.$store.dispatch("auth/login", {
        username: this.username,
        password: this.password,
      });
      this.$router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra tài khoản/mật khẩu.");
    }
  }

  goToRegister() {
    this.$router.push("/register");
  }
}
</script>
