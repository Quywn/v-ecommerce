import axios from "@/plugins/axios";
import { User } from "@/models/user";

const API_URL = "/user";

class UserService {
  // Get All Users
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get("/admin/users");
      return response.data; // return List<UserDTO>
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error; // todo handle
    }
  }

  // Get Profile
  async getProfile(username: string): Promise<User> {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        params: { username },
      });
      return response.data; // return UserDTO
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error; // todo handle
    }
  }

  // Update User
  async updateUser(user: User): Promise<User> {
    try {
      const response = await axios.post(API_URL, user);
      return response.data; // return newUser
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // todo handle
    }
  }

  // Delete User
  async deleteUser(username: string): Promise<void> {
    try {
      await axios.delete(API_URL, {
        params: { username },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error; // todo handle
    }
  }

  // Get User's Ordered History
  async getUserHistory(username: string): Promise<any[]> {
    try {
      const response = await axios.get(`${API_URL}/history`, {
        params: { username },
      });
      return response.data; // return Order's history
    } catch (error) {
      console.error("Error fetching user history:", error);
      throw error;
    }
  }
}

export default new UserService();
