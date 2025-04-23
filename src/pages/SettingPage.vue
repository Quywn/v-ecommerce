<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">Cài đặt hệ thống</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-subheader>Thông tin cửa hàng</v-subheader>
          <v-text-field
            v-model="settings.storeName"
            label="Tên cửa hàng"
            :rules="storeNameRules"
            required
          />
          <v-text-field v-model="settings.address" label="Địa chỉ" />
          <v-text-field v-model="settings.hotline" label="Hotline" type="tel" />

          <v-subheader>Cài đặt chung</v-subheader>
          <v-select
            v-model="settings.language"
            :items="languages"
            label="Ngôn ngữ"
          />
          <v-select
            v-model="settings.timezone"
            :items="timezones"
            label="Múi giờ"
          />
          <v-select
            v-model="settings.currency"
            :items="currencies"
            label="Tiền tệ"
          />

          <v-subheader>Thông tin vận chuyển</v-subheader>
          <v-text-field
            v-model.number="settings.shippingFee"
            label="Phí giao hàng mặc định (đ)"
            :rules="shippingFeeRules"
            type="number"
            min="0"
          />
          <v-switch
            v-model="settings.freeShippingOver"
            label="Miễn phí ship cho đơn hàng giá trị cao"
          />
          <v-text-field
            v-if="settings.freeShippingOver"
            v-model.number="settings.freeShippingThreshold"
            label="Miễn phí ship với đơn từ (đ)"
            type="number"
            min="0"
          />

          <v-subheader>Hiển thị</v-subheader>
          <v-file-input
            v-model="settings.logo"
            label="Logo cửa hàng"
            accept="image/*"
            show-size
          />
          <v-file-input
            v-model="settings.favicon"
            label="Favicon"
            accept="image/x-icon"
          />
          <v-file-input
            v-model="settings.banners"
            label="Ảnh banner"
            accept="image/*"
            multiple
            show-size
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveSettings">Lưu cài đặt</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { required, maxLength, positiveNumber } from "@/utils/validators";

export default Vue.extend({
  name: "SettingPage",
  data() {
    return {
      valid: false,
      settings: {
        storeName: "",
        address: "",
        hotline: "",
        language: "vi",
        timezone: "Asia/Ho_Chi_Minh",
        currency: "VND",
        shippingFee: 30000,
        freeShippingOver: false,
        freeShippingThreshold: 500000,
        logo: null as File | null,
        favicon: null as File | null,
        banners: [] as File[],
      },
      languages: [
        { text: "Tiếng Việt", value: "vi" },
        { text: "English", value: "en" },
      ],
      timezones: ["Asia/Ho_Chi_Minh", "Asia/Bangkok", "Asia/Tokyo", "UTC"],
      currencies: ["VND", "USD", "EUR", "JPY"],
      // Validator rules
      storeNameRules: [required("Tên cửa hàng"), maxLength(100)],
      shippingFeeRules: [positiveNumber("Phí giao hàng")],
    };
  },
  methods: {
    saveSettings(): void {
      const form = this.$refs.form as Vue & { validate: () => boolean };
      if (form.validate()) {
        const formData = new FormData();

        Object.keys(this.settings).forEach((key) => {
          const value = (this.settings as any)[key];
          if (key === "banners" && Array.isArray(value)) {
            value.forEach((file: File, index: number) => {
              formData.append(`banners[${index}]`, file);
            });
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value);
          }
        });

        // ToDo: send to BE
        console.log("Dữ liệu gửi:", formData);

        // Notice
        this.$emit("show-toast", "Đã lưu cài đặt hệ thống");
      }
    },
  },
});
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
