---
title: github创建静态web预览页
date: "2016-07-26"
layout: post
path: "/github-create-gh-pages/"
categories:
  - 坑爹
  - 扯淡
---

<blockquote><h3 style="color:#abcdef;">github创建静态web预览页</h3><blockquote><ul><li><p>首先将静态页面打包，包括需要的所有html,js,css</p></li><li><p>接着将代码推送到github的<em> gh-pages </em> 分支：</p></li></ul><blockquote><p><code>git subtree push --prefix=<打包的目录> origin gh-pages</code></p></blockquote><ul><li>成功之后就可以在通过访问下面的url地址来预览了。</li></ul><blockquote><p><code>https://<用户名>.github.io/<项目名>/</code></p></blockquote></blockquote></blockquote>
