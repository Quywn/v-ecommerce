<template>
  <v-container>
    <v-tabs>
      <v-tab>Danh mục</v-tab>
      <v-tab>Sản phẩm</v-tab>

      <v-tab-item>
        <CategoryTable />
      </v-tab-item>
      <v-tab-item>
        <ProductTable />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import CategoryTable from "@/components/CategoryTableComponent.vue";
import ProductTable from "@/components/ProductTableComponent.vue";

export default {
  components: {
    CategoryTable,
    ProductTable,
  },
};
</script>
