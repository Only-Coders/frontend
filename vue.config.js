module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api": {
        target: `http://main:9000` /* `http://mzunino.com.uy:9000` */
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "OnlyCoders";
      return args;
    });
  }
};
