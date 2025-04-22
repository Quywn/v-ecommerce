import axiosInstance from "@/plugins/axios";
import { Category } from "@/models/category";

const categoryService = {
  // Get all categories
  async getAll(): Promise<Category[]> {
    const res = await axiosInstance.get("/user/categories");
    return res.data;
  },

  // Add category
  async create(category: Category): Promise<Category> {
    const res = await axiosInstance.post("/admin/category", category);
    return res.data;
  },

  // Delete category
  async delete(categoryName: string): Promise<void> {
    await axiosInstance.delete("/admin/category", {
      params: { categoryName },
    });
  },
};

export default categoryService;
