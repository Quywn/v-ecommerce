<template>
  <div class="custom-background">
    <!-- About Section -->
    <v-container class="py-10">
      <v-row>
        <v-col cols="12" md="6">
          <v-img src="@/assets/banner1.png" height="300" contain />
        </v-col>
        <v-col cols="12" md="6">
          <h2 class="text-h4 font-weight-bold mb-4">Về Chúng Tôi</h2>
          <p class="mb-4">
            <strong>Quyen's bakery</strong> là thương hiệu bánh mì tươi với
            nhiều năm kinh nghiệm phục vụ khách hàng trên toàn quốc. Chúng tôi
            mang đến những ổ bánh thơm ngon, nóng hổi với tiêu chí "ngon - nhanh
            - sạch".
          </p>
          <p class="mb-4">
            Từng ổ bánh là cả tâm huyết từ khâu chọn nguyên liệu đến lúc giao
            đến tay khách hàng. Với đội ngũ thợ bánh chuyên nghiệp, chúng tôi
            cam kết chất lượng trong từng sản phẩm.
          </p>
        </v-col>
      </v-row>

      <v-row class="my-12" justify="center">
        <v-col cols="12">
          <h2 class="text-h5 text-center font-weight-medium mb-6">
            Giá trị cốt lõi
          </h2>
        </v-col>

        <v-col cols="12" md="4" class="text-center">
          <v-icon size="48" color="amber darken-2">mdi-baguette</v-icon>
          <h3 class="text-h6 mt-2">Chất lượng hàng đầu</h3>
          <p>Luôn đảm bảo bánh tươi, thơm ngon, đúng chuẩn.</p>
        </v-col>

        <v-col cols="12" md="4" class="text-center">
          <v-icon size="48" color="green">mdi-hand-heart</v-icon>
          <h3 class="text-h6 mt-2">Phục vụ tận tâm</h3>
          <p>Lắng nghe, thấu hiểu và làm hài lòng từng khách hàng.</p>
        </v-col>

        <v-col cols="12" md="4" class="text-center">
          <v-icon size="48" color="blue">mdi-lightbulb-on-outline</v-icon>
          <h3 class="text-h6 mt-2">Sáng tạo không ngừng</h3>
          <p>Liên tục phát triển sản phẩm mới, đậm đà hương vị Việt.</p>
        </v-col>
      </v-row>

      <!-- Feedback Section -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h5 font-weight-medium mb-6 text-center">
            Khách hàng nói gì?
          </h2>
        </v-col>

        <v-col
          cols="12"
          md="4"
          v-for="feedback in feedbacks"
          :key="feedback.name"
        >
          <v-card elevation="2" class="pa-4">
            <p>"{{ feedback.comment }}"</p>
            <strong class="mt-2 d-block">- {{ feedback.name }}</strong>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const feedbacks = [
  {
    name: "Linh Trần",
    comment: "Bánh ngon, nóng hổi, đúng vị! Giao hàng siêu nhanh.",
  },
  { name: "Nam Nguyễn", comment: "Bánh đầy đặn, nhân nhiều, giá hợp lý." },
  { name: "Hà My", comment: "Mình ăn suốt mấy tháng nay rồi, rất hài lòng!" },
];
</script>

<style scoped>
.custom-background {
  background-color: #fff3e0;
}
</style>
