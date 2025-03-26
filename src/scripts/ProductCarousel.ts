import Vue from "vue";

import { Product } from "@/models/Product";

export default Vue.extend({
  name: "ProductCarousel",
  props: {
    products: {
      type: Array as () => Product[],
      required: true,
    },
  },
  computed: {
    groupedProducts(): Product[][] {
      const grouped: Product[][] = [];
      for (let i = 0; i < this.products.length; i += 4) {
        grouped.push(this.products.slice(i, i + 4));
      }
      return grouped;
    },
  },
});
