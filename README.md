# webpack-hot-update

webpack-hot-update
----

* 安装依赖

"raw-loader": "^0.5.1",
"webpack-dev-server": "^3.1.3"

* webpack.config.js中配置 devServer

devServer:{
  host : '127.0.0.1',
  port: 8080,
  open: true, //自动打开窗口
  inline: true, //使用那种刷新的方法
  hot: true,  //是否开启热更新
  // devServer: {  
  //   contentBase: './dist'  //服务默认的根目录
  // },
},
`开启热更新可能会提示 hotModule错误`

在webpack.config.js中添加可以解决
plugins: [
  new webpack.HotModuleReplacementPlugin(),
],

`注意： 使用dev-server在html中需要修改引入js的文件路径`

* html自动刷新需要在js中引入

if (process.env.NODE_ENV === 'development') {
  require('./index.html')
};

* webpack配置

"webpack": "^4.6.0",
"webpack-cli": "^2.0.15",


* es6 配置

"babel-core": "^6.26.0",
"babel-loader": "^7.1.4",
"babel-plugin-transform-runtime": "^6.23.0",
"babel-preset-env": "^1.6.1",
"babel-runtime": "^6.26.0",


vue
------
