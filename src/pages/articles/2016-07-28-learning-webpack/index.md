---
title: learning webpack
date: "2016-07-28"
layout: post
path: "/learning-webpack/"
categories:
  - default
---

<h3>webpack</h3>

<blockquote><ul><li>替代 browserify </li></ul><blockquote><p><code>browserify ./main.js &gt; bundle.js</code> =&gt;  </p><pre><code>   module.exports = {
        entry: './main.js',
        output: {
        filename: 'bundle.js'
        }
     };  </code></pre><p> 运行 <code>webpack</code> 可以将<code>main.js</code> 编译为 <code>bundle.js</code> 和 browserify 一样，运行<code>webpack-dev-server</code>启动微博server时会默认先编译 js 文件。</p></blockquote></blockquote>
