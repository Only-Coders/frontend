module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api": {
        //target: `https://api.onlycoders.tech/api`
        target: `http://190.135.20.252:9000/api`
      }
    }
  }
};
