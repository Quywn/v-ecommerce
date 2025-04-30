import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Product } from "@/models/product";
import productService from "@/services/productService";

@Module({ namespaced: true })
export default class ProductModule extends VuexModule {
  // State
  products: Product[] = [];

  //Todo: Check mutation update productList
  @Mutation
  setProducts(products: Product[]) {
    this.products = products;
  }

  // Action fetch Products
  @Action
  async fetchProducts() {
    try {
      const data = await productService.getAll();
      this.context.commit("setProducts", data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  }

  // Action create Product
  @Action
  async createProduct(product: Product) {
    try {
      await productService.create(product);
      this.context.dispatch("fetchProducts");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  }

  // Action update Product
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
