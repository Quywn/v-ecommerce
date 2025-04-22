import axios from "@/plugins/axios";
import { Product } from "@/models/product";

export default {
  // Get all products
  getAll(): Promise<Product[]> {
    return axios.get("/general/products").then((res) => res.data);
  },

  // Add product
  create(product: Product): Promise<Product> {
    return axios.post("/admin/product/create", product).then((res) => res.data);
  },

  // Edit product
  update(product: Product): Promise<Product> {
    return axios.put("/admin/product/update", product).then((res) => res.data);
  },

  // Get a product
  async getOne(productName: string): Promise<string> {
    const res = await axios.get("/user/product", {
      params: { productName },
    });
    return res.data;
  },

  // Delete Product by Product Name
  delete(productName: string): Promise<string> {
    return axios
      .delete(`/admin/product/delete`, {
        params: { productName },
      })
      .then((res) => res.data);
  },
};
