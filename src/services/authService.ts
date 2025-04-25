import axios from "axios";
export const authService = {
  async login(username: string, password: string): Promise<string> {
    const response = await axios.post("/auth/login", {
      username,
      password,
    });
    return response.data.token;
  },
};
