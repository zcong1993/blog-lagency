---
title: redis配置
date: "2016-08-08"
layout: post
path: "/redis/"
categories:
  - PHP
  - Redis
---

#### ubuntu 系统

>ubuntu 系统安装软件比较方便，直接使用 ` apt-get `

```sh
$apt-get install redis-tools    #客户端
$apt-get install redis-server   #服务端
```
安装的版本应该是2.8左右，redis最新的稳定版本是`3.2.3`。

<!--more-->

>安装最新版本：

    $ wget http://download.redis.io/releases/redis-3.2.3.tar.gz
    $ tar xzf redis-3.2.3.tar.gz
    $ cd redis-3.2.3
    $ make
    #这样就安装成功了,建议再做以下处理
    $ cd redis-3.2.3
    $ cp ./src/redis-* /usr/bin/   #将服务文件放置在 /usr/bin
    $ cp redis.conf /etc/redis/    #将配置文件放置在 /etc/

**注:**我是先安装低版本然后安装高版本的，所以我不知道/usr/bin中的东西有没有自动覆盖，所以手动覆盖了一次。

#### centos 系统

>安装最新版本：

    $ wget http://download.redis.io/releases/redis-3.2.3.tar.gz
    $ tar xzf redis-3.2.3.tar.gz
    $ cd redis-3.2.3
    $ make

脚本会自动在`/usr/bin`中生成`redis`目录，包含`bin`(核心文件)和`etc`(配置文件)，还会在`/etc/init.d/`中生成`redis`的脚本，此时直接用`service redis start|stop|restart`对redis服务端进行操作了，理论上可以全局使用`redis-cli`启动客户端了。

#### 安装`php-redis`驱动

- ubuntu系统

    `apt-get install php7.0-redis`

    `service apache2 restart`

    `就是这么简单`

**注：**如果此方法安装不了，可以尝试下面的方法。

- centos系统

    `wget -c https://github.com/phpredis/phpredis/archive/php7.zip`

    ` unzip php7.zip&&cd phpredis-php7`

    `/usr/bin/phpize7.0` #根据你的系统或者PHP版本会有差别，我这个目录是ubuntu上面的,如果没有此文件先安装`php7.0-dev`

    `./configure --with-php-config=/usr/local/php/bin/php-config`

    `service php-fpm restart`

我的centos用的是nginx加php-fpm，所以用`service php-fpm restart`重启服务。

- 此时在`phpinfo`中就能看到redis了。

#### 简单测试`php-redis`

>测试程序redis-test.php

    <?php
        $redis = new Redis();
        $redis->connect('127.0.0.1',6379);
        $redis->set('redis','redis-test');
        echo $redis->get('redis');
    ?>

`php redis-test.php`可以看到redis-test。或者`redis-cli`输入`get redis`可以看到结果。就说明没问题了。



