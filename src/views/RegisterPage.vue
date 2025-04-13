<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="400">
      <v-card-title class="text-h6">Đăng ký</v-card-title>

      <v-card-text>
        <v-form
          @submit.prevent="handleRegister"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field v-model="username" label="Username" required />
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
          />
          <v-text-field
            v-model="password"
            label="Mật khẩu"
            type="password"
            :rules="passwordRules"
            required
          />
          <v-text-field
            v-model="confirmPassword"
            label="Xác nhận mật khẩu"
            type="password"
            :rules="confirmPasswordRules"
            required
          />

          <v-btn color="primary" type="submit" block>Đăng ký</v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <span>Đã có tài khoản?</span>
        <v-btn text color="primary" @click="goToLogin">Đăng nhập</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Register extends Vue {
  valid = false;
  email = "";
  password = "";
  confirmPassword = "";

  // Validation cho Email
  emailRules = [
    (v: string) => !!v || "Email không được để trống",
    (v: string) => /.+@.+\..+/.test(v) || "Email không hợp lệ",
  ];

  // Validation cho Mật khẩu
  passwordRules = [
    (v: string) => !!v || "Mật khẩu không được để trống",
    (v: string) => v.length >= 6 || "Mật khẩu tối thiểu 6 ký tự",
  ];

  // Validation cho Xác nhận Mật khẩu
  confirmPasswordRules = [
    (v: string) => !!v || "Xác nhận mật khẩu không được để trống",
    (v: string) =>
      v === this.password || "Mật khẩu xác nhận không khớp với mật khẩu",
  ];

  // Hàm đăng ký
  register() {
    if ((this.$refs.form as any).validate()) {
      console.log("Đăng ký:", this.email, this.password);
      // Bạn có thể gửi email và mật khẩu đến backend ở đây
    }
  }

  // Chuyển hướng đến trang đăng nhập
  goToLogin() {
    this.$router.push("/login");
  }
}
</script>
