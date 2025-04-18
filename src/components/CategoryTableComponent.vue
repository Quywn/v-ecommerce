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
      <v-btn color="primary" @click="openDialog">+ Thêm danh mục</v-btn>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="filteredCategories"
      item-key="categoryName"
      class="elevation-1"
    >
      <template slot="item.actions" slot-scope="{ item }">
        <v-icon small @click="confirmDelete(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <!-- Dialog thêm danh mục -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>➕ Thêm danh mục</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedItem.categoryName"
            label="Tên danh mục"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">Hủy</v-btn>
          <v-btn color="primary" @click="save">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog xác nhận xóa -->
    <v-dialog v-model="confirm" max-width="400">
      <v-card>
        <v-card-title>Xác nhận xóa</v-card-title>
        <v-card-text>
          Bạn có chắc muốn xóa <strong>{{ toDelete?.categoryName }}</strong
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

<script lang="ts">
import Vue from "vue";
import categoryService from "@/services/categoryService";
import { Category } from "@/models/category";

export default Vue.extend({
  data() {
    return {
      search: "",
      dialog: false,
      confirm: false,
      toDelete: null as Category | null,
      editedItem: {
        categoryName: "",
      } as Category,
      categories: [] as Category[],
      headers: [
        { text: "Tên danh mục", value: "categoryName" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    filteredCategories(): Category[] {
      if (!this.search) return this.categories;
      const keyword = this.search.toLowerCase();
      return this.categories.filter((c) =>
        c.categoryName.toLowerCase().includes(keyword)
      );
    },
  },
  methods: {
    async fetchCategories() {
      try {
        this.categories = await categoryService.getAll();
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    },
    openDialog() {
      this.editedItem = { categoryName: "" };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    async save() {
      try {
        if (this.editedItem.categoryName) {
          await categoryService.create(this.editedItem);
          this.closeDialog();
          this.fetchCategories();
        }
      } catch (error) {
        console.error("Lỗi khi thêm danh mục:", error);
      }
    },
    confirmDelete(item: Category) {
      this.toDelete = item;
      this.confirm = true;
    },
    async deleteItem() {
      try {
        if (this.toDelete) {
          await categoryService.delete(this.toDelete.categoryName);
          this.fetchCategories();
        }
      } catch (error) {
        console.error("Lỗi khi xoá danh mục:", error);
      } finally {
        this.confirm = false;
        this.toDelete = null;
      }
    },
  },
  mounted() {
    this.fetchCategories();
  },
});
</script>
