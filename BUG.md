## 使用 html-loader 会和 webpack-html-loader 冲突

如果需要引入html则对需要引入的模板文件单独处理

``` javascript
import tpl from './test.html!html-loader';
```

## 关于多页面开发模式构建缓慢的问题

html-webpack-plugin，最新版本会有构建速度上的问题，回退版本到3.0.7

``` bash
cnpm i html-webpack-plugin@3.0.7 --save-dev
```