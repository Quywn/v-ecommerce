<template>
  <v-card>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>📦 Danh sách sản phẩm</v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Tìm kiếm sản phẩm..."
        dense
        hide-details
        class="mr-4"
      />
      <v-btn color="primary" @click="openDialog()">+ Thêm sản phẩm</v-btn>
    </v-toolbar>

    <!-- Data table -->
    <v-data-table
      :headers="headers"
      :items="filteredProducts"
      item-key="id"
      class="elevation-1"
      :items-per-page="5"
    >
      <template slot="item.actions" slot-scope="{ item }">
        <v-icon small class="mr-2" @click="openDialog(item)">mdi-pencil</v-icon>
        <v-icon small @click="confirmDelete(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <!-- Dialog thêm/sửa -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ editedItem.id ? "✏️ Sửa sản phẩm" : "➕ Thêm sản phẩm" }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedItem.name" label="Tên sản phẩm" />
          <v-text-field
            v-model="editedItem.price"
            label="Giá (VNĐ)"
            type="number"
          />
          <v-select
            v-model="editedItem.category"
            :items="categories"
            label="Danh mục"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">Hủy</v-btn>
          <v-btn color="primary" @click="save">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirm xóa -->
    <v-dialog v-model="confirm" max-width="400">
      <v-card>
        <v-card-title>Xác nhận xóa</v-card-title>
        <v-card-text>
          Bạn có chắc muốn xóa <strong>{{ toDelete?.name }}</strong
          >?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="confirm = false">Hủy</v-btn>
          <v-btn color="red" text @click="deleteItem">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      confirm: false,
      toDelete: null,
      editedItem: {},
      headers: [
        { text: "Tên sản phẩm", value: "name" },
        { text: "Giá", value: "price" },
        { text: "Danh mục", value: "category" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      products: [
        { id: 1, name: "iPhone 15", price: 20000000, category: "Điện thoại" },
        { id: 2, name: "MacBook Air", price: 32000000, category: "Laptop" },
      ],
      categories: ["Điện thoại", "Laptop", "Phụ kiện"],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((p) =>
        p.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    openDialog(item = null) {
      this.editedItem = item
        ? { ...item }
        : { name: "", price: "", category: "" };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    save() {
      if (this.editedItem.id) {
        const index = this.products.findIndex(
          (p) => p.id === this.editedItem.id
        );
        this.products.splice(index, 1, this.editedItem);
      } else {
        this.editedItem.id = Date.now();
        this.products.push(this.editedItem);
      }
      this.closeDialog();
    },
    confirmDelete(item) {
      this.toDelete = item;
      this.confirm = true;
    },
    deleteItem() {
      this.products = this.products.filter((p) => p.id !== this.toDelete.id);
      this.confirm = false;
    },
  },
};
</script>
