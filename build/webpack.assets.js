const path = require("path");

const fs = require("fs");

const { merge } = require("webpack-merge");

const resolve = (dir) => path.resolve(__dirname, "../src", dir);

const baseConfig = require("./webpack.base");

const util = require('./util')

const getAssetsEntries = (pathStr) => {
  let files = fs.readdirSync(resolve(pathStr));
  const assetsEntries = files.reduce((ret, item) => {
    const itemPath = path.join(pathStr, item);
    const myPath = resolve(`${itemPath}`);
    const stat = fs.lstatSync(myPath);
    if (stat.isFile()) {
      if(item.endsWith('.ts')){
        item = item.replace(/\.ts$/,'.js')
      }
      ret[`${pathStr}/${item}`] = myPath;
    } else {
      const result = getAssetsEntries(`${pathStr}/${item}`);
      ret = {
        ...ret,
        ...result,
      };
    }
    return ret;
  }, {});
  return assetsEntries;
};

const entry = {
  ...getAssetsEntries("js"),
  ...getAssetsEntries("locale"),
  ...getAssetsEntries("mixins"),
  ...getAssetsEntries("utils"),
};

const assetsConfig = {
  mode: "production",
  entry: entry,
  output: {
    path: path.resolve(__dirname, "../lib"),
    filename: `assets/[name]`,
    libraryTarget: "umd",
    libraryExport: "commonjs2",
    // libraryTarget: "commonjs2",
    // libraryExport: "default",
    library: "[name]",
  },
  externals: {
    ...util.getExternalsList(),
  },
};

module.exports = merge(baseConfig, assetsConfig);
