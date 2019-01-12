# activity-h5

这是一个推广h5和活动h5的项目,适合一些简单的h5 web

## 目录结构

```
├─ build # 存放webpack配置文件
|   ├─ build.js # 构建生产文件的入口
|   ├─ style.cfg.js # 处理css和sass的配置文件
|   ├─ util.js # webpack 自定义工具函数
|   ├─ webpack.common.js # webpack 公用基础配置
|   ├─ webpack.dev.conf.js # webpack 启动开发环境入口
|   ├─ webpack.page.conf.js # webpack 多页面配置文件
|   └─ webpack.pro.conf.js # webpack 生产文件构建配置
|
├─ config # webpack 配置文件
|   ├─ dev.env.js # 开发环境变量配置文件 (需要内嵌到web开发环境中的变量可以在这定义)
|   ├─ index.js # webpack 主要配置文件
|   └─ prod.env.js # webpack 生产环境变量配置文件
|
├─ dist # 存放生产环境文件
|
├─ mock-server # 前端mock data文件
|   ├─ index.js # mock server 路由文件
|   ├─ util.js # mock server 的工具函数
|   └─ producList.json # 模拟数据的json
|
├─ src # 项目源文件
|   ├─ common # 公用资源文件
|   |   ├─ img # 图片资源
|   |   ├─ layout # 公用模板
|   |   └─ styles # 公用样式
|   |
|   ├─ components # 公用组件
|   |   ├─ dialog # 对话框组件
|   |   └─ slider # 滚动栏组件
|   |
|   ├─ page # 各个页面入口文件
|   |   └─ [entry] # 每个entry代表一个页面(run start后将会自动生成为入口)
|   |       ├─ img # 图片资源文件
|   |       ├─ index.ejs # html入口文件
|   |       ├─ index.js # 入口js文件
|   |       └─ index.scss # 入口scss文件
|   |
|   ├─ util # web依赖工具函数
|   |
|   ├─ index.ejs # web的index.html入口
|   └─ main.js # web的index.html入口的js文件
|   
├─ .babelrc # babel 配置文件
├─ .mate.js # 开发者的配置项
├─ .gitignore # git 忽略文件配置
├─ .postcssrc.js # postcss 配置文件
└─  package.json # 项目信息配置文件
```

## 如何使用

- 安装项目依赖

```
npm install
```

- 启动

```
npm run start
```

- 提示一 :

选择`development`启动开发环境

选择`production`构建生产文件

``` bash
? 请选择构建项目类型 (Use arrow keys)
> development
  production
```

- 提示二:

选择相应`开发者的配置项`

``` bash
? 请选择配置项 (Use arrow keys)
> 张伟杰(test)
  测试环境(test)
  林峰(test)
  生产环境api
  生产环境api(test)

```

- 提示三(只有在构建生产文件的时候才需要选择):

输入`src/page/`下的目录名称,构建相应的生产文件

``` bash
? 请输入需要构建的文件名称 
```

## npm scripts

| 命令 | 功能 |
| ------------ | -------------- |
|  npm run start |  启动 |
