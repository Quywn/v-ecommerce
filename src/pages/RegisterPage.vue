<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="400">
      <v-card-title class="text-h6">Đăng ký</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleRegister" ref="form" v-model="valid">
          <v-text-field v-model="username" label="Username" required />
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
          />
          <v-text-field
            v-model="newPassword"
            label="Mật khẩu"
            type="newPassword"
            :rules="passwordRules"
            required
          />
          <v-text-field
            v-model="confirmPassword"
            label="Xác nhận mật khẩu"
            type="newPassword"
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
import axios from "axios";

@Component
export default class Register extends Vue {
  valid = false;
  username = "";
  email = "";
  newPassword = "";
  confirmPassword = "";

  emailRules = [
    (v: string) => !!v || "Email không được để trống",
    (v: string) => /.+@.+\..+/.test(v) || "Email không hợp lệ",
  ];

  passwordRules = [
    (v: string) => !!v || "Mật khẩu không được để trống",
    (v: string) => v.length >= 6 || "Mật khẩu tối thiểu 6 ký tự",
  ];

  get confirmPasswordRules() {
    return [
      (v: string) => !!v || "Xác nhận mật khẩu không được để trống",
      (v: string) =>
        v === this.newPassword || "Mật khẩu xác nhận không khớp với mật khẩu",
    ];
  }

  // Register
  async handleRegister() {
    if ((this.$refs.form as any).validate()) {
      console.log("Đăng ký:", this.email, this.newPassword);
      try {
        await axios.post("http://localhost:1234/register", {
          username: this.username,
          email: this.email,
          newPassword: this.newPassword,
        });
        alert("Đăng ký thành công!");
        this.$router.push("/login");
      } catch (error) {
        alert("Đăng ký thất bại!");
        console.error(error);
      }
    }
  }

  goToLogin() {
    this.$router.push("/login");
  }
}
</script>
