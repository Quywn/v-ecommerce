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
                <i class="fab fa-facebook-f"></i> Facebook
              </a>
            </li>
            <li>
              <a href="https://shopee.vn/quyencake" target="_blank">
                <i class="fab fa-shopify"></i> Shopee
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p>&copy; 2025 Cửa hàng Bánh Online - Hotline: 0xx.xxx.xxx</p>
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
.footer-container {
  display: flex;
  justify-content: space-between;
}

.footer-section {
  width: 30%;
}

.footer-bottom {
  text-align: center;
  padding-top: 1rem;
}

@media (max-width: 768px) {
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
