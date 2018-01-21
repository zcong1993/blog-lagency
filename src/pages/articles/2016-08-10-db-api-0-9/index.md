---
title: DB_api 文档
date: "2016-08-10"
layout: post
path: "/db-api-0-9/"
categories:
  - PHP
  - Database
  - Admin
  - API
  - 扯淡
---

### DB_api 文档

#### 配置相关

在`DB.php`里面添加配置

    static private $dbConfig = array(
        'host'      => '127.0.0.1',     #地址
        'username'  => 'zcong',         #用户名
        'passwd'    => '****',        #密码
        'database'  => 'zctest',        #启用数据库名称
        'type'      => 'mysql',         #数据库类型，默认
        'port'      => 3306             #端口号，默认
    );

<!--more-->

请求的入口文件是`db_api.php`

    method方法:
        find_all    #相当于select *
        find        #可以自定义返回的列
        insert      #插入数据
        update      #更新数据
        delete      #删除数据，仅支持通过主键删除

消息格式:`{"code":200,"msg":"find_all success","data":data }`,`code`是状态码 `msg`提示信息 `data`真正返回的数据。

状态码:

    200 success         成功，注： 某些方法成功与否还得自己判断，比如重复删除一条记录，都会返回成功，data为1才是真正的成功，0是空操作。
    300 insert error    插入数据失败,data数据不符合规范
    301 delete error    删除数据key参数只能是数字
	302 table error 	表名错误，表不存在
    400 para error      url地址参数错误
    401 mysql error     mysql连接失败
    402 method error    method不合法

#### 基本操作(method)

> - `get_meta` 查询表中全部字段，以及`dom类型`

		url:  http://154.16.166.38/sql/db_api.php?table_name=<表名>&method=<方法>
		参数：table_name 表名(必须) method 方法(必须)
		返回值：object,key(字段名):value(text|textarea)暂时只有两种，text表示['int','tinyint','float','char','varchar','bool','date']中的类型，可以直接用input显示，而textarea则表示建议使用textarea显示
		例子：http://154.16.166.38/sql/db_api.php?table_name=text&method=get_meta

> - `find_all` 查询全部字段

        url: http://154.16.166.38/sql/db_api.php?table_name=<表名>&method=<方法>&limit=<长度>&where=<条件>&order=<排序>&desc=<是否降序排序>
        参数: table_name 表名(必须) method 方法(必须)
            limit 长度(选填),默认为所有,<1的值相当于查询所有
            where 条件(选填),默认为空,格式为{条件1,条件2...}默认以&&连接
            order 排序(选填),默认为空
            desc  是否降序排序，默认为false，只有order存在时生效
        例子:http://154.16.166.38/sql/db_api.php?table_name=book&method=find_all&limit=100&where={id>2,id<150}&order=id&desc=1

> - `find` 查询部分字段

        url: http://154.16.166.38/sql/db_api.php?table_name=<表名>&method=<方法>&keys=<字段>&limit=<长度>&where=<条件>&order=<排序>&desc=<是否降序排序>
        参数：keys 字段名(必须),格式为{字段1,字段2...},单一字段可不用写{},注意最终数据会以参数中的字段顺序显示。
            其他部分同上
        例子: http://154.16.166.38/sql/db_api.php?table_name=book&method=find&keys={num,id}&limit=100&where={id>2,id<150}&order=id&desc=1

> - `insert` 插入数据

	GET方式：
        url: http://154.16.166.38/sql/db_api.php?table_name=<表名>&method=<方法>&data=<数据>
        参数: data 插入的数据(必须),格式{字段名1:数据1,字段名2:数据2...}
            其他部分同上
        例子: http://154.16.166.38/sql/db_api.php?table_name=book&method=insert&data={bookname:zc111,author:zc,num:2}

	POST方式：
		url: http://154.16.166.38/sql/db_api.php?method=insert
		参数：data 插入数据（必须），格式为{"name":"zc","age":23},也就是object形式
			table_name 表名（必须），string类型

> - `update` 更新数据

	GET方式：
        url: http://154.16.166.38/sql/db_api.php?table_name=<表名>&method=<方法>&data=<数据>&key=<条件中的键>&value=<条件中的值>
        参数；data 更新的数据(必须),格式{字段名1:数据1,字段名2:数据2...}
            key 执行条件中的键(必须)
            value 执行条件中的值(必须)
        例子: http://154.16.166.38/sql/db_api.php?table_name=book&method=update&data={bookname:zc222}&key=id&value=208

	POST方式：
		url: http://154.16.166.38/sql/db_api.php?method=update
		参数：data 插入数据（必须），格式为{"name":"zc","age":23},也就是object形式
			table_name 表名（必须），string类型
			key 执行条件中的键(必须),string类型，建议使用主键
            value 执行条件中的值(必须),string|int类型

> - `delete` 删除数据，**只支持主键删除**

        url: http://154.16.166.38/sql/db_api.php?table_name=<表名>&method=<方法>&key=<删除信息的主键id值>
        参数: key 主键id值(必须)
            其他同上
        例子：http://154.16.166.38/sql/db_api.php?table_name=book&method=delete&key=208

#### 注意事项

1. 删除操作为了防止条件被设置成 status=1 类似的，一次会删除好多数据的情况，所以强制将条件中的键设置为`id`，所以仅对**主键**是`id`的表有效果，正在想更好的解决方法;
2. 插入数据和更新数据时，同时支持`GET`和`POST`方式，建议使用`POST`方式，`GET`只是为了手动操作方便，前端使用 api 时必须使用`POST`;
