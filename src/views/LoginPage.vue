<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="400">
      <v-card-title class="text-h6">Đăng nhập</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field v-model="username" label="Username" required />
          <v-text-field
            v-model="password"
            label="Mật khẩu"
            type="password"
            required
          />
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
export default class Login extends Vue {
  valid = false;
  email = "";
  password = "";

  emailRules = [
    (v: string) => !!v || "Email không được để trống",
    (v: string) => /.+@.+\..+/.test(v) || "Email không hợp lệ",
  ];

  passwordRules = [
    (v: string) => !!v || "Mật khẩu không được để trống",
    (v: string) => v.length >= 6 || "Mật khẩu tối thiểu 6 ký tự",
  ];

  login() {
    if ((this.$refs.form as any).validate()) {
      console.log("Đăng nhập:", this.email, this.password);
      // Xử lý đăng nhập ở đây
    }
  }

  goToRegister() {
    this.$router.push("/register");
  }
}
</script>
