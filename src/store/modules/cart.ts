import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import cartService from "@/services/cartService";
import { CartDTO } from "@/models/cartDTO";
import { CartItem } from "@/models/cartItem";
import { Product } from "@/models/product";

@Module({ namespaced: true })
export default class CartModule extends VuexModule {
  cart: CartDTO | null = null;

  get items(): CartItem[] {
    return this.cart?.orderedProducts || [];
  }

  get total(): number {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  @Mutation
  setCart(cart: CartDTO) {
    this.cart = cart;
  }

  @Mutation
  clearCart() {
    this.cart = null;
  }

  @Action
  async fetchCart() {
    const cart = await cartService.getCartByUser();
    this.context.commit("setCart", cart);
  }

  @Action
  async addOneProductToCart(product: Product) {
    const updatedProduct = {
      ...product,
      quantityOrdered: (product.quantityOrdered || 0) + 1,
    };
    await cartService.addProductToCart(updatedProduct);
    await this.context.dispatch("fetchCart");
  }

  @Action
  async updateProductQuantity(payload: {
    productCode: string;
    username: string;
    quantity: number;
  }) {
    // Gọi API
    await cartService.updateProductQuantity(
      payload.productCode,
      payload.username,
      payload.quantity
    );

    const cart = await cartService.getCartByUser();
    this.context.commit("setCart", cart);
  }

  @Action
  async removeProductFromCart(payload: {
    username: string;
    productName: string;
  }) {
    await cartService.removeProductFromCart(
      payload.productName,
      payload.username
    );
    await this.context.dispatch("fetchCart", payload.username);
  }

  @Action
  async clearCartByUsername(username: string) {
    await cartService.clearCartByUsername(username);
    this.context.commit("clearCart");
  }
}
