# edge-ext

Edge 浏览器插件开发学习项目

popup.html 基于 Vue3.js

注入的元素基于 React.js

## 安装

需要提前安装`nodejs`和`yarn`

`npm i -g yarn`

```shell
git clone https://github.com/appjson/edge-ext.git

cd edge-ext

yarn install

cd page-plugin

yarn install
```

## 构建

默认使用 production 模式。因为 chrome 不允许 eval，但是 webpack 的 development 模式会采用 eval

```shell
cd page-plugin

yarn build
```

在 page-plugin/build/static/css 与 page-plugin/build/static/js 中找到生成的 css 和 js 文件。

拷贝到 src/assets 下，并改名为 `content.css` 和 `react.js`

```shell
yarn build --mode production
```

`dist`目录即为生成后可导入 edge 的插件目录

## 使用的开源项目

- [Vue3.js](https://github.com/vuejs/core)
- [React.js](https://github.com/facebook/react)
- [Naive UI](https://github.com/TuSimple/naive-ui)
- [Ant Design](https://github.com/ant-design/ant-design)
- [live2d](https://github.com/stevenjoezhang/live2d-widget)
- [live2d model](https://github.com/ezshine/live2d-model-collections)
