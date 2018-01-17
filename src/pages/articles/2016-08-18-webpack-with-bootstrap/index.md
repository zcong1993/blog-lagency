---
title: webpack with bootstrap
date: "2016-08-18"
layout: post
path: "/webpack-with-bootstrap/"
categories:
  - default
---

代码github地址：[https://github.com/zcong1993/webpack-bootstrap-demo](https://github.com/zcong1993/webpack-bootstrap-demo)

页面预览地址: [https://zcong1993.github.io/webpack-bootstrap-demo/](https://zcong1993.github.io/webpack-bootstrap-demo/)

*** 

### 简单说明

[webpack](https://webpack.github.io/)这个强大的工具大家肯定不陌生吧，相信之前喜欢[browserify](http://browserify.org/) 、[grunt](http://gruntjs.com/) 、[gulp](http://gulpjs.com/)之类工具的同学会更熟悉webpack。最近刚试了试webpack，觉得很不错，但是上手难度有点大。

node强大的npm工具使得使用js库变得非常容易，可以使用`$npm install ***`轻松得到，然而当一个项目引入很多js文件时，引入变得比较困难。这时候你需要browserify，在你的入口文件main.js中直接可以用`require('node_module')`来引入，处理好一切之后 `$browserify ./main.js > bundle.js`,browserify便会将你需要的所有js文件编译到bundle.js中了，所以html文件中仅需要引入bundle.js就可以了，这样就省去好多麻烦的路径问题。

而webpack则在此基础上显得更加强大，它有一系列的loader，例如 babel-loader,style-loader,css-loader,url-loader,file-loader等等。此时css文件的引入方式可以是和引入js文件一样，在入口文件main.js中`require(./***.css)`，不过你必须在`webpack.config.js`中引入css-loader。

希望深入了解，你可以去看看官网文档，我也是刚刚了解。

使用webpack时，经常会想到懒人非常喜欢的东西[bootstrap](http://www.bootcss.com/),当然想用的人很多，所以就有人写了专门的`bootstrap loader`如[bootstrao-webpack](https://www.npmjs.com/package/bootstrap-webpack),[bootstrap-loader](https://www.npmjs.com/package/bootstrap-loader)。然而，我使用了两款都没有成功，应该是我的配置不对，所以就自己弄一个简陋的bootstrap-loader。

***

### 配置过程

* 加载css文件
  
  首先需要安装webpack和webpack-dev-server
  ```sh
  $npm install --save-dev webpack webpack-dev-server
  ```
  我们需要bootstrap，style-loader，css-loader
  ```sh
  $npm install --save-dev bootstrap style-loader css-loader
  ```
  接着配置入口文件
  ```js
  //main.js
  require('bootstrap/dist/css/bootstrap.css')
  //npm安装的bootstrap和普通node模块一样，会在node_modules，所以引入时require('bootstrap')就是这个路径，我们需要的是dist里面的css文件
  ```
  配置webpack
  ```js
  //webpack.config.js
  const path = require('path')
  module.exports = {
    entry: './main.js',            //入口文件路径
    output: {                       //文件输出路径和名称
        path: './app',
        filename: 'bundle.js'
    },
    module: {                       //模块
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },  //css-loader
        ]
    }
}
  ```
  编译
  ```sh
  $webpack
  ```
  问题出现了，会提示无法解析字体文件，因为bootstrap.css文件中引入了字体，webpack无法解析，所以会报错。接着就要增加字体文件的loader。

* 加载字体文件

  需要url-loader和file-loader
  ```sh
  $npm install --save-dev url-loader file-loader
  ```
  配置webpack
  ```js
   //webpack.config.js
  const path = require('path')
  module.exports = {
    entry: './main.js',            //入口文件路径
    output: {                       //文件输出路径和名称
        path: './app',
        filename: 'bundle.js'
    },
    module: {                       //模块
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },  //css-loader
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" }, //分别匹配4中文件分别用url-loder和file-loader解析
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
        ]
    }
}
  ```
  编译
  ```sh
  $webpack
  ```
  此时会发现，`app`目录多了6个文件，其中4个文件就是引入字体文件，文件名通过hash处理了，还有一个就是我们的输出文件`bundle.js`，我们做一个简单的测试页面(放在app目录下)。
  ```html
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
<div class="container">
<h2 class="text-center">bootstrap with webpack!</h2>
    <div class="text-center">
            <!-- Standard button -->
            <button type="button" class="btn btn-default">Default</button>

            <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
            <button type="button" class="btn btn-primary">Primary</button>

            <!-- Indicates a successful or positive action -->
            <button type="button" class="btn btn-success">Success</button>

            <!-- Contextual button for informational alert messages -->
            <button type="button" class="btn btn-info">Info</button>

            <!-- Indicates caution should be taken with this action -->
            <button type="button" class="btn btn-warning">Warning</button>

            <!-- Indicates a dangerous or potentially negative action -->
            <button type="button" class="btn btn-danger">Danger</button>

            <!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
            <button type="button" class="btn btn-link">Link</button>
    </div>
</div>
<script src="bundle.js"></script>
</body>
</html>
  ```
  可以看到我们仅引入了`bundle.js`文件，`css`根本就没有，运行dev测试：
  ```sh
  $webpack-dev-server 
  ```
  此时可以看到，bootstrap样式已经被引入了。
  
* 加载js文件

  bootstrap还有自己的一些js文件处理交互事件，如果需要的话，引入js。
  ```js
  //main.js
  require('bootstrap/dist/css/bootstrap.css')
  require('bootstrap')
  ```
  编译
  ```sh
  $webpack
  $webpack-dev-server
  ```
  出现新问题,jQuery没有定义，bootstrap依赖的jquery没有，所以我们要处理jquery依赖问题。
  
* 处理jquery依赖

  引入jquery
  ```sh
  $npm install --save-dev jquery@2.2.4      #引入jquery2.2.4版本，bootstrap3不支持3.0以上的jquery，直接npm jquery时3.1.0版本
  ```
  ```js
  //main.js
  require('bootstrap/dist/css/bootstrap.css')
  $ = jQuery = require('jquery')
  require('bootstrap')
  ```
  用最粗暴的方式将jquery放入全局了，所以依赖问题就解决了。这样肯定有隐患，不过我现在还没有更好的有效的解决方法。
  测试
  ```sh
  $webpack
  $webpack-dev-server
  ```
  可以看到css样式正常，js也不会报错了。
  
* 打包

  其实我们这个连脚手架都不算，所以没必要打包，可以打包看看离线效果。
  ```sh
  $webpack -p 
  ```
  然后app目录就是整个web程序了，直接访问app/index.html就能看到相同的效果了。

