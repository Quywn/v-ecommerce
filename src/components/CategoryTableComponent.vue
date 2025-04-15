<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>📁 Danh sách danh mục</v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Tìm kiếm danh mục..."
        dense
        hide-details
        class="mr-4"
      />
      <v-btn color="primary" @click="openDialog()">+ Thêm danh mục</v-btn>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="categories"
      item-key="id"
      class="elevation-1"
    >
      <template slot="item.actions" slot-scope="{ item }">
        <v-icon small class="mr-2" @click="openDialog(item)">mdi-pencil</v-icon>
        <v-icon small @click="confirmDelete(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>
          {{ editedItem.id ? "✏️ Sửa danh mục" : "➕ Thêm danh mục" }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedItem.name" label="Tên danh mục" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">Hủy</v-btn>
          <v-btn color="primary" @click="save">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      dialog: false,
      confirm: false,
      toDelete: null,
      editedItem: {},
      categories: [
        { id: 1, name: "Điện thoại" },
        { id: 2, name: "Laptop" },
      ],
      headers: [
        { text: "Tên danh mục", value: "name" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    openDialog(item = null) {
      this.editedItem = item ? { ...item } : { name: "" };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    save() {
      if (this.editedItem.id) {
        const index = this.categories.findIndex(
          (c) => c.id === this.editedItem.id
        );
        this.categories.splice(index, 1, this.editedItem);
      } else {
        this.editedItem.id = Date.now();
        this.categories.push(this.editedItem);
      }
      this.closeDialog();
    },
    confirmDelete(item) {
      this.toDelete = item;
      this.confirm = true;
    },
    deleteItem() {
      this.categories = this.categories.filter(
        (c) => c.id !== this.toDelete.id
      );
      this.confirm = false;
    },
  },
};
</script>
