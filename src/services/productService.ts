import axios from "@/plugins/axios";

import { Product } from "@/models/product";

export default {
  // get all products
  getAll(): Promise<Product[]> {
    return axios
      .get("/general/products")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Lỗi khi lấy tất cả sản phẩm:", error);
        throw error;
      });
  },

  // Add new product
  create(product: Product): Promise<Product> {
    return axios
      .post("/admin/product/create", product)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Lỗi khi thêm sản phẩm:", error);
        throw error;
      });
  },

  // Update product
  update(product: Product): Promise<Product> {
    return axios
      .put("/admin/product/update", product)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        throw error;
      });
  },

  // Delete product
  delete(productCode: string): Promise<void> {
    return (
      axios
        .delete(`/admin/product/delete`, { params: { productCode } })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .then(() => {})
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm:", error);
          throw error;
        })
    );
  },
  // Search product
  filterLocal(products: Product[], keyword: string): Product[] {
    if (!keyword) return products;
    const lower = keyword.toLowerCase();
    return products.filter((p) => p.productName.toLowerCase().includes(lower));
  },
};
