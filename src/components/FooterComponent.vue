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

<style scoped>
footer {
  background-color: #333 !important;
  color: white !important;
  padding: 40px 0;
  text-align: center;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.footer-section {
  width: 30%;
  margin-bottom: 20px;
}

.footer-section h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: bold;
  color: #ffcc00;
}

.footer-section p {
  font-size: 1em;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section a {
  color: white !important;
  text-decoration: none;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-section a:hover {
  color: #ffcc00;
}

.footer-section a i {
  font-size: 1.5em;
}

.footer-bottom {
  font-size: 0.9em;
  color: #bbb;
  text-align: center;
}
/* For small windows */
@media (max-width: 767px) {
  .footer-container {
    display: block;
    text-align: left;
  }

  .footer-section {
    width: 100%;
    margin-bottom: 20px;
  }

  .footer-section h3 {
    font-size: 1.2em;
  }
}
</style>
