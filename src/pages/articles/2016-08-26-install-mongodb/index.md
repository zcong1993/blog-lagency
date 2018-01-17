---
title: 安装使用mongodb
date: "2016-08-26"
layout: post
path: "/install-mongodb/"
categories:
  - default
---

#### 一款非常实用的 **nosql** 数据库。

[mongodb](https://www.mongodb.com/)具体介绍可以去官方网站了解，这里就不过多介绍了。

***

#### 安装mongodb

##### 1.windows系统

windows版提供`.msi`文件，所以安装是傻瓜式安装。去官网[下载](https://www.mongodb.com/download-center?jmp=docs)符合自己系统的版本，然后双击打开，像安装别的软件一样安装就可以了。

这时候mongodb就安装在你的电脑了，进入mongodb文件夹，默认应该在`C:\Program Files`中，我把它移动到了D盘。此时我们就可以在本地建一个mongodb数据库服务了。我的目录是`D:\MongoDB`。

首先，在你认为合适的位置建一个文件夹

```sh
D:\DATA
├─cfg
├─db
└─log
 ```
 
 db目录用来存放数据，cfg目录存放启动相关配置文件，log目录存放运行日志文件。接着在cfg文件夹创建一个`mongo.cfg`配置文件：
 
 ```sh
 #cfg/mongo.cfg
 systemLog:
    destination: file
    path: d:\data\log\mongod_zc.log    #log文件地址，要对应文件而不是目录，文件不存在会自动生成
 storage:
    dbPath: d:\data\db                 #存放数据的路径
 ```
接着就可以开启数据库服务了：

```sh
 D:\MongoDB\bin\mongod.exe --config D:\DATA\cfg\mongo.cfg
```
这样数据库服务就启动了，windows不适合做服务器，所以也不建议将mongodb服务作为后台守护进程使用，所以我们终端不能关闭。这时候log文件夹下面就会生成log文件，打开文件可以看到，我们的服务已经在27017（默认）端口等待连接了。接着测试一下连接吧，打开另一个终端：

```sh
 D:\MongoDB\bin\mongo.exe
```
出现和mysql数据库相同的`>`标识就说明成功了。

为了使用方便也可以将bin目录加入环境变量，这样可以在任何地让运行`mongo.exe`连接数据库，`.exe`省略掉也是可以的。

还可以为数据库启动写一个脚本:`mongoserver.bat`
```sh
@Echo Off

mongod.exe --config D:\DATA\cfg\mongo.cfg

pause
```
双击打开就可以启动数据库服务了。

##### 2.ubuntu系统  

linux系统可以选择去github上面下载软件源码自行编译安装，我试了，很遗憾因为依赖问题放弃了。最终还是选择了官方的镜像源安装。

以[ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)安装为例，我用的是`ubuntu 16.04`版本。

首先，获取官方的key
```sh
$sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```
然后，增加一个mongodb的镜像源地址
```sh
$echo &quot;deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse&quot; | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```
更新镜像源，安装mongodb
```sh
$sudo apt-get update
$sudo apt-get install -y mongodb-org
```

安装之后，服务执行文件被放置在`/usr/bin`下，配置文件为`/etc/mongod.conf`，可以修改配置文件然后执行`$/usr/bin/mongod --quiet --config /etc/mongod.conf`启动服务，也可以创建系统服务(仅16.04可用，来自官方说明),创建文件`/lib/systemd/system/mongod.service`:
```sh
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target
Documentation=https://docs.mongodb.org/manual

[Service]
User=mongodb
Group=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
```
然后可以通过`$sudo service [start|stop|restart]`命令来启动服务了。

***

#### 初步使用测试mongodb

连接数据库，选择`test`数据库，并插入一条数据：
```sh
&gt; use test                              #选择数据库
&gt; db.test.insert({name: &#039;zc&#039;})          #往test数据表中插入一条数据
&gt; db.test.find()                        #查询test数据表的所有结果
```
简单说明一下，mongodb中数据库和表不用提前建立，`use 数据库`的时候直接建立，并切换至数据库，`show dbs`可以查询所有数据库，在数据库下面`show collections`可以查看数据集（相当于数据表，个人理解）。

具体操作请查看官方文档。 
