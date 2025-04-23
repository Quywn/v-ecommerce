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
import axios from "axios";

@Component
export default class Login extends Vue {
  username = "";
  password = "";
  showPassword = false;
  usernameRules = [(v: string) => !!v || "Email không được để trống"];

  passwordRules = [
    (v: string) => !!v || "Mật khẩu không được để trống",
    (v: string) => v.length >= 6 || "Mật khẩu tối thiểu 6 ký tự",
  ];

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async handleLogin() {
    try {
      const role: string = await this.$store.dispatch("auth/login", {
        username: this.username,
        password: this.password,
      });

      // ✅ Redirect theo role
      if (role === "admin") {
        this.$router.push("/admin/dashboard");
      } else {
        this.$router.push("/");
      }
    } catch (error) {
      alert("Đăng nhập thất bại!");
      console.error(error);
    }
  }

  goToRegister() {
    this.$router.push("/register");
  }
}
</script>
