<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>📦 Danh sách sản phẩm</v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Tìm kiếm sản phẩm"
        dense
        hide-details
        class="mr-4"
      />
      <v-btn color="primary" @click="openDialog()">+ Thêm sản phẩm</v-btn>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="filteredProducts"
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

    <!-- Dialog thêm/sửa sản phẩm -->
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

    <!-- Dialog xác nhận xóa -->
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
import { Product } from "@/models/product";
import { Category } from "@/models/category";
import categoryService from "@/services/categoryService";
import { Action, State } from "vuex-class"; // Import vuex-class decorators

@Component
export default class ProductTableComponent extends Vue {
  // State lấy từ Vuex
  @State("products", { namespace: "product" }) products!: Product[];

  // Actions lấy từ Vuex
  @Action("fetchProducts", { namespace: "product" })
  fetchProducts!: () => Promise<void>;
  @Action("createProduct", { namespace: "product" }) createProduct!: (
    product: Product
  ) => Promise<void>;
  @Action("updateProduct", { namespace: "product" }) updateProduct!: (
    product: Product
  ) => Promise<void>;
  @Action("deleteProduct", { namespace: "product" }) deleteProduct!: (
    productCode: string
  ) => Promise<void>;

  // other variables
  search = "";
  categories: Category[] = [];
  dialog = false;
  confirm = false;
  toDelete: Product | null = null;
  editedItem: Product = this.resetItem();
  headers = [
    { text: "Tên sản phẩm", value: "productName" },
    { text: "Giá", value: "price" },
    { text: "Danh mục", value: "category.categoryName" },
    { text: "Tồn kho", value: "quantityStock" },
    { text: "Đã bán", value: "quantityOrdered" },
    { text: "Hành động", value: "actions", sortable: false },
  ];

  // Computed: lọc sản phẩm theo từ khóa tìm kiếm
  get filteredProducts(): Product[] {
    if (!this.search) return this.products;
    const keyword = this.search.toLowerCase();
    return this.products.filter((p) =>
      p.productName.toLowerCase().includes(keyword)
    );
  }

  // Reset form mặc định
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

  // Khi component được mount
  mounted() {
    this.fetchProducts();
  }

  // Lưu sản phẩm
  async save() {
    if (this.editedItem.productCode) {
      await this.updateProduct(this.editedItem);
    } else {
      await this.createProduct(this.editedItem);
    }
    this.dialog = false;
  }

  // Xóa sản phẩm
  async deleteItem() {
    if (this.toDelete && this.toDelete.productCode) {
      await this.deleteProduct(this.toDelete.productCode);
    }
    this.confirm = false;
  }

  confirmDelete(item: Product) {
    this.toDelete = item; // save Product to toDelete
    this.confirm = true; // open dialog confirm
  }

  // Mở dialog thêm/sửa sản phẩm
  openDialog(item: Product | null = null) {
    this.editedItem = item ? { ...item } : this.resetItem();
    this.dialog = true;
  }
}
</script>
