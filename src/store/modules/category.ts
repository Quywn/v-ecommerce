import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios from "@/plugins/axios";
import { Category } from "@/models/category";

@Module({ namespaced: true, name: "category" })
export default class CategoryModule extends VuexModule {
  categories: Category[] = [];

  // ----- MUTATIONS -----
  @Mutation
  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Mutation
  addCategory(category: Category) {
    this.categories.push(category);
  }

  @Mutation
  removeCategory(categoryName: string) {
    this.categories = this.categories.filter(
      (c) => c.categoryName !== categoryName
    );
  }

  // ----- ACTIONS -----
  @Action({ commit: "setCategories" })
  async fetchCategories() {
    const res = await axios.get("/user/categories");
    return res.data;
  }

  @Action
  async createCategory(category: Category) {
    const res = await axios.post("/admin/category", category);
    this.context.commit("addCategory", res.data);
  }

  @Action
  async deleteCategory(categoryName: string) {
    await axios.delete("/admin/category", {
      params: { categoryName },
    });
    this.context.commit("removeCategory", categoryName);
  }
}
