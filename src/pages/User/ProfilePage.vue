<template>
  <v-container>
    <h2 class="mb-4">Cập nhật thông tin cá nhân</h2>

    <v-form ref="form" v-if="editableUser">
      <!-- User's Information -->
      <v-text-field v-model="editableUser.name" label="Họ tên" required />
      <v-text-field v-model="editableUser.address" label="Địa chỉ" required />
      <v-text-field
        v-model="editableUser.phone"
        label="Số điện thoại"
        required
      />
      <v-text-field
        v-model="editableUser.email"
        label="Email"
        type="email"
        required
      />

      <v-divider class="my-4"></v-divider>
      <v-text-field
        v-model="newPassword"
        label="Mật khẩu mới"
        type="newPassword"
        hint="Để trống nếu không đổi"
        persistent-hint
      />
      <v-text-field
        v-if="newPassword"
        v-model="oldPassword"
        label="Xác nhận mật khẩu hiện tại"
        type="newPassword"
        required
      />

      <v-row class="mt-4">
        <v-col cols="6">
          <v-btn block @click="resetChanges">Hủy thay đổi</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block color="primary" :loading="isSaving" @click="saveProfile">
            Lưu thay đổi
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-alert v-else type="error" class="mt-6">
      Không thể tải thông tin người dùng.
    </v-alert>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "@/models/user";

const AuthModule = namespace("auth");
const UserModule = namespace("user");

@Component
export default class ProfilePage extends Vue {
  @AuthModule.Getter("username") username!: string;
  @UserModule.Getter("profile") user!: User | null;
  @UserModule.Action("fetchUserProfile") fetchUserProfile!: (
    username: string
  ) => Promise<void>;
  @UserModule.Action("updateUser") updateUser!: (payload: any) => Promise<void>;

  editableUser: User | null = null;
  newPassword = "";
  oldPassword = "";
  isSaving = false;

  async mounted() {
    if (!this.user && this.username) {
      await this.fetchUserProfile(this.username);
    }
    this.resetChanges();
  }

  resetChanges() {
    this.editableUser = this.user ? { ...this.user } : null;
    this.newPassword = "";
    this.oldPassword = "";
  }

  async saveProfile() {
    if (!this.editableUser) {
      alert("Thông tin người dùng không hợp lệ.");
      return;
    }

    // Kiểm tra đổi mật khẩu
    const payload: any = {
      ...this.editableUser,
    };

    if (this.newPassword) {
      if (!this.oldPassword) {
        alert("Vui lòng nhập mật khẩu hiện tại để xác nhận đổi mật khẩu.");
        return;
      }
      payload.newPassword = this.newPassword;
      payload.oldPassword = this.oldPassword;
    }

    this.isSaving = true;
    try {
      await this.updateUser(payload);
      alert("Cập nhật thông tin thành công!");
      this.resetChanges();
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      this.isSaving = false;
    }
  }
}
</script>

<style scoped>
.v-form {
  max-width: 600px;
}
</style>
