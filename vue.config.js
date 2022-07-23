const { defineConfig } = require("@vue/cli-service");
const CopyWebpack = require("copy-webpack-plugin");
const path = require("path");

const copy = [
  {
    from: path.resolve("src/manifest.json"),
    to: `${path.resolve("dist")}/manifest.json`,
  },
  {
    from: path.resolve("src/assets"),
    to: path.resolve("dist/assets"),
  },
];

const plugins = [
  new CopyWebpack({
    patterns: copy,
  }),
];

const pages = {};
const ChromePages = ["popup"];

ChromePages.forEach((name) => {
  pages[name] = {
    entry: `src/${name}/main.js`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`,
  };
});

exports.defineConfig = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  pages,
  productionSourceMap: false,
  configureWebpack: {
    mode: "development", // 发布的时候删除
    entry: {
      background: "./src/background/main.js",
    },
    output: {
      filename: "js/[name].js",
    },
    plugins,
  },
  css: {
    extract: {
      filename: "css/[name].css",
    },
  },
  chainWebpack: (config) => {
    config.output.filename("js/[name].js").end();
    config.output.chunkFilename("js/[name].js").end();
  },
};
