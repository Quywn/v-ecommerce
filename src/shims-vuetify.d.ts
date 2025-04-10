import { DefineComponent } from "vue";

declare module "vuetify/lib/framework" {
  import Vuetify from "vuetify";
  export default Vuetify;
}

// // src/shims-vue.d.ts
// declare module "*.vue" {
//   import { DefineComponent } from "vue";
//   const component: DefineComponent<unknown, unknown, any>;
//   export default component;
// }
