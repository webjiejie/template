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

#### typescript、ts-loader、@types/各种插件 ts需要的
- webpack.config.js的 plugins 添加


### ts的增加需要的配置
- tsconfig.json、.eslintrc.js、webpack.config.js、src/shims-tsx.d.ts、src/shims-vue.d.ts

### 遇到的问题和解决办法
#### 1、css文件如何单独打包？
- 使用mini-css-extract-plugin插件即可

#### 2、图片、视频文件打包时如何单独放一个文件夹
- webpack.config.js中加
```javascript
module:{
    rules:[
        ...
        { //处理图片
            test: /\.(gif|jpg|jpeg|png|svg)$/i,
            use: [
            {
                loader: 'url-loader',
                options: {
                esModule:false, //防止地址变成[object Module]
                // 当文件大小小于 limit byte 时会把图片转换为 base64 编码的 dataurl，否则返回普通的图片
                limit: 1024*20, // 20k 以下转为 base64
                name: '[name]-[hash:7].[ext]', // 图片文件名称加上内容哈希
                outputPath:'assest/', //存储的位置
                }
            }
            ]
        },
        { //处理其他类型的文件
            test: /\.(docx|doc|woff|woff2|eot|ttf|otf|mov|mp4|webm|ogg|zip)$/i,
            use: [
            {
                loader: 'file-loader', // 将文件输出到指定目录，并返回公共路径的URL（适用于开发环境）
                options: { 
                esModule:false, //防止地址变成[object Module]
                name: '[name].[hash:7].[ext]',
                outputPath:'assest/', //存储的位置
                }, // 自定义输出文件名格式等参数
            }
            ]
        },
    ]
}
```

#### 3、js打包时单独放js文件夹
- webpack.config.js中加
```javascript
output:{
    filename: 'js/bundle-[hash].js' // 输出文件的名称加上 hash 值
}
```

#### 4、增加别名@
- webpack.config.js中加
```javascript
resolve: {
    alias: { //设置路径别名
      '@': path.resolve(__dirname, 'src'),
    },
},
```

#### 5、引入ts写法
- 需要安装一些包的@types/包名
- 在src/下增加shims-vue.d.ts
```javascript
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```
- 在src/下增加shims-tsx.d.ts
```javascript
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

```
- 在tsconfig.json加入
```javascript
{
    ...
    "moduleResolution": "node",
    "include": [
        "src/**/*.ts",
        "src/**/*.tsx",
        "src/**/*.vue",
    ],
}
```
- 页面中使同this.$router或者this.$store时ts会报错
解决方法一：
```javascript
import { defineComponent } from 'vue';
export default defineComponent({
name: 'home',
created(){
    let num:string = "1";
    console.log(num,this.$store.state)

},

methods:{
    jump(){
        this.$router.push("/login")
    }
}
})
```
解决方法二：
```javascript
(this as any).$store.state
(this as any).$router.push("/login")
```
