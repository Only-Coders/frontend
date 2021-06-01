module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api": {
        target: `https://api.onlycoders.tech`
      }
    }
  }
};
