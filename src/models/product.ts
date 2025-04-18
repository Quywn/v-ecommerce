import { Category } from "./category";

export interface Product {
  productCode?: string;
  productName: string;
  price: number;
  category: Category;
  quantityStock: number;
  quantityOrdered: number;
  imageUrl: string;
}
