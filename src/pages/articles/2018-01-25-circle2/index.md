---
title: circleci 系列2 - compose
date: "2018-01-25 18:39:08"
layout: post
path: "/circle2/"
categories:
  - Circleci
  - CI
  - 经验
---

> [上一章](/circleci-start/) 描述了一个最简单的例子, 然而后端项目往往依赖数据库(虽然基本上测试都建议用 `sqlite`), 本文简单描述一下多镜像测试, 以 `mysql` 为例.

<!--more-->

### 定义 images

首先, 当然是需要声明我们测试需要的镜像:

```yaml
#...
  docker:
    - image: circleci/node:8.9.4
    - image: circleci/mysql:latest
        #定义 mysql 镜像启动环境变量
        environment:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_USER: root
          MYSQL_DATABASE: circle_test
```

定义多个镜像相当于使用 `docker-compose` 启动

### 定义测试环境变量

```yaml
#...
      - run:
          name: run test
          environment:
            MYSQL_DB_URL: "mysql://root:root@/circle_test?charset=utf8&parseTime=True&loc=Local"
          command: yarn test
```

我们的程序基本这样写:
```js
const mysql = require('mysql2')

setTimeout(() => process.exit(0), 3000)
mysql.createConnection(process.env.MYSQL_DB_URL)
```
测试也就是简单执行一下这个文件, 看看能否连接 `mysql`.

### 还有什么问题?

上面两个步骤看似完美, 但是事情往往没有这么简单.

`circleci` 多镜像是`异步同时加载`的, 最上面的镜像作为执行底下命令的容器, 也就是最上面的镜像准备好了, 就会执行下面的命令, 那么很容易出现, 执行命令时 `mysql` 镜像还没有准备好, 所以直接会连接错误.

因此, 我们必须要在执行测试之前等 `mysql` 镜像 ready.

```yaml
#...
  - run:
      name: Waiting for Mysql to be ready
      command: |
        for i in `seq 1 50`;
        do
          nc -z localhost 3306 && echo Success && exit 0
          echo -n .
          sleep 1
        done
        echo Failed waiting for Mysql && exit 1
# run test
```

很清楚, 我们做了一个循环, `3306` 端口可用时继续, 尝试 50 次失败 abort.

*注意:* 我们用的镜像是 `circleci/mysql:latest` 镜像, 所以使用官方 mysql 镜像可能会出现 `nc` 工具找不到的现象.

总之, 这一设计虽然省时间, 但是我还是感觉是她自己没设计好, 等待另一个容器 ready 是件很麻烦的事情, 而且使得配置变得繁琐.

例子请看 [https://github.com/zcong1993/circleci-samples/tree/master/demos/compose](https://github.com/zcong1993/circleci-samples/tree/master/demos/compose)
