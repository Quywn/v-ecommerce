import axiosInstance from "@/plugins/axios";
import { Category } from "@/models/category";

const categoryService = {
  // Lấy tất cả danh mục
  async getAll(): Promise<Category[]> {
    const res = await axiosInstance.get("/user/categories");
    return res.data;
  },

  // Thêm danh mục
  async create(category: Category): Promise<Category> {
    const res = await axiosInstance.post("/admin/category", category);
    return res.data;
  },

  // Lấy một danh mục
  async getOne(categoryName: string): Promise<Category> {
    const res = await axiosInstance.get("/user/category", {
      params: { categoryName },
    });
    return res.data;
  },

  // Xoá danh mục
  async delete(categoryName: string): Promise<void> {
    await axiosInstance.delete("/admin/category", {
      params: { categoryName },
    });
  },
};

export default categoryService;
