---
title: 登录系统密码升级
date: "2017-08-15"
layout: post
path: "/upgrade-password/"
categories:
  - 安全
  - 逻辑
  - PHP
---

> 由于工作的原因，没想到又开始使用PHP了。。。稍微说一下密码加密吧。

只要有登录系统，就会有密码加密。之前的加密惯用md5，随着计算机性能的提高md5早已不是安全的加密算法了，比如某些网站就md5到源字符串查询的功能，简单的单词都可以查出来。当然，也有自造盐值md5加密，但是复杂度决定了它还是不够安全，为何不用bcrypt呢？虽然慢，但是网站的注册量并发量不会很大的，所以完全没压力。

当然，也有一个原因是维护一些远古时期的代码。其实，非常简单就可以替用户升级的。

<!--more-->

#### 学习WordPress

早先使用WordPress时，发现它既支持md5又支持bcrypt，而且在数据库插入的md5密码，可以登录，但在登录之后会变成bcrypt加密，很好奇，而且之前工作迁移用户到WordPress时也修改了WordPress登录验证的代码。

其实很简单，WordPress验证登录时，会先判断密码是不是bcrypt加密（简单来说，通过长度和前几位就可以判断），如果不是，会先被当做md5验证是否正确，如果正确，则用bcrypt加密，并更新数据库用户信息。

此处的逻辑更改为自己的加密逻辑就可以给用户一个更安全的体验了。

#### laravel框架该怎么做？

当然也是这种思路。开始我的想法是改写laravel的Auth，最后感觉没有必要，这里只是Hash的工作，加一个自己的Hash就行了。

```php
// app/Libiraries/CustomHasher.php
&lt;?php

namespace App\Libraries;
use App\User;
use Illuminate\Hashing\BcryptHasher;

class CustomHasher extends BcryptHasher
{
    // override check method
    public function check($value, $hashedValue, array $options = [])
    {
        if (!password_verify($value, $hashedValue)) {
            $user = User::wherePassword($hashedValue)-&gt;first();
            if ($user &amp;&amp; $this-&gt;old_hash_check($value, $hashedValue)) {
                // password use old hash method, update it
                $user-&gt;password = \Hash::make($value);
                $user-&gt;save();
                return true;
            }
        }
        return password_verify($value, $hashedValue);
    }
    // old hash logic
    protected function old_hash_check($value, $stored_hash) {
        // your old check logic, return boolean
    }
}
```

接着我们需要写一个自己的`HashServiceProvider`，然后注册：

```php
// app/Providers/HashServiceProvider.php
&lt;?php

namespace App\Providers;
use App\Libraries\CustomHasher;
use Illuminate\Hashing\HashServiceProvider as Provider;


class HashServiceProvider extends Provider
{
    public function register ()
    {
        $this-&gt;app-&gt;singleton(&#039;hash&#039;, function () {
            return new CustomHasher;
        });
    }

    public function provides ()
    {
        return [&#039;hash&#039;];
    }
}
```
```php
// config/app.php
&lt;?php
...
&#039;providers&#039; =&gt; [
    // custom hash provider
    App\Providers\HashServiceProvider::class,
]
...
```
现在，我们自己的Hash会替代原来的工作，用户的密码会在第一次登录时被更新。
