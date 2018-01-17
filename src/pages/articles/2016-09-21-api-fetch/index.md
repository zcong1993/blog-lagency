---
title: fetch api & http request
date: "2016-09-21"
layout: post
path: "/api-fetch/"
categories:
  - JavaScript
  - Fetch
  - Http
---

---

## 浏览器中的fetch

* fetch 开启一个获取源资源的进程

  上面这句话便是[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch)对fetch的定义，简单精炼，就和它的功能一样，简单而强大。**\(注意：目前仅有chrome,firefox,opera的最新浏览器中支持\)**

<!--more-->

  首先我们需要看一个简单的例子：

  ```js
    var myImage = document.querySelector('.my-image');

    fetch('flowers.jpg').then(function(response) {

      return response.blob();

    }).then(function(response) {

      var objectURL = URL.createObjectURL(response);

      myImage.src = objectURL;

    });

  ```

  这段代码做的就是简单的异步加载本地图片，如果在chrome中运行，就会发现图片的请求时一个`fetch`类型。根据上面的代码我想你已经看出了我们的`fetch()`返回的是一个`promise`对象\(promise对象这里不做介绍\)，而且`response.blob()`也是一个`promise`对象。这一点是你我都值得庆幸的事情，因为`promise`让异步回调变得优美了不少\(虽然还有很多不足\)。

* 自定义请求参数

  `fetch()`函数可以接受2个参数，请看下面例子:

  ```js
     var myHeaders = new Headers()

     var myInit = {

         method: 'GET',       //请求方式

         headers: myHeaders,  //请求头

         mode: 'cors',        //是否跨域

         cache: 'default'     //缓存设置

     }

     fetch('http://api.github.com/users/zcong1993', myInit)

     .then((res) => res.json())

     .then((json) => {

     console.log(json)

     })

  ```

  有意思的是`fetch()`接受的参数和`request`对象的属性一样，所以你也可以这样:

  ```js
    let myHeaders = new Headers()

     let myInit = {

     method: 'GET',

     headers: myHeaders,

     mode: 'cors',

     cache: 'default'

     }

     let myRequest = new Request('http://api.github.com/users/zcong1993', myInit)

     fetch(myRequest)

     .then((res) => res.json())

     .then((json) => {

        console.log(json)

     })

  ```

  结果不会有任何区别的。

* 发一个post请求



    进行post请求也就是将第二个字段的`method`改为`POST`，然后增加`body`字段传输数据，有些情况需要在`headers`中增加一些字段。

    ``` js
    let myHeadersP = new Headers({

     'Content-Type': 'application/json'

     })

    //也可以这样定义headers

    // let myHeadersP = new Headers()

    // myHeadersP.append('Content-Type', 'application/json')

     let myInit1 = {

         method: 'POST',

         headers: myHeadersP,

         mode: 'cors',

         cache: 'default',

         body: JSON.stringify({name: 'zcong1993'})

     }

     fetch('http://zcong.win/api/ajax.php', myInit1)

     .then((res) => res.json())

     .then((json) => {

         console.log(json)

      })

     .catch((err) => {

            console.log(err.message)

      })

    ```

* 检测请求是否成功

    `fetch`由于是一个`promise`对象，它也定义了失败的`reject`的返回，所以我们可以在链式调用的最后`catch`到异常；如果上一步没问题，`resolve`回来的`response`对象中有一个`response.ok`属性，再次判断此属性是否为真，才能完全判断请求的状态。最终上面的例子可以这么完善：

    ``` js
     let myHeadersP = new Headers({

         'Content-Type': 'application/json'

     })

     let myInit1 = {

         method: 'POST',

         headers: myHeadersP,

         mode: 'cors',

         cache: 'default',

         body: JSON.stringify({name: 'zcong1993'})

        }

     fetch('http://zcong.win/api/ajax.php', myInit1)

     .then((res) => {

        if(res.ok){

            res.json().then((json) => {

                console.log(json)

            })

        }else{

            console.log('Fetch failed!')

        }

    })

     .catch((err) => {

         console.log(err.message)

     })

 ```


## node.js中的fetch

* nodejs 自己没有`fetch`，我们通过引入[node-fetch](https://github.com/bitinn/node-fetch)或者[isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)便可以使用。由于都是基于`promise`所以基本用法是一样的，这里我们稍微提一下它与`generator`(我们使用tj大神的[co](https://github.com/tj/co))结合使用，回调能够简单一些。运行下面例子，请先将安装需要的东西：

``` bash
# isomorphic-fetch和node-fetch选择一个就行

npm install co node-fetch isomorphic-fetch

```

``` js
const fetch = require('isomorphic-fetch');

const co = require('co');

co(function* (){

 let res = yield fetch('http://zcong.win/api/ajax.php', {

    method: 'POST',

    body: JSON.stringify({name: 'testtt'})

})

 let json = yield res.json()

 console.log(json)

}).catch((err) => {

 console.log(`ERROR: ${err.message}`)

})

```

如果需要定义`headers`，也可以作为第二个对象参数的属性传入。

---

走在浏览器最前面的`chrome`和`firefox`均已支持`fetch`，而且跨平台开发非常火热的`react-native`也是用`fetch`请求数据。如果你不熟悉`promise`，你可以把上面的几种请求方式当做固定用法；懂的人不用说也知道`fetch`也算一个普通的`promise`对象，所以我们可以用`es6`的`generator`或者`es7`的`async/await`包装它，结果是一样的，只是让你的代码更加优美易读，让回调更加便捷，之后我会详细说说`promise`,`generator`和`async/await`。


