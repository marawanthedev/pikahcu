const webpack = require("webpack");
const ReactRefreshWebPackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// todo
// if react refresh fails refer to docs

module.exports = {
  mode: "development",
  // this could be passed on script or at devServer
  devServer: { hot: true, open: true },
  devtool: "cheap-module-source-map",
  plugins: [new ReactRefreshWebPackPlugin()],
};
