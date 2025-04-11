<template>
  <v-footer padless>
    <v-container>
      <div class="footer-container">
        <div class="footer-section">
          <h3>Giới thiệu</h3>
          <p>
            Chúng tôi chuyên cung cấp các loại bánh ngọt, bánh mặn tươi ngon,
            được làm từ nguyên liệu chất lượng cao.
          </p>
        </div>

        <div class="footer-section">
          <h3>Thông tin liên hệ</h3>
          <p>Địa chỉ: #address</p>
          <p>Điện thoại: 0xx.xxx.xxx</p>
          <p>Email: lienhe@banhngon.com</p>
        </div>

        <div class="footer-section">
          <h3>Shop Online - Truy cập</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com/quyencake" target="_blank">
                <v-icon>mdi-facebook</v-icon> Facebook
                <!--todo: check trong vuetify có icon k-->
              </a>
            </li>
            <li>
              <a href="https://shopee.vn/quyencake" target="_blank">
                <v-icon>mdi-cart</v-icon> Shopee
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p>
          &copy; 2025 Bánh Mì 247 | Thơm ngon mỗi ngày 🥖 - Hotline: 0xx.xxx.xxx
        </p>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>
<style scoped src="@/styles/HomePage.css"></style>
