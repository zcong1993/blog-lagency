---
title: 最近遇到的一些希望记录的东西
date: "2016-07-26"
layout: post
path: "/lists-some-tips-of-php/"
categories:
  - default
---

<blockquote>

<h3><span style="color: #abcdef;">记录一些坑爹的东西</span></h3>

</blockquote>
<ol><li><p>开发wordpress插件时，<strong>一定要加前缀</strong>，无论是方法还是变量，很容易和别的插件冲突，例如我两个插件hook的函数名一样，所以很悲剧，一个会报错；</p></li><li><p>github上面设置公钥私钥，仅对ssh有效https无效，人家写的很清楚了</p></li><li><p>我用个人电脑开发的东西放在github上面,然后在服务器上面用git检出，由于修改不在服务器上面进行，所以每次在服务器上pull的时候，会报错，说文件会被服务器上面的覆盖，然而我们肯定希望github上面的东西覆盖它，那样我们的更改才能够生效。下面是具体做法：</p><p>     <code>git stash</code>
      <code>git pull</code>
      <code>git stash pop</code></p></li></ol>




