const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const path = require("path");
const baseConfig = {
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", "md", ".vue", ".json"],
    alias: {
      packages: path.join(__dirname, "../packages"),
      "lin-view-ui": path.join(__dirname, "../src/index.ts"),
      src: path.join(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        // 添加tsloader
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ],
        exclude: /node_modules/
        // options: {
        //   appendTsSuffixTo: [/\.vue$/],
        // }
      }
    ]
  },
  plugins: [new VueLoaderPlugin(), new ESLintPlugin(), new StylelintPlugin()]
};

module.exports = baseConfig;
