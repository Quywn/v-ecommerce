<template>
  <div>
    <v-btn color="primary" @click="openDialog()">Thêm danh mục</v-btn>
    <template>
      <v-data-table :headers="headers" :items="products">
        <template slot="item.category" slot-scope="{ item }">
          {{ getCategoryName(item.categoryId) }}
        </template>
        <template slot="item.actions" slot-scope="{ item }">
          <v-icon small class="mr-2" @click="editProduct(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deleteProduct(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline"
            >{{ editedIndex === -1 ? "Thêm" : "Sửa" }} danh mục</span
          >
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedItem.name" label="Tên danh mục" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">Hủy</v-btn>
          <v-btn text @click="saveCategory">Lưu</v-btn>
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
      },
      headers: [
        { text: "Tên danh mục", value: "name" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      categories: [
        { id: 1, name: "Điện thoại" },
        { id: 2, name: "Laptop" },
      ],
    };
  },
  methods: {
    openDialog() {
      this.editedIndex = -1;
      this.editedItem = { name: "" };
      this.dialog = true;
    },
    editCategory(item) {
      this.editedIndex = this.categories.findIndex((c) => c.id === item.id);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteCategory(id) {
      this.categories = this.categories.filter((c) => c.id !== id);
    },
    closeDialog() {
      this.dialog = false;
    },
    saveCategory() {
      if (this.editedIndex === -1) {
        this.categories.push({ ...this.editedItem, id: Date.now() });
      } else {
        Object.assign(this.categories[this.editedIndex], this.editedItem);
      }
      this.closeDialog();
    },
  },
};
</script>
