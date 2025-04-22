import axios from "@/plugins/axios"; // Giả sử bạn đã cấu hình axios trong plugins

import { Product } from "@/models/product";

export default {
  // Lấy tất cả sản phẩm
  getAll(): Promise<Product[]> {
    return axios
      .get("/general/products")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Lỗi khi lấy tất cả sản phẩm:", error);
        throw error;
      });
  },

  // Thêm mới sản phẩm
  create(product: Product): Promise<Product> {
    return axios
      .post("/admin/product/create", product)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Lỗi khi thêm sản phẩm:", error);
        throw error;
      });
  },

  // Cập nhật sản phẩm
  update(product: Product): Promise<Product> {
    return axios
      .put("/admin/product/update", product)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        throw error;
      });
  },

  // Xóa sản phẩm
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
};
