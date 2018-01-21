---
title: Apache 并发限制
date: "2016-08-05"
layout: post
path: "/apache-muilts-1/"
categories:
  - Server
  - Apache2
---

一般的个人服务器性能都不是很高，并发高一点就很难应付，而且在黑客攻击面前显得十分脆弱。单 IP 并发限制和流量限制会有效防止并发高时服务器内存被耗尽甚至拉死的情况，也使得单 IP 攻击不是那么有效。

<!--more-->

- Apache 的配置：

    Apache 以前几乎所有的配置全在 `httpd.conf` 里面，尽管有人配置 `virtual host` 将配置文件 include 进去，但是整个文件还是非常臃肿，难以维护。

    几年前改变过一次，变成比较科学的模块化配置。入口文件也变成了 `apache2.conf`，核心的配置文件夹主要有 4 个：`sites-available` 、 `sites-enable` 、`mods-available` 、 `mods-enable` 。比较科学的配置方法是在 `*-available` 新建自己的配置文件，然后在 `*-enable` 中增加一个指向配置文件的软连接，这样做主要是不想启用某个配置文件时删除对应的软连接即可，`apache2.conf` 会 include `*-enable` 中的所有配置文件，这样配置更改维护起来就会方便很多。

    然而，现在百度到的关于 Apache 的配置基本都是一篇文章粘来粘去，还停留在描述`httpd.conf`配置，对新手极不友好，因为这个文件已经不存在了，我想吐槽一下，还是 Google 比较专业。

- `limitipconn`限制单 IP 并发

- `mod_bw`限制单 IP 流量
