// src/services/productService.ts
import axios from "@/plugins/axios";
import { Product } from "@/models/product";

export default {
  // Lấy danh sách tất cả sản phẩm
  getAll(): Promise<Product[]> {
    return axios.get("/general/products").then((res) => res.data);
  },

  // Thêm sản phẩm
  create(product: Product): Promise<Product> {
    return axios.post("/admin/product/create", product).then((res) => res.data);
  },

  // Sửa sản phẩm
  update(product: Product): Promise<Product> {
    return axios.put("/admin/product/update", product).then((res) => res.data);
  },

  // Xoá sản phẩm theo tên
  delete(productName: string): Promise<string> {
    return axios
      .delete(`/admin/product/delete`, {
        params: { productName },
      })
      .then((res) => res.data);
  },
};
