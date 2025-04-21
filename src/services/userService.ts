import axios from "@/plugins/axios";
import { User } from "@/models/user";

const userService = {
  getAll(): Promise<User[]> {
    return axios.get("/admin/users");
  },
  update(user: User): Promise<string> {
    return axios.post("/user", user);
  },
  delete(username: string): Promise<string> {
    return axios.delete(`/user?username=${username}`);
  },
};

export default userService;
