---
title: install node-sass on windows
date: "2016-12-29"
layout: post
path: "/install-node-sass-on-windows/"
categories:
  - GFW
  - NodeJS
  - Node-sass
  - NPM
---

使用`npm`这么久，最烦人的两个包就是`phantom.js`和`node-sass`，原因大家都知道，这两个文件在强大的防火墙威力下，`cnpm`和`yarn` 都没有办法，甚至逼迫好多人放弃`sass`使用`less`。

<!--more-->

-------------

### 主要原因

安装`node-sass`时需要一个适配系统的二进制包[xxx_binding.node](https://github.com/sass/node-sass/releases)，这个包足以触发`npm`的timeout，使得安装失败。

### 解决方法

手动下载`node-sass`二进制文件，并在`npm`安装时设置`SASS_BINARY_PATH`路径为本地文件路径。
```sh
# window设置路径
$ set SASS_BINARY_PATH=path/to/your/xxx_binding.node
```

每次使用前都要设置，可以写成脚本。
```sh
# sassnp.bat
@set SASS_BINARY_PATH=path/to/your/xxx_binding.node
```
保存成`sassnp.bat`（sass-node-path），最好将目录配置到环境变量中，所以以后需要的时候直接输入
```sh
$ sassnp
```
就能配置好了。

> Written with [StackEdit](https://stackedit.io/).
