const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/colorsadmin/',
  devServer: {
    https: false,
    public: 'localhost:80',
    host: '0.0.0.0',
    port: 80,
  },
  transpileDependencies: true,
})
