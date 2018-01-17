---
title: real async of es6/es7
date: "2016-10-09"
layout: post
path: "/async-of-es6es7-real/"
categories:
  - JavaScript
  - ES7
  - Async
  - 扯淡
---

> [范例源码地址](https://github.com/zcong1993/promise-generator-async)(比较混乱，抱歉)

> 在之前几篇文章中，我们了解了不同规范下对异步的处理。现在我们思考一下为什么要异步。最容易想到的首先是，能够避免js执行时能够更加高效，不会被一些无用等待时间束缚(例如：请求资源文件);另一种就是请求多个资源时的并发请求，毕竟同步在单线程中是没有并发的。

<!--more-->

> es6的generator(co)和es7的async/await其实没有多大区别(都是基于Promise.all()方法)，所以我们就用co来做示范。

---

### 普通情况的简单并发

``` js

const co = require('co')

const fs = require('fs')

//创建readFileAsync

var readFileAsync = function(file) {

 console.log(`-----------${file}-------------`);

 return new Promise(function(resolve, reject) {

     fs.readFile(file, (err, data) => {

     if (err) reject(err);

         resolve(data);

     });

 });

};

//批量读取文件列表

const files = [

 readFileAsync('1.txt'),

 readFileAsync('2.txt'),

 readFileAsync('3.txt')

]

//读取单个文件

co(function* () {

 let data = yield readFileAsync('./simple.js')

 console.log(data.toString())

})

//批量并发读取

co(function* () {

 let data = yield Promise.all(files)

 console.log(data.toString())

})

```

可以得到以下结果，可以看到同时执行了3次readFileAsync函数，最终结果都返回的时候一起返回结果。

``` js

$ node simple.js

-----------1.txt-------------

-----------2.txt-------------

-----------3.txt-------------

111,222,333

```

如果用for循环的话就会是不同的结果：

``` js

co(function* () {

 let files = ['1.txt', '2.txt', '3.txt']

 for(file of files){

     let data = yield readFileAsync(file)

     console.log(data.toString())

 }

})

```

可以看到并不是并发。

``` js

$ node simple.js

-----------1.txt-------------

111

-----------2.txt-------------

222

-----------3.txt-------------

333

```

比较容易分析出，虽然readFileAsync是promise，执行时不会等待，但是下面的打印data值和上面yield是同步的，也就是data需要等待异步处理的结果，从而使得下一个异步不能同时进入for循环，导致和同步显示没什么区别，这样我们所做的工作对性能的提高也会是非常有限的。

---

### real async(例：通过豆瓣api得到10部电影的海报并保存)

我们需要下面两个步骤:

1. 通过电影名字得到电影海报的url;

2. 通过fetch得到海报并保存到可写流再存至本地

``` js

const co = require('co')

const fetch = require('node-fetch')

const fs = require('fs')

//获取poster url

var getPoster = function (movieName){

 console.log(`正在获取${movieName}的url`)

 let url = `https://api.douban.com/v2/movie/search?q=${encodeURI(movieName)}`;

 return new Promise(function(resolve,reject){

     fetch(url)

     .then((res) => res.json())

     .then((json) => {

     let imgUrl = json.subjects[0].images.large

     resolve(imgUrl)

     }).catch((err) => {

         reject(err)

     })

 })

}

//得到海报并保存

var savePoster = function (movieName, imgUrl){

 console.log(`正在保存${movieName}的海报`)

 let dest = fs.createWriteStream(`${movieName}.jpg`)

 return new Promise(function(resolve,reject){

     fetch(imgUrl)

     .then((res) => {

     res.body.pipe(dest)

     resolve(`${movieName} 已保存!`)

     }).catch((err) => {

     reject(err)

     })

 })

}

//电影名称

let movieNames = ['低俗小说','阿甘正传','天空之城','蝙蝠侠','哈利波特','我是传奇','黑客帝国','你的名字','釜山行','这个杀手不太冷','千与千寻','搏击俱乐部','霸王别姬'];

//简单的保存一个流程

co(function* (){

 let url = yield getPoster(movieNames[0])

 let data = yield savePoster(movieNames[0], url)

})

```

for循环方式&#039;同时&#039;保存10个海报

``` js

co(function* (){

 for(movieName of movieNames){

 let res = yield getPoster(movieName)

 console.log(res)

 let img = yield savePoster(movieName, res)

 console.log(img)

 }

})

```

可以看到和上面例子一样，其实是同步的，这样我们努力这么多的异步处理性能其实没有优化多少。

``` js

$ node isAsync.js

正在获取低俗小说的url

正在获取低俗小说的url

https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p1910902213.jpg

