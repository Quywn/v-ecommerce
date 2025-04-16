<template>
  <v-container fluid>
    <v-card class="my-5 pa-5">
      <v-card-title>Cài đặt cửa hàng</v-card-title>
      <v-form ref="form" v-model="valid">
        <v-text-field
          label="Tên cửa hàng"
          v-model="store.name"
          :rules="[rules.required]"
        />
        <v-text-field label="Địa chỉ" v-model="store.address" />
        <v-text-field label="Hotline" v-model="store.hotline" />
        <v-text-field
          label="Email liên hệ"
          v-model="store.email"
          :rules="[rules.email]"
        />
        <v-file-input
          label="Logo cửa hàng"
          prepend-icon="mdi-image"
          v-model="store.logo"
          accept="image/*"
        />
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="saveSettings">Lưu thay đổi</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="my-5 pa-5">
      <v-card-title>Cấu hình hệ thống</v-card-title>
      <v-select
        label="Ngôn ngữ mặc định"
        :items="['Tiếng Việt', 'English']"
        v-model="config.language"
      />
      <v-select
        label="Múi giờ"
        :items="['Asia/Ho_Chi_Minh', 'UTC', 'Asia/Tokyo']"
        v-model="config.timezone"
      />
      <v-select
        label="Đơn vị tiền tệ"
        :items="['VND', 'USD']"
        v-model="config.currency"
      />
      <v-text-field
        label="Phí vận chuyển mặc định"
        v-model="config.shippingFee"
        type="number"
        suffix="₫"
      />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AdminSetting",
  data() {
    return {
      valid: true,
      store: {
        name: "Shop ABC",
        address: "123 Đường A, Quận B, TP.HCM",
        hotline: "0123 456 789",
        email: "shop@example.com",
        logo: null,
      },
      config: {
        language: "Tiếng Việt",
        timezone: "Asia/Ho_Chi_Minh",
        currency: "VND",
        shippingFee: 30000,
      },
      rules: {
        required: (v: string) => !!v || "Không được để trống",
        email: (v: string) =>
          !v ||
          /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ||
          "Email không hợp lệ",
      },
    };
  },
  methods: {
    saveSettings() {
      if ((this.$refs.form as any).validate()) {
        console.log("Lưu cấu hình:", this.store, this.config);
        // TODO: Gửi API lưu cấu hình
        this.$toast && this.$toast.success("Đã lưu cấu hình thành công");
      }
    },
  },
});
</script>
