---
title: ES6 与你并不遥远 1
date: "2016-11-02"
layout: post
path: "/es6-and-you-are-not-far-away-1/"
categories:
  - JavaScript
  - ES6
---

---

> 本文主要参考阮一峰老师的《[ECMAScript 6入门](http://es6.ruanyifeng.com/)》一书，此书写得相当精彩，可以当一本很不错的参考书。我主要是列出一些我自己用到或者感觉比较省时省力的一些新特性。

<!--more-->

---

#### 轻松的字符串拼接``

字符串拼接在 js 中是让人头大的问题，和 html 标签混在一起，拼接起来需要注意变量两边的边界标点，还要注意 html 中的单双引号转义问题，经常会发生错乱，也导致很难维护。我们以前需要这样：

``` js
var user = {

 name: 'zc',

 age: 18

};

var str = '';

str += '<div><p>name: ' + user.name + '</p>';

str += '<p>age: ' + user.age + '</p>';

str +='<p>...</p></div>';

```

这样代码难看，而且很难维护，比如需要在中间插入一段 html，也需要插入数据，非常容易出错。

es6 引入了模板字符串，用（`）反引号标识边界，上面代码可以写成这样：

``` js
var user = {

 name: 'zc',

 age: 18

};

//${var}这就是插入js变量的方式

var str = `

 <div>

 <p> name: ${ user.name }</p>

 <p> age: ${ user.age }</p>

 <p>...</p>

 </div>

`;

```

如此一来，代码结构清晰了许多，后期维护很方便，随便删改，而且也不用担心引号嵌套问题，数据引入也非常方便不用引入繁琐的引号加号了。

---

#### 变量声明let和const

js 中是没有常量的，尽管大家用`var CONST = 1`使常量定义语义化更明显，然而这个量本质上还是变量；`var`的作用域有点宽广，是函数级别的。所以 es6 引入了 2 个新的声明方式`let`和`const`分别是块级变量和常量。

```js
var i = 2

if( i === 2){

let d = 3

}

console.log(d)

// d is not defined

```

``` js
const PI = 3.14

PI = 3.141

//Assignment to constant variable

```

使用这两个变量声明能够使我们的代码更加谨慎。

---

#### 变量解构赋值

对于对象或者数组，我们有时需要将它们的某些部分赋值给不同的变量，这时我们往往会这样写：

```js
var obj = { name: 'zcong', age: 18}

var name = obj.name

var age = obj.age

console.log(name, age)

//zcong 18

```

而在 es6 中我们可以这么写：

``` js
let obj = { name: 'zcong', age: 18}

let { name, age } = obj

console.log(name, age)

// zcong 18

```

这点在引入外部库的不同模块时时经常用到。

```js
import { part1, part2} from 'lib'

```

---
