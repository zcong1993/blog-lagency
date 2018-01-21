---
title: es7 async/await 处理异步
date: "2016-09-28"
layout: post
path: "/asyncawait-es7-processing-asynchronous/"
categories:
  - JavaScript
  - ES7
  - Async
  - 扯淡
---

> [范例源码地址](https://github.com/zcong1993/promise-generator-async)(比较混乱，抱歉)

> [GitBook排版更好](https://zcong.gitbooks.io/zc-webapp/content/asyncawait.html)

> 注意：`async/await`为`es7`新特性，目前几乎任何浏览器都不支持，就连最新版的`node`也不支持，所以请确保你在执行代码之前配置`babel-node`环境,下面说明。由于是es7正在起草的方案，我个人理解也不太到位，简单说一下用法。

<!--more-->

```sh

//全局安装babel-cli我们可以全局使用babel-cli和babel-node

//如果使用babel-node无效可以尝试添加系统变量

$npm install -g babel-node

//安装babel-es2017的库

$npm install --save-dev babel-preset-es2017

//babel-node的配置文件

$echo &#039;{ &quot;presets&quot;: [&quot;es2017&quot;] }&#039; &gt; .babelrc

```

---

### 认识async/await

> `async/await`是`es7`的异步解决方案。

特点是函数定义时，`function`前面加一个关键字`async`，此函数内部就可以在异步函数前面增加一个`await`关键字，就可以用类似同步的方式处理异步了,可直接使用`promise`对象。

一个简单的例子，还是`node`异步读取文件内容：

``` js
const fs = require('fs');

//定义一个新的Promise对象

var readFileAsync = function(file) {

 return new Promise(function(resolve, reject) {

     fs.readFile(file, (err, data) => {

     if (err) reject(err);

     resolve(data);

   });

 });

};

let file = './promise.js';

let file1 = './async.js';

let file2 = './error.js';

//声明时使用async关键字，正常try catch 就行

let readF = async function(file) {

 try {

     //异步处理加await关键字

     let data = await readFileAsync(file);

     console.log(data.toString());

 } catch (err) {

     console.log(err.message);

 }

};

//执行函数

readF(file1);

```

---

### 多异步处理方法

> 以`node`中`fetch`请求为例。

``` js

const fetch = require('node-fetch');

const url = 'https://api.github.com/users/zcong1993';

const url1 = 'https://api.github.com/users/zcong1993/following';

//自执行函数

(async function() {

//正常try catch处理

 try{

     //正常流程书写，异步加await关键字

     let res = await fetch(url)

     let data = await res.json()

     console.log(data)

 } catch(err){

     console.log('ERROR: ' + err.message)

 }

})();

```

---

### 并发处理异步

> 以`node`同时读取多个文件为例。

``` js

const fs = require('fs');

let file = './promise.js';

let file1 = './async.js';

//await 支持Promise.all并行执行多个异步操作

let readAllF = async function(files) {

 try {

     let data = await Promise.all(files);

     console.log(data.toString());

 } catch (err) {

     console.log(err.message);

 }

};

readAllF([readFileAsync(file), readFileAsync(file1)]);

```

可以看到，其实是直接借用`promise.all()`来实现。

---

看过`generator`那篇文章应该会发现`async/await`和`co`封装`generator`是非常像的，因为`co`确实就是将 generator 封装实现`async/await`的功能。
