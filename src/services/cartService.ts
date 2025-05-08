import axios from "@/plugins/axios";
import { Product } from "@/models/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDTO {
  cartId: number;
  username: string;
  status: string;
  orderedProducts: CartItem[];
}

export default {
  // Lấy giỏ hàng của user
  getCartByUser(): Promise<CartDTO> {
    return axios
      .get("/user/cart")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        throw error;
      });
  },

  // Thêm sản phẩm vào giỏ hàng
  addProductToCart(product: Product): Promise<string> {
    return axios
      .post("/user/cart", product)
      .then((res) => res.data)
      .catch((err) => {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", err);
        throw err;
      });
  },

  // Xóa 1 sản phẩm khỏi giỏ hàng
  removeProductFromCart(
    productName: string,
    username: string
  ): Promise<string> {
    return axios
      .delete("/user/cart/product", {
        params: {
          productName,
          username,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Lỗi khi xoá sản phẩm khỏi giỏ hàng:", error);
        throw error;
      });
  },

  // Xóa toàn bộ giỏ hàng của user
  clearCartByUsername(username: string): Promise<CartDTO> {
    return axios
      .delete("/user/cart/clear", {
        params: { username },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Lỗi khi xoá toàn bộ giỏ hàng:", error);
        throw error;
      });
  },
};
