# vue-template

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 插件说明 (部分插件有版本要求，不然会报错)
#### style-loader 、 css-loader 处理css
- webpack.config.js的 module.rules 需要加
#### MiniCssExtractPlugin将css单独打包在一个文件夹中
- webpack.config.js需要配置

#### file-loader 、 url-loader 处理文件图片
- webpack.config.js的 module.rules 需要加

#### html-webpack-plugin @types/html-webpack-plugin 打包时生成index.html
- webpack.config.js的 plugins 添加

#### cross-env 启动命令上设置环境变量
-  package.json上的 scripts使用
#### dotenv 引入.env文件的配置
- webpack.config.js的 plugins 添加

#### babel-plugin-syntax-dynamic-import 路由使用import动态加载组件用的
- webpack.config.js的 module.rules 的.js添加options:{plugins:['syntax-dynamic-import']}

#### postcss-loader 、 autoprefixer 自动添加 css 浏览器前缀
- postcss.config.js使用
- webpack.config.js 的css需要配置

#### node-sass 、 sass-loader 处理sass
- webpack.config.js的 module.rules 需要加

#### babel-core babel-loader babel-preset-env 转译 es6 代码为 es5 代码
- .babelrc使用
- webpack.config.js的 module.rules 需要加

#### clean-webpack-plugin 自动清除输出文件夹
- webpack.config.js的 plugins 添加

#### webpack-dev-server 启动本地服务
-  package.json上的 scripts使用