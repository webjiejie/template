const path = require('path') // 系统路径模块
const htmlWebpackPlugin = require('html-webpack-plugin') // 引入模板渲染插件
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin") // 清除输出文件夹
const dotenv = require('dotenv');
const webpack = require('webpack');
const fs = require("fs");

//当前所在环境
const mode = process.env.NODE_ENV || 'development';

// 根据环境获取.env的文件配置
function getEnvConfig() {
  return dotenv.parse(fs.readFileSync(`./.env.${mode}`));
}
const envConfig = getEnvConfig();

module.exports = {
  mode:process.env.NODE_ENV, //当前环境
  entry: path.join(__dirname, './src/main.ts'), // 项目总入口 js 文件
  // 输出文件
  output: {
    publicPath:envConfig.VUE_APP_BASE_MYROUTER+'/',
    path: path.join(__dirname, 'dist'), // 所有的文件都输出到 dist 目录下
    filename: 'js/bundle-[hash].js' // 输出文件的名称加上 hash 值
  },
  // optimization: { //打包时这个会让一些文件分成多个文件
  //   splitChunks: { // 使用 SplitChunksPlugin 分离代码
  //     chunks: 'all', // 对所有类型的 chunks 进行拆分
  //   },
  // },
  module: {
    rules: [{
        // 使用 vue-loader 解析 .vue 文件
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        // 要加上 style-loader 才能正确解析 .vue 文件里的 <style> 标签内容
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // 处理顺序是从 sass-loader 到 style-loader
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
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
      { // 处理ts
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        // 转译 es6 代码为 es5 代码
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // 不处理这两个文件夹里的内容
        loader: 'babel-loader',
        options:{
          plugins:['syntax-dynamic-import']
        },
      }
    ]
  },
  resolve: {
    alias: { //设置路径别名
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.vue', '.ts'] // 自动解析文件后缀
  },
  plugins: [
    //将css打包到指定的css/下
    new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }),

    new webpack.DefinePlugin({ //环境变量
      'process.env': JSON.stringify(envConfig),
    }),
    new htmlWebpackPlugin({
      filename: 'index.html', // 生成的文件名称
      template: './public/index.html', // 指定用 index.html 做模版
      inject: 'body' // 指定插入的 <script> 标签在 body 底部
    }),
    new VueLoaderPlugin(),
    ...(mode === 'production'?[new CleanWebpackPlugin()]:[]) //打包时自动清除
  ],
  devServer: {
    port: 9000, // 指定端口号
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    historyApiFallback: {
      index: envConfig.VUE_APP_BASE_MYROUTER+'/index.html' 
      //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    }
  }
}