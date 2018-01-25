---
title: circleci 系列1 - compose
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
