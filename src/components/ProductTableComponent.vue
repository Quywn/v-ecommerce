<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>📦 Danh sách sản phẩm</v-toolbar-title>
      <v-spacer />
      <v-btn color="primary" @click="openDialog()">+ Thêm sản phẩm</v-btn>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="products"
      item-key="productCode"
      class="elevation-1"
    >
      <template slot="item.actions" slot-scope="{ item }">
        <v-icon small @click="openDialog(item)">mdi-pencil</v-icon>
        <v-icon small color="red" @click="confirmDelete(item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>

    <!-- Form thêm/sửa -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          {{ editedItem.productCode ? "✏️ Sửa" : "➕ Thêm" }} sản phẩm
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="editedItem.productName"
              label="Tên sản phẩm"
            />
            <v-text-field
              v-model="editedItem.price"
              label="Giá"
              type="number"
            />
            <v-select
              v-model="editedItem.category"
              :items="categories"
              item-text="categoryName"
              :return-object="true"
              label="Danh mục"
            />
            <v-text-field
              v-model="editedItem.quantityStock"
              label="Tồn kho"
              type="number"
            />
            <v-text-field
              v-model="editedItem.quantityOrdered"
              label="Đã bán"
              type="number"
            />
            <v-text-field v-model="editedItem.imageUrl" label="Ảnh URL" />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Hủy</v-btn>
          <v-btn color="primary" @click="save">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Xác nhận xóa -->
    <v-dialog v-model="confirm" max-width="400px">
      <v-card>
        <v-card-title>Xác nhận xóa</v-card-title>
        <v-card-text>
          Bạn có chắc muốn xóa <strong>{{ toDelete?.productName }}</strong
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
import { Vue, Component } from "vue-property-decorator";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import productService from "@/services/productService";
import categoryService from "@/services/categoryService";

@Component
export default class ProductTableComponent extends Vue {
  products: Product[] = [];
  categories: Category[] = [];

  headers = [
    { text: "Tên sản phẩm", value: "productName" },
    { text: "Giá", value: "price" },
    { text: "Danh mục", value: "category.categoryName" },
    { text: "Tồn kho", value: "quantityStock" },
    { text: "Đã bán", value: "quantityOrdered" },
    { text: "Hành động", value: "actions", sortable: false },
  ];

  dialog = false;
  confirm = false;
  toDelete: Product | null = null;
  editedItem: Product = this.resetItem();

  mounted() {
    this.fetchAll();
  }

  resetItem(): Product {
    return {
      productCode: "",
      productName: "",
      price: 0,
      category: {
        categoryName: "",
        categoryCode: "",
      },
      quantityStock: 0,
      quantityOrdered: 0,
      imageUrl: "",
    };
  }

  async fetchAll() {
    this.products = await productService.getAll();
    this.categories = await categoryService.getAll();
  }

  openDialog(item: Product | null = null) {
    this.editedItem = item ? { ...item } : this.resetItem();
    this.dialog = true;
  }

  async save() {
    try {
      if (this.editedItem.productCode) {
        await productService.update(
          this.editedItem.productCode,
          this.editedItem
        );
      } else {
        await productService.create(this.editedItem);
      }
      this.dialog = false;
      await this.fetchAll();
    } catch (err) {
      console.error("Lỗi khi lưu sản phẩm:", err);
    }
  }

  confirmDelete(item: Product) {
    this.toDelete = item;
    this.confirm = true;
  }

  async deleteItem() {
    if (this.toDelete && this.toDelete.productCode) {
      try {
        await productService.delete(this.toDelete.productCode);
        await this.fetchAll();
      } catch (err) {
        console.error("Lỗi khi xóa sản phẩm:", err);
      }
    }
    this.confirm = false;
  }
}
</script>
