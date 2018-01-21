---
title: php-namespace-autoload
date: "2016-11-10"
layout: post
path: "/php-namespace-autoload/"
categories:
  - PHP
  - 扯淡
---

### namespace

我们的项目目录结构：

```
app
    Test1.php
    Test2.php
src
    Foo
        Dog.php
        Fish.php
    Bar
        Cat.php
        Dog.php
```

<!--more-->

`src`目录使我们自己定义的某些类，需要在`app`目录下的文件中引用。可以看到我们不同文件夹中有相同类名的出现，这是很常见的，但是我们如果不用命名空间就必须让这些命名唯一。之后增加新类的时候也要考虑与之前的是否重复。

接着我们试试利用`命名空间`解决这个问题。我们编辑`src/Foo/Dog.php`文件：
```php
namespace Demo\Bar;

class Dog{
    public static function index() {
        echo 'Demo Bar Dog !'."\n";
    }
}
```
可以看到我们使用`namespace  Demo\Bar;`为类增加了命名空间。`Demo`为我为`src/`这个目录定义的名称，`Bar`为目录名，这样引用时可以清晰地看出用的是哪个文件。同理我们分别为`src`下面的所有类增加命名空间。

使用命名空间，以`app/Test1.php`为例：
```php
//引入所有用到的文件
require("all files");

use Demo\Foo\Dog as FooDog; //为引入类定义别名，以防冲突
use Demo\Foo\Fish;
use Demo\Bar\Cat;
use Demo\Bar\Dog as BarDog;

FooDog::index();
Fish::index();
Cat::index();
BarDog::index();
```
这样我们就能像平常那样使用类了，命名空间带来的好处是不需要考虑类名冲突而命名非常冗长的类名或文件名，没有历史负担，增加修改方便。

但是，假如我们自定义的类很多，使用起来一个个`require`非常反人类，而且还都带路径，每个文件都需要不同的类，就算你写一个`require.php`将所有类包含进去，但是增加的时候，还需要手工维护。接着我介绍 2 中方法摆脱这个问题。

---

### autoload

相信使用`composer`的同学对这个非常熟悉，`composer`无论引入多少个类库，我们使用时仅仅需要引入它为我们生成的`autoload.php`即可，所以我们介绍第一种方式`psr-4 autoload`[^psr-4]。

#### psr-4

在项目根目录新建文件`composer.json`，已存在就修改即可：
```json
{
    "autoload": {
        "psr-4": {
            "Demo\\": "src/"
        }
    }
}
```
这里就是为了将我们自定义的根名称`Demo`与`src`目录统一起来。然后命令行输入：
```bash
$ composer dump-autoload
```
可以看到根目录会多一个`vendor`目录，之后我们引入`vendor/autoload.php`即可。

#### phpab

此方法非常轻量级，需要我们安装`phpab.phar`，链接[phpab][https://github.com/theseer/Autoload]。然后命令行运行：
```bash
$ php phpab.phar -o src/autoload.php src
```
即可在`src`目录下生成一个`autoload.php`文件，引入即可。
