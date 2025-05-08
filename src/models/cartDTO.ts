import { CartItem } from "../models/cartItem";
export interface CartDTO {
  cartId: number;
  username: string;
  status: string;
  orderedProducts: CartItem[];
}
