const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
});
module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      css: {},
    },
  },
};
