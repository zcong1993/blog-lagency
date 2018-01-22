---
title: Git入门教程5-版本回退
date: "2017-01-10"
layout: post
path: "/git-reset/"
categories:
  - Git
  - Github
  - 总结
  - 入门
---

## 版本回退

---

就像上一节提到的，我们经常会犯错误，有事写了半天代码才发现做了好多无用功，需要退回到没有修改的状态，而且我们还提交了版本。git 作为版本管理工具肯定允许我们乘坐`时光机`回到任何我们提交的版本。git 让代码世界有了后悔药这个东西。

<!--more-->

### 查看版本提交记录

假如我们想查看历史版本，想要查看某一个版本的信息，或者想回退到某个版本，我们需要先查看我们的提交记录。使用命令`git log`：
```sh
$ git log
commit 85343597274e6796ad310b10c5730d44efcd9add
Author: zcong1993 <1005997919@qq.com>
Date: Sat Jan 7 17:06:53 2017 +0800

fix a comment space error

commit a1d27e18bc3519721969afd12c8b1ff50df2edfa
Author: zcong1993 <1005997919@qq.com>
Date: Sat Jan 7 17:03:54 2017 +0800

add some comments of conf.js
```
可以看到，每次提交都会有一条记录，第一行为 hash 版本号，每个版本都是唯一的；第二行是作者，如果我们是多人合作项目就会看到不同的作者，也方便了解每个人更改了什么；第三行是提交时间；接着是我们提交时的注释。

这时你应该知道了正确注释的重要性了吧。好的注释可以让我们在查看提交列表时就能根据注释快速定位到需要的版本。

我更习惯于使用这个命令查看提交记录`git log --pretty=format:"%h - %an, %ar : %s" `最好配置成别名：
```sh
8534359 - zcong1993, 8 hours ago : fix a comment space error
a1d27e1 - zcong1993, 8 hours ago : add some comments of conf.js
```
当然你还可以使用`--graph`参数，将会显示出分支合并信息。

这样就可以得到更清晰的记录了，当然你也可以自定义显示的颜色等信息。

### 版本穿梭

**注意：**本节操作非常危险，因为我们当前的文件会被历史版本覆盖，所以请确保回退前进行一次版本提交，否则当前未提交版本的更改都会丢失。

首先查看提交记录：
```sh
$ git ll
ab5fad6 - zcong1993, 4 seconds ago : 2
901c8e5 - zcong1993, 26 seconds ago : init
```
有两条版本记录，我们最新提交的就是最上面那个，此时我们就可以使用`git reset --hard <hash>`来进行版本穿梭。`--hard`参数就是是用 reset 版本回退的同时，使得我们的工作区也指向相应版本，也就是用回退版本文件**完全覆盖**当前工作区的文件。了解命令详细信息，请查看[官方文档](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86#_git_reset)。

现在我们使用命令回退到版本`init`：
```sh
$ git reset --hard 901c8e5
HEAD is now at 901c8e5 init
$ git ll
901c8e5 - zcong1993, 26 seconds ago : init
```
可以看到我们提交记录只剩下`init`了，文件也完全恢复到之前的版本了。

git 中`HEAD`表示的就是最新提交版本，而`HEAD^`表示上个版本，`HEAD^^`表示上两个版本，`HEAD~num`表示上 num 个版本。

那么我们回退回去又后悔了，怎么办？你会发现`git ll`中我们回退版本之后的所有记录也会丢失。

这时我们需要使用`git reflog`查看所有更新记录:
```sh
$ git reflog
901c8e5 HEAD@{0}: reset: moving to 901c8e5
ab5fad6 HEAD@{1}: commit: 2
901c8e5 HEAD@{2}: commit (initial): init
```
可以看到有之前的记录，最上面是一个回退记录，所有记录都保存了。这时我们找到了回退前版本的版本号了，所以你也知道怎么做了吧。这也就是建议你在回退前提交一个版本的原因了。

#### 使用版本回退丢弃当前工作区内容
上面提到了`--hard`非常危险会覆盖我们当前工作区内容，那么我们可以利用这个命令这一点来丢弃我们现在的更改，让本地文件恢复到最后一次提交版本的状态。
```sh
$ git reset --hard HEAD
```
还记得`HEAD`指向的永远是最新版本吗？

---

本节向大家介绍了 git 查看提交 log 和版本回退，最后再重申一下，版本回退时最好进行一次版本提交，保存现在版本，否则我们当前工作区会丢失。

本系列文章使用`Gitbook`编写，并发布在 [http://gitstart.zcong.win](http://gitstart.zcong.win)
