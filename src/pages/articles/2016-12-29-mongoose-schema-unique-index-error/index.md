---
title: mongoose schema unique index error
date: "2016-12-29"
layout: post
path: "/mongoose-schema-unique-index-error/"
categories:
  - NodeJS
  - MongoDB
  - Mongoose
  - 笨
---

在 express 中使用 mongoose 遇到的 unique key 设置无效的问题。

<!--more-->

------------------

#### 问题重现

```js
//定义一个schema
var UsersSchema = new Schema({
  username: { type: String, index: true, unique: true }, //为username字段设置unique key
  password: String,
  date: { type: Date, default: Date.now }
})
```
但是我们插入 2 个相同的`username` 的数据时能够成功插入。

#### 具体原因

参照 [github issue](https://github.com/Automattic/mongoose/issues/2232) 排查错误。

`mongoose`设置`schema`规则必须在插入数据之前，表中有数据时也不会生效。

因为`mongoose`会在`express`程序启动时根据`schema`内容设置表的索引信息，如果表不存在会自动新建。

最好的做法就是更改`schema`时，将`mongodb`中的相关表删除。更改之后重启服务器，更改就会生效。

> Written with [StackEdit](https://stackedit.io/).
