---
title: wordpress 迁移和备份
date: "2016-11-18"
layout: post
path: "/wordpress-migrate-backup/"
categories:
  - PHP
  - WordPress
  - WordPress Plugin
  - Database
  - 备份
---

### 备份

通过插件备份，可以设置自动备份，支持很多云盘同步或邮件发送数据。
**注意：**此插件不会备份`wordpress根目录`的文件，这些文件需要手动定期备份。

<!--more-->

---

### 迁移

- 安装`UpdraftPlus`插件，备份数据库；
- 将站点`wordpress目录`下所有文件迁移至目标服务器；
- 在新站点建立一个空数据库供 wordpress 使用；
- 修改根目录下`wp-config.php`文件，修改配置文件中的数据库信息；
- 访问新站点的 wordpress，根据引导设置网站信息和管理员账号（仅为了暂时访问 wordpress 后台，可随意设置）；
- 进入后台，启用`UpdraftPlus`插件（建议不要操作其他插件），还原插件`Existing Backups`菜单中的数据库备份；
- 检查备份后站点与原站差异，必要时手动调整。

---

### 注意

- 应保证网站使用的 wordpress 外的`接口`也迁移至新站，避免 ajax 请求跨域问题；
- 迁移难免产生偏差，应该多对比新旧站，排查问题，手工设置没有同步的地方（首页小工具可能出现问题）；
- 建议不要更换域名，开发 wordpress 时以防之后可能更换域名，应当在所有使用本域链接的地方使用 wordpress 自身函数获得链接，**不要使用**固定 url 链接；
-  如果迁移前后域名不同，则需要在恢复数据库之前，手动替换数据库备份中的域名为新域名。某些页面接口的固定链接需要手动更改。








