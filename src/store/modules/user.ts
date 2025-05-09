import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { User } from "@/models/user";
import UserService from "@/services/userService";

@Module({ namespaced: true })
export default class UserModule extends VuexModule {
  user: User | null = null;

  @Mutation
  setUser(user: User) {
    this.user = user;
  }

  @Mutation
  clearUser() {
    this.user = null;
  }

  @Action
  async fetchUserProfile(username: string) {
    try {
      const profile = await UserService.getProfile(username);
      this.context.commit("setUser", profile);
    } catch (error) {
      console.error("Error fetching user profile in Vuex:", error);
    }
  }

  @Action
  async updateUser(user: User) {
    try {
      const updatedUser = await UserService.updateUser(user);
      this.context.commit("setUser", updatedUser);
    } catch (error) {
      console.error("Error updating user in Vuex:", error);
    }
  }

  @Action
  async deleteUser(username: string) {
    try {
      await UserService.deleteUser(username);
      this.context.commit("clearUser");
    } catch (error) {
      console.error("Error deleting user in Vuex:", error);
    }
  }

  get profile(): User | null {
    return this.user;
  }
}
