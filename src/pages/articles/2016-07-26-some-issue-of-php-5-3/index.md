---
title: php5.3
date: "2016-07-26"
layout: post
path: "/some-issue-of-php-5-3/"
categories:
  - PHP
  - 扯淡
  - Version
---

### php5.3中坑爹的[]数组

> *   首先php5.3根本就不支持[]数组，声明都会报错：
>
> > `<?php   $arr = [1,2,4]; ?>``Parse error: syntax error, unexpected '[' in ... code on line 3`*   其次是函数返回值为数组时不能直接链式调用，若要使用必须将返回值赋值给变量，然后使用[]
>
> > <?php
> >      $arr = [1,2,4];
> >      function retarr(){
> >       return array(1,2,4);
> >      }
> >      echo retarr()[1];
> >     ?>> 上述代码在php5.3中依旧会报错。*   记得之前还遇到过php5.3不支持 ` bcmath ` 库,查官方文档看到是4.04版本就有的东西，总之很诡异。。。
>
> 最后，个人感想是赶紧升级5.5+保平安吧！！
