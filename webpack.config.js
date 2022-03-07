const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
   });

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    publicPath: "/",
  },
  devServer: {
    server: 'http',
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9090,
    proxy: {
      // '/api': "http://localhost:9000",
      '/swagger': "http://localhost:9000", 
      '/api': {
        target: "http://localhost:9000",
        secure: false
      } 
    },
    historyApiFallback: true
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [htmlPlugin]
}