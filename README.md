# activity-h5

这是一个推广h5和活动h5的项目,适合一些简单的h5应用

## 项目架构

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
├─ lib # 需要在webpack中读取到的运行环境依赖脚本
|   └─ inline-script # 内嵌到html的js配置文件
|       ├─ index.js # 配置文件入口
|       └─ flexible.js # 移动端适配js文件
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
├─ .gitignore # git 忽略文件配置
├─ .postcssrc.js # postcss 配置文件
└─  package.json # 项目信息配置文件
```

## 如何使用

- 安装项目依赖

```
npm install
```

- 启动开发环境

```
npm run start
```

## npm scripts

| 命令 | 功能 |
| ------------ | -------------- |
|  npm run start |  开启开发环境 |
|  npm run build |  生成生产环境文件,存放在dist目录中 |
|  npm run build:test |  生成构建测试环境文件,存放在dist目录中 |
|  npm run profile |  生成构建后生产环境文件的分析图,可以用来性能分析 |