正在保存低俗小说的海报

低俗小说 已保存!

正在获取阿甘正传的url

https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p510876377.jpg

正在保存阿甘正传的海报

阿甘正传 已保存!

正在获取天空之城的url

正在保存低俗小说的海报

https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p1446261379.jpg

正在保存天空之城的海报

天空之城 已保存!

正在获取蝙蝠侠的url

https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2316834186.jpg

正在保存蝙蝠侠的海报

蝙蝠侠 已保存!

正在获取哈利波特的url

https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p804947166.jpg

正在保存哈利波特的海报

哈利波特 已保存!

正在获取我是传奇的url

https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p1137834245.jpg

正在保存我是传奇的海报

我是传奇 已保存!

正在获取黑客帝国的url

https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p1910908765.jpg

正在保存黑客帝国的海报

黑客帝国 已保存!

正在获取你的名字的url

https://img3.doubanio.com/f/shire/21e771816d14ede9a77a01b6c7874c4b05dd05e2/pics/movie-de

正在保存你的名字的海报

你的名字 已保存!

正在获取釜山行的url

https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2360940399.jpg

正在保存釜山行的海报

釜山行 已保存!

正在获取这个杀手不太冷的url

https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p511118051.jpg

正在保存这个杀手不太冷的海报

这个杀手不太冷 已保存!

正在获取千与千寻的url

https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p1910830216.jpg

正在保存千与千寻的海报

千与千寻 已保存!

正在获取搏击俱乐部的url

https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p1910926158.jpg

正在保存搏击俱乐部的海报

搏击俱乐部 已保存!

正在获取霸王别姬的url

https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p1910813120.jpg

正在保存霸王别姬的海报

霸王别姬 已保存!

```

---

#### 真正的异步处理方式

&gt; 原理其实非常简单，有几个异步就用几个Promise.all()方法，始终保持并发是用Promise.all()执行的即可，代码如下：

``` js

co(function* (){

  //构造第一个Promise.all(),Array.from为es6特性，效果是对数组每个元素做操作然后返回数组

 let urls = yield Promise.all(Array.from(movieNames, movieName => getPoster(movieName)))

 let pros = []

 let i=0

 // 构造第二个Promise.all()，由于我们想要保存图片为电影名称，所以需要将名称作为第一个参数传进去

 for(var url of urls){

     pros.push(savePoster(movieNames[i++] + '_all', url))

 }

 //执行第二个Promise.all()

 let img = yield Promise.all(pros)

     console.log(img)

})

```

结果如下：

``` js

$ node isAsync.js

正在获取低俗小说的url

正在获取阿甘正传的url

正在获取天空之城的url

正在获取蝙蝠侠的url

正在获取哈利波特的url

正在获取我是传奇的url

正在获取黑客帝国的url

正在获取你的名字的url

正在获取釜山行的url

正在获取这个杀手不太冷的url

正在获取千与千寻的url

正在获取搏击俱乐部的url

正在获取霸王别姬的url

正在保存低俗小说_all的海报

正在保存阿甘正传_all的海报

正在保存天空之城_all的海报

正在保存蝙蝠侠_all的海报

正在保存哈利波特_all的海报

正在保存我是传奇_all的海报

正在保存黑客帝国_all的海报

正在保存你的名字_all的海报

正在保存釜山行_all的海报

正在保存这个杀手不太冷_all的海报

正在保存千与千寻_all的海报

正在保存搏击俱乐部_all的海报

正在保存霸王别姬_all的海报

[ '低俗小说_all 已保存!',

 '阿甘正传_all 已保存!',

 '天空之城_all 已保存!',

 '蝙蝠侠_all 已保存!',

 '哈利波特_all 已保存!',

 '我是传奇_all 已保存!',

 '黑客帝国_all 已保存!',

 '你的名字_all 已保存!',

 '釜山行_all 已保存!',

 '这个杀手不太冷_all 已保存!',

 '千与千寻_all 已保存!',

 '搏击俱乐部_all 已保存!',

 '霸王别姬_all 已保存!' ]

```

PS：这个例子实在nodejs中文社区看到一位前辈的async/await代码抓取豆瓣电影海报，当时我就觉得他应该不是真正的'同时',以至于我花了几天的时间的学习尝试，最终确定他的方法不是并发，我在几年后替他解决了这个问题。

---

可以看到所有图片是在一瞬间同时得到，所以我们的异步就实现了，性能上明显是比上面的方式更快，我们可以将两种方式放在一个js中执行，可以很负责任地告诉你，第二种绝对比第一种快，而且快很多。至此，对于异步的探讨也就告一段落了。


