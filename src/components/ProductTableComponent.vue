<template>
  <div>
    <v-btn color="primary" @click="openDialog()">Thêm sản phẩm</v-btn>
    <template>
      <v-data-table :headers="headers" :items="products" class="mt-4">
        <!-- Cập nhật lại slot category với slot-scope -->
        <template slot="item.category" slot-scope="{ item }">
          {{ getCategoryName(item.categoryId) }}
        </template>

        <!-- Cập nhật lại slot actions với slot-scope -->
        <template slot="item.actions" slot-scope="{ item }">
          <v-icon small class="mr-2" @click="editProduct(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deleteProduct(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </template>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"
            >{{ editedIndex === -1 ? "Thêm" : "Sửa" }} sản phẩm</span
          >
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="editedItem.name" label="Tên sản phẩm" />
          <v-text-field v-model="editedItem.price" label="Giá" type="number" />
          <v-select
            v-model="editedItem.categoryId"
            :items="categories"
            item-text="name"
            item-value="id"
            label="Danh mục"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">Hủy</v-btn>
          <v-btn color="primary" text @click="saveProduct">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        price: "",
        categoryId: null,
      },
      headers: [
        { text: "Tên sản phẩm", value: "name" },
        { text: "Giá", value: "price" },
        { text: "Danh mục", value: "category" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      categories: [
        { id: 1, name: "Điện thoại" },
        { id: 2, name: "Laptop" },
      ],
      products: [
        { id: 1, name: "iPhone 14", price: 20000000, categoryId: 1 },
        { id: 2, name: "MacBook Pro", price: 40000000, categoryId: 2 },
      ],
    };
  },
  methods: {
    openDialog() {
      this.editedIndex = -1;
      this.editedItem = { name: "", price: "", categoryId: null };
      this.dialog = true;
    },
    editProduct(item) {
      this.editedIndex = this.products.findIndex((p) => p.id === item.id);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
    },
    closeDialog() {
      this.dialog = false;
    },
    saveProduct() {
      if (this.editedIndex === -1) {
        this.products.push({ ...this.editedItem, id: Date.now() });
      } else {
        Object.assign(this.products[this.editedIndex], this.editedItem);
      }
      this.closeDialog();
    },
    getCategoryName(id) {
      const cat = this.categories.find((c) => c.id === id);
      return cat ? cat.name : "Không rõ";
    },
  },
};
</script>
