---
title: http request with CORS
date: "2016-09-08"
layout: post
path: "/http-request-with-cors/"
categories:
  - PHP
  - 笨
---

##### 简单说明一下我遇到的问题

由于是 php 后端，接触到最多的网络请求大概就是表单吧，还有就是 ajax 请求，有了 jquery 之后，封装的也比较好，所以对网络请求这块也没太多了解。

最近接触了一些前端的东西，请求也开始不简单了，表单的默认格式`application/x-www-form-urlencoded`和`multipart/form-data`已经不能满足需求了，才发现自己的服务器跨个域接受个`json`数据都会出好多问题。

网上搜了不少东西，才知道这就是传说中的`CORS`（跨域资源共享）。

<!--more-->

##### 2类CORS请求

我很直白的只说明两种请求在跨域请求时会遇到的问题，以及解决方法，详细原理请看阮一峰老师的[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html) 这篇博文。

- 简单请求

    条件如下:
```
（1) 请求方法是以下三种方法之一：
    HEAD
    GET
    POST
（2）HTTP的头信息不超出以下几种字段：
    Accept
    Accept-Language
    Content-Language
    Last-Event-ID
    Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
```

    简单请求，在ajax请求时，会自动添加一个Origin段，服务端在响应时一般会判断是不是在同一个域底下，如果跨域就会根据服务端允许的请求域（默认只允许本域）来进行响应。如果请求域名不在服务端允许的范围内，则会报错，也就是ajax跨域最常见的`No 'Access-Control-Allow-Origin' header is present on the requested resource.`也就是当前域名不在白名单，需要在服务端添加`header`，以php服务端为例：

```php
//api.php
header('Access-Control-Allow-Origin:*');
echo json_encode('api response!');
```
    *就是允许所有域名简单粗暴，可以改成你自己的域名，允许多域名在我之前的`从简单表单到ajax跨域问题`中看到。请求携带cookie的问题在那篇文章中也有介绍。

- 非简单请求

   非简单请求一般来说是对服务器有其他要求，比如请求方法是 PUT、DELETE 或 OPTION，或者 Content-Type 为 application/json。此种请求会在正式请求之前增加一次预请求，主要是检验服务端是否支持这些类型的请求。

   比如，我们发送一个 PUT 请求，预检时服务端会根据自身的`Access-Control-Allow-Methods`的参数判断是否接受请求，假如我们服务端没写 header，那么此请求就会失败，因为服务端不接受此种类型请求，我们可以如下操作，以 php 为例：
   ```php
   //api.php
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT');
    echo json_encode('api response!');
   ```
   允许这些类型的请求。

   我对这些特殊的需求暂时没需求，我之前想向服务器 post 一个 json 类型的数据，老出错。虽然已经在 post 阶段增加了 headers 中增加了 Content-Type:application/json;charset=utf8 的设置，服务端此时应该允许用户 header 中设置 Content-Type 属性，所以做如下操作，以 php 为例：
   ```php
   //api.php
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT');
    header('Access-Control-Allow-Headers: Content-Type');
    echo json_encode('api response!');
   ```
   如果你想在 header 中添加自己的属性，也需要将名称放在`Access-Control-Allow-Headers`中，这样就解决了 json 数据的发送问题。

##### php的一些问题

上面的问题其实还没有结束，由于笔者用的是普通的`$_POST`接收 post 过来的数据，如果你使用的话你也会发现只会收到空值。这是因为`$_POST`只能读取`application/x-www-form-urlencoded`数据，`$_FILES`只能读取`multipart/form-data`类型数据，所以还是比较坑爹的。于是用`file_get_contents(‘php://input’);`接收就好了，由于传输是以 json 方式，所以接收到的直接就是 json 了，于是终于解决了这个问题。
