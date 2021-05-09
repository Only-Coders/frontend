module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api": {
        target: `https://api.onlycoders.tech`
      }
    }
  }
};
