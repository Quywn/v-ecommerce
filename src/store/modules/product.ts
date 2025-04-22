import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Product } from "@/models/product";
import productService from "@/services/productService";

@Module({ namespaced: true })
export default class ProductModule extends VuexModule {
  // State
  products: Product[] = [];

  // Mutation để cập nhật danh sách sản phẩm
  @Mutation
  setProducts(products: Product[]) {
    this.products = products;
  }

  // Action để lấy dữ liệu sản phẩm
  @Action
  async fetchProducts() {
    try {
      const data = await productService.getAll();
      this.context.commit("setProducts", data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  }

  // Action để thêm sản phẩm mới
  @Action
  async createProduct(product: Product) {
    try {
      await productService.create(product);
      this.context.dispatch("fetchProducts");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  }

  // Action để sửa sản phẩm
  @Action
  async updateProduct(product: Product) {
    try {
      await productService.update(product);
      this.context.dispatch("fetchProducts");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  }

  // Action để xóa sản phẩm
  @Action
  async deleteProduct(productCode: string) {
    try {
      await productService.delete(productCode);
      this.context.dispatch("fetchProducts");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  }
}
