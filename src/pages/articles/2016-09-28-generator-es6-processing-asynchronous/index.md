---
title: es6 generator 处理异步
date: "2016-09-28"
layout: post
path: "/generator-es6-processing-asynchronous/"
categories:
  - JavaScript
  - Generator
  - Async
  - 扯淡
---

> [范例源码地址](https://github.com/zcong1993/promise-generator-async)(比较混乱，抱歉)

> [GitBook排版更好](https://zcong.gitbooks.io/zc-webapp/content/generator.html)

> 注意：如果你的`node版本`低于`0.11.x`，你需要自行引入`generator库`；如果你的`node版本`低于`v4.x.x`，你需要在运行时加入`--harmony`参数；高版本可直接使用。

<!--more-->

---

### 认识generator

> `Generator`函数是`ES6`提供的一种异步编程解决方案。`Generator`函数有多种理解角度。

>从语法上，首先可以把它理解成，`Generator`函数是一个状态机，封装了多个内部状态。
执行`Generator`函数会返回一个遍历器对象，也就是说，`Generator`函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历`Generator`函数内部的每一个状态。

> 形式上，`Generator`函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`语句，定义不同的内部状态（`yield`语句在英语里的意思就是“产出”）。

`generator`函数有多个状态，每一个`yield`语句对应一个状态，也可以有一个最终返回的`return`状态。

`generator`函数在调用时，不是直接执行，而是返回一个指向内部状态的指针对象。每次调用`generator`的`next()`方法，就会使得指针向下移动一个状态，相当于每次调用`next()`方法，只执行一个`yield`语句，然后函数状态保留，停留在那里，再次调用`next()`方法时，从上一个状态继续执行。可以理解为`yield`执行完函数会暂停，`next()`会让函数继续。

**以上内容引用或参考了阮一峰老师写的[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/generator)中的`Generator 函数`这一章。**

我们写一个简单的例子：

``` js

//定义一个generator函数

function* testGenerator(){

 //yield定义中间态

 yield 'first'

 yield 'second'

 yield 'third'

 //最终返回

 return 'last'

}

let tg = testGenerator()

//调用next()方法

console.log(tg.next())

console.log(tg.next())

console.log(tg.next())

console.log(tg.next())

```

注意，generator 函数定义时 function 和函数名之间需要加一个*

``` js

$ node generator.js

//按照yield顺序输出，没有执行return时done都是false

{ value: 'first', done: false }

{ value: 'second', done: false }

{ value: 'third', done: false }

//执行到return，done变为true

{ value: 'last', done: true }

//执行结束后调用，value编程undefined

{ value: undefined, done: true }

```

---

### 可以遍历的generator

> 上面说的`generator`函数，返回的是一个内部的只针对象，并且它是可遍历的，利用这个特性我们简化处理好多函数。

1. 简单的例子:

```js

//对上面的js最后增加一个for of遍历器

for(var item of testGenerator()){

    console.log(item)

}

//结果

first

second

third

```

可以看到，`generator`确实是可遍历的，不过`return`的值不被包含在内。

2. 菲波那切数列

``` js

function* fb(number) {

 let [pre, next] = [0,1]

 while (number-- > 0) {

     [pre, next] = [next, pre + next]

     yield next

     }

}

//通过遍历输出10个数

for(let i of fb(10)){

 console.log(i)

}

//运行结果

$ node generator.js

1

2

3

5

8

13

21

34

55

89

```

3.遍历嵌套对象

``` js

function* arr(data) {

   for (let i of data) {

     if (Array.isArray(i)) {

         yield * arr(i)

     } else {

         yield i

     }

 }

}

for (let j of arr([1, 2, ['a', 'b', 'c'], 3, 4, [1, 2, 3]])) {

     console.log(j);

}

//运行结果

$ node generator.js

1 2 a b c 3 4 1 2 3

```

还有好多范例，这里不再一一叙述。

---

### 原生的generator函数处理异步

> `generator`函数的强大不光体现在上面，在处理异步方面更加大放光彩，虽然`promise`已经实现链式调用，但是依然显得稍许臃肿，大家可以对比一下`generator`和`promise`的异同。

依然以`nodejs`中的异步读文件为例：

``` js

const fs = require('fs')

//定义一个异步读文件函数

function readFileAsync(file){

 fs.readFile(file, (err, data) => {

     //如果有错误使用throw抛出错误

     if(err) it.throw(err);

     //将结果传递下去

     it.next(data)

 })

}

```

`generator`实例化的对象可以有用`next(data)`将结果传递下去，也可以用`throw`抛出异常。`it`是我们定义的实例化的`generator`对象。

``` js

//定义generator函数

function* main(){

 //可以正常try catch

 try{

    //使用yield可以将异步操作使用类似于同步的方式，将next中传的data传下去

     var data = yield readFileAsync('./generator.js')

     console.log(data.toString())

 } catch(e){

     //如果it.throw(err)抛出异常，我们可以在这里捕获到

     console.log(e.message)

 }

}

//实例化并使用

var it = main()

it.next();

```

是不是感觉比`promise`简单多了，下面继续看看与`promise`的对比。

---

### 与promise对比

> 如果说`promise`将回调恶魔金字塔变为链式调用，而`generator`则是更进一步的将其变为类似同步的更为简便的方式。

``` js

//promise

step1(arg).then((res1) => {

 return step2(res1)

}).then((res2) => {

 return step3(res2)

}).then((res3) => {

 return step4(res3)

})

```

``` js

//generator

function* steps(arg){

 let res1 = yield step1(arg)

 let res2 = yield step2(res1)

 let res3 = yield step3(res2)

 return res4(res3)

}

let st = steps(arg)

st.next()

st.next()

st.next()

st.next()

```

可以看出，2 者相比，`generator`更加清晰明了简洁。不过，`generator`有个缺点就是`yield`不能直接使用`promise`对象，必须自己定义，那么好多强大的`promise`库例如`bluebird`就派不上用场，例如上篇说到的`fetch`也就不能直接使用了。

---

### 终极解决方案，配合co使用

> [co](https://github.com/tj/co)是tj大神写的解决`generator`不能直接`yield`处理`promise`对象这个问题。`co`封装的`generator`函数使得函数更加优雅简单，甚至连调用函数执行都不需要，会自动实例化并执行。而且`chrome`和`Firefox`浏览器(新版本)均已支持`co`。

1. 基本使用方法,`co`使用起来很简单，仅需要将你的`generator`函数包在`co()`中即可：

``` js

//引入co

const co = require('co');

//通过co封装函数

co(function*() {

 //yield后面可直接跟promise对象

 let a = yield Promise.resolve(1)

 let b = yield Promise.resolve(a + 1)

 let c = yield Promise.resolve(b + 1)

 //也可以用reject抛出异常

 // let d = yield Promise.reject(new Error('boom'))

 console.log(a, b, c)

}).catch((err) => {

 console.log(err.message)

});

//运行结果(正常)

$ node gen-test.js

1 2 3

//异常

$ node gen-test.js

ERROR: boom

```

`co`也支持正常的`try catch`捕获异常。

2. `co`处理`promise`数组和对象

``` js

'use strict';

//引入co和fs

const co = require('co');

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

//co支持正常try catch

co(function*() {

 try {

     let data = yield readFileAsync(file2);

     console.log(data.toString());

    } catch (err) {

         console.log(err.message);

    }

});

//并发处理读2个文件

co(function*() {

 let promises = [

     readFileAsync(file),

     readFileAsync(file1)

 ];

 let res = yield promises;

 let data = res.toString();

 console.log(data);

}).catch((err) => {

     console.log(err.message);

});

```

阅读源码可以发现，如果`yield`后面跟的是`数组(或对象)`时，`co`会将数组或对象遍历，然后处理每个`promise`，最后用`Promise.all()`返回。

3. `co`结合`fetch`使用

``` js

'use strict';

//引入node-fetch和co

const fetch = require('node-fetch');

const co = require('co');

//我们fetch请求的url

const url = 'https://api.github.com/users/zcong1993';

const url1 = 'https://api.github.com/users/zcong1993/following';

//使用fetch请求

co(function* (){

 //fetch返回的仍是一个promise对象

 let res = yield fetch(url);

 //使用json()将结果转换为json格式

 let data = yield res.json();

 console.log(data);

});

```

可以发现，确实比`promise`简洁很多，而且可直接使用`fetch`。

``` js

co(function* (){

 let pros = [

     (yield fetch(url)).json(),

     (yield fetch(url1)).json()

 ];

 let data = yield pros;

 console.log(data);

});

```

同时获取 2 个`url`数据。(注意：此写法不太人性化，如果有多个链式异步处理函数，此写法将会嵌套好多层。但是如果用循环的方式书写，则不是真正的并发异步，这一点在介绍完`async/await`之后我会单独说明。)
