---
title: 安装wordpress的几点建议
date: "2016-08-02"
layout: post
path: "/tips-for-wordpress-install/"
categories:
  - Wordpress
  - Tips
---


1. **数据库**：

	- 首先要在数据库中建一个数据库例如*wordpress*，否则安装时会报错，因为数据库不存在所以没法在里面建表；
	- 接着是权限问题，安装时会提示无法在config中写入配置，可以手动写入，也可以设置权限755；
	- 如果哪天数据库密码改了，wordpress提示数据库连接错误，在 wp-config.php 中将密码改成现有密码就行；

<!--more-->

2. **更新插件主题提示FTP连接失败**

	- 在 WordPress 目录下找到 wp-config.php 文件并编辑，在最后一行加上`define('FS_METHOD', "direct")`可解决此问题；

3. **优化**

	- 由于某种原因，[Gavatar](https://cn.gravatar.com/)这个网站在国内无法访问，而wordpress头像依托于此，所以会发现页面加载很慢，主要就是一直请求不到头像。用`WP User Avatar`插件可以解决;
	- wordpress默认禁止邮件发送，安装`Easy WP SMTP`,设置之后wordpress便可以使用邮件功能了;
	- 安装缓存插件进行缓存，可以随便试试，我用的是`WP Super Cache`;
	- 安装主题让你的站点更加漂亮;

4. **个人感觉比较不错的插件**

	- 数据库备份插件 `WordPress Database Backup` ,可以将数据库备份为sql文件，支持定时任务，也可以将文件自动发送至你的邮箱;
	- `WordPress Backup to Dropbox`这款插件可以将你的wordpress整个目录备份至 [Dropbox](https://www.dropbox.com/home) ,你需要申请一个账号，这个主要用来备份插件，和上面那个配合使用，整个wordpress就会保存下来。可以只保存`wp-content`目录和`wp-config.php`文件，别的都是wordpress的核心文件，没必要保存。用时先安装wordpress然后用备份的覆盖就行。
