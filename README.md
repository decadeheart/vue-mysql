# vue、webpack、express、mongodb搭建简单跑通全栈项目

> 本文会使用vue搭建一个简单单页应用，并且使用webpack打包，使用express框架服务，并使用mongodb管理数据存储，在服务器端部署，可以实现ip访问

项目效果预览

http://119.29.208.124:8080/#/

## 环境前提

 [Node.js](https://nodejs.org/en/) (>=4.x, 6.x preferred), npm version 3+ and [Git](https://git-scm.com/).

不论是本地开发还是服务器部署，都需要node环境，次处就不细讲如何在windows和linux配置nodejs环境了

## 1.vue-cli快速搭建项目

安装

```
 npm install -g vue-cli
```

创建集成了webpack的项目

```
vue init webpack my-project
```

接下来会进入安装阶段

```
Project name (my-project) 
//项目名称，可以自己指定，也可直接回车，按照括号中默认名字（注意这里的名字不能有大写字母，如果有会报错Sorry, name //can no longer contain capital letters），阮一峰老师博客为什么文件名要小写 ，可以参考一下。
Project description (A Vue.js project)  //项目描述，也可直接点击回车，使用默认名字
Author (...) 
//选择部分
Runtime + Compiler: recommended for most users    //运行加编译，推荐选择
Install vue-router? (Y/n)  //是否安装vue-router，这是官方的路由,比较适合构建单页应用，于是我在此处选择了使用
Use ESLint to lint your code? (Y/n)    //是否使用ESLint管理代码，ESLint是个代码风格管理工具，是用来统一代码风格，新手建议不用，不然回多出来很多语法上不规范而引起的错误
Setup unit tests with Karma + Mocha? (Y/n)  //是否安装单元测试，此项目没用到

Setup e2e tests with Nightwatch(Y/n)?     //是否安装e2e测试 ，此项目没用到
```

![project](C:\Users\decade\Pictures\Saved Pictures\project.png)

+ build目录 npm build *运行时执行的文件存放在此处，还有很重要的webpack配置文件
+ config目录 确定了执行run dev 和run build时的一些配置文件
+ dist目录 存放的是build命令执行后生成的产品文件
+ node_modules目录 存放的是依赖
+ src目录 存放的就是源码

在cmd里面切换到项目目录

```
cd my-project
```

安装依赖，此时才会生成node_modules目录

```
npm install
```

这个命令会自动读取package.json里面含有的所有的依赖信息和版本

等待安装完毕，就可以尝试启动项目了

```
npm run dev
```

这个时候，会自动拉起浏览器，自主访问http:\\\localhost:8080

此时，在这个页面会出现一个vue的默认界面

此处建议使用chrome浏览器，安装一个vue-tool插件，会比较方便的进行vue开发

![vue](C:\Users\decade\Pictures\Saved Pictures\vue.png)

接下来就可以进入到我们的项目开发阶段

## 2.完成本地环境下项目开发

由于涉及到xhr请求，所以还需要下载vue-resource,样式方面选择了bootstrap框架，所以先安装依赖

```
npm i vue-resource bootstrap --save
```

然后我们需要在main.js中引入我们的依赖

```
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//需要我们引入的
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
Vue.use(VueResource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

```

### 2.1统一部分编写

我们可以看到src源码目录的结构如下

![dir](C:\Users\decade\Pictures\Saved Pictures\dir.png)

我们可以把app.vue当做是主组件，其他组件的入口，所以在app.vue编写的部分，在每个路由下的页面都会存在

，我们可以在此处，为我们的项目编写一个导航栏和页脚

此时的app.vue

```
<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/home">
            <i class="glyphicon glyphicon-check"></i>
            丁丁
          </a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav" >
            <li><router-link to="/home">首页</router-link></li>
            <li><router-link to="/vedios">视频</router-link></li>
            <li><router-link to="/books">书籍</router-link></li>
          </ul>
          <form class="navbar-form navbar-left">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search">
            </div>
            <button type="submit" class="btn btn-default">搜索</button>
          </form>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="col-sm-12">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <div class="container">
        <div class="col-sm-3">
          <ul>
            <li class="li-head">产品</li>
            <li class="li-item"> <router-link to="/books">视频</router-link></li>
            <li class="li-item"><router-link to="/vedios">书籍</router-link></li>
          </ul>
        </div>
        <div class="col-sm-3">
          <ul>
            <li class="li-head">关于</li>
            <li class="li-item"> <router-link to="/about">了解我们</router-link></li>
            <li class="li-item"><router-link to="/about">加入我们</router-link></li>
          </ul>
        </div>
        <div class="col-sm-3">
          <ul>
            <li class="li-head">服务支持</li>
            <li class="li-item"> <a href="www.decadexun.cn">技术支持</a></li>
            <li class="li-item"><router-link to="/books">售后服务</router-link></li>
          </ul>
        </div>
        <div class="col-sm-3">
          <div class="head">100-800-200</div>
          <div class="box"> 联系客服</div>
          <div class="time">周一至周日 9:00 - 22:00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.footer{
  border-top:#e7e7e7 1px solid;
  background: #f8f8f8;
  padding: 30px 0;
}
li{
  list-style: none;
}
.li-head{
  font-size: 18px;
  margin-bottom: 10px;
}
.li-item{
  margin-top:10px;
}
.box{
  width: 100%;
  height: 30px;
  background: #337ab7;
  margin: 10px 0;
  text-align: center;
  line-height: 30px;
  color:#fff;
}
.head{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.time{
  font-size: 14px;
  text-align: center;
}
</style>

```

由于用到了bootstrap的自适应合并、轮播图组件，所以，如果此时你run dev，会报一个缺少jQuery的错误，所以，我们可以去网上找一个jquery的cdn库，找到根目录的index.html,这是我们的首页入口页面，加入如下内容

```
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
```

由于bootstrap是一个可以自适应手机端的ui库，所以你也可以顺手加入

```
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
```

于是在手机上访问的时候，也会 有较好的效果

此时的index.html

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>首页</title>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

然后

```
npm run dev
```

此时的效果

![index1](C:\Users\decade\Pictures\Saved Pictures\index1.png)

### 2.2创建首页组件

看到上图的中间部分，这就是```<router-view></router-view>```渲染的效果，此时的首页默认是components下的vue组件，于是我可以写一个自己的首页组件，取代中间的部分

```
<template>
  <div>
      <div class="col-sm-9">
        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
          </ol>

          <!-- Wrapper for slides -->
          <div class="carousel-inner" role="listbox">
            <div class="item active">
              <img src="http://res.cloudinary.com/dyb29pfpm/image/upload/v1507608949/1507513417919_h1vcov.jpg" alt="#">
              <div class="carousel-caption">
                1
              </div>
            </div>
            <div class="item">
              <img src="http://res.cloudinary.com/dyb29pfpm/image/upload/v1507608948/1507514383114_ksq1ib.jpg" alt="#">
              <div class="carousel-caption">
                2
              </div>
            </div>
            <div class="item">
              <img src="http://res.cloudinary.com/dyb29pfpm/image/upload/v1507608944/1507514233895_bv935a.jpg" alt="#">
              <div class="carousel-caption">
                2
              </div>
            </div>
          </div>

          <!-- Controls -->
          <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="col-sm-3">
      </div>
  </div>
</template>
<script>
export default {
}
</script>


```

这是一个轮播图，但是我们需要怎样才可以看到效果呢，怎样取代中间部分，这就涉及到了路由的问题了，vue-router可以登场了

在刚才的src目录下，还有一个router目录，查看里面的index.js文件,此时是这样的

```
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})

```

于是我们明白为什么，首页会显示helloworld效果，是因为路由指定读取了在路径为''/''的时候读取该组件，于是我们将该部分换成我们自己的组件

此时的index.js

```
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
```

修改后，我们可以查看效果

![index2](C:\Users\decade\Pictures\Saved Pictures\index2.png)

现在的效果就比较优雅了，但是右边好像比较空虚，于是我们可以设置一个侧边栏，考虑到，不仅仅在首页要用到侧边栏，于是我们将侧边栏写成一个组件，方便多个页面调用该组件

### 2.3创建通用部分组件

Sidebar.vue

```
<template>
  <div class="panel panel-default">
    <div class="panel-heading">
        热门课程
    </div>
    <img src="http://res.cloudinary.com/dyb29pfpm/image/upload/v1507608952/1507514293423_jv25xh.jpg" class="img-responsive" alt="Responsive image">
    <img src="http://res.cloudinary.com/dyb29pfpm/image/upload/v1507608952/1507514293423_jv25xh.jpg" class="img-responsive" alt="Responsive image">
    <img src="http://res.cloudinary.com/dyb29pfpm/image/upload/v1507608952/1507514293423_jv25xh.jpg" class="img-responsive" alt="Responsive image">
  </div>
</template>

<script>
  export default {

  }
</script>

```

那我们该怎样在父组件Home.vue里面加入组件

template部分

```
<template>

...
      <div class="col-sm-3">
        <sidebar></sidebar>
      </div>
</template>
```

script部分

```
<script>
import Sidebar from "./Sidebar.vue"
export default {
  components:{
    'sidebar': Sidebar,
  },
}
</script>
```

此时由于热加载，直接就可以看到加入了侧边栏后的效果

于是一个完全没有数据交互的展示型首页就出现了，接下来我们要创建一些有其他功能的界面

### 2.4创建录入书籍页面

录入页面可以算是控制台了，为了管理方便，肯定是会有一个控制台页面进行集成，但此处我们只讲实现这一个功能的页面

创建BookAdmin.vue

```

<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      录入书籍
    </div>
    <div class="panel-body">
      <div class="form-horizontal">
        <div class="form-group">
          <div class="col-sm-12">
            <label>书籍名称</label>
            <input
              type="text"
              class="form-control"
              v-model="book.name"
              placeholder="name"
            />
          </div>
          <div class="col-sm-12">
            <label>编写老师</label>
            <input
              type="text"
              class="form-control"
              v-model="book.teacher"
              placeholder="teacher"
            />
          </div>
          <div class="col-sm-12">
            <label>书籍简介</label>
            <input
              type="text"
              class="form-control"
              v-model="book.introduction"
              placeholder="introduction"
            />
          </div>
          <div class="col-sm-12">
            <label>购买链接</label>
            <input
              type="text"
              class="form-control"
              v-model="book.shopUrl"
              placeholder="shopUrl"
            />
          </div>
          <div class="col-sm-12">
            <label>图片链接</label>
            <input
              type="text"
              class="form-control"
              v-model="book.pictureUrl"
              placeholder="pictureUrl"
            />
          </div>
        </div>
        <button class="btn btn-primary" @click="save()">录入</button>
        <router-link to="/" class="btn btn-danger">取消</router-link>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
        name : 'BookAdmin',
        data() {
            return {
              book:{
                name : '',
                teacher : '',
                introduction : '',
                shopUrl : '',
                pictureUrl : '',
              }
            }
        },
        methods:{
          save() {
            this.$http.post('localhost:8080/createBook',{
              name : this.book.name,
              teacher : this.book.teacher,
              shopUrl : this.book.shopUrl,
              pictureUrl : this.book.pictureUrl,
              introduction : this.book.introduction
            }).then(function(ret){
              console.log(ret);
              let book = this.book
              console.log(book);
              location.href="/#/books"
            })
          }
        }
    }
</script>

```

为了能够反问到我们的页面，我们都知道该去添加新的路由了

index.js修改成如下

```
 import BookAdmin from '@/components/BookAdmin'
 
 ...
 
 routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/bookAdmin',
      name: 'BookAdmin',
      component: BookAdmin
    }
  ]
```

然后在浏览器访问http://localhost:8080/#/bookAdmin

此时的效果如下

![bookadmin](C:\Users\decade\Pictures\Saved Pictures\bookadmin.png)

那我们该怎样向后台post表单数据呢

大家可以看组件的script部分

```
<script>
  export default {
        name : 'BookAdmin',
        data() {
            return {
              book:{
                name : '',
                teacher : '',
                introduction : '',
                shopUrl : '',
                pictureUrl : '',
              }
            }
        },
        methods:{
          save() {
            this.$http.post('localhost:8080/createBook',{
              name : this.book.name,
              teacher : this.book.teacher,
              shopUrl : this.book.shopUrl,
              pictureUrl : this.book.pictureUrl,
              introduction : this.book.introduction
            }).then(function(ret){
              console.log(ret);
              let book = this.book
              console.log(book);
              location.href="/#/books"
            })
          }
        }
    }
</script>
```

首先使用了一个data()方法，返回的book对象，里面包含了我们需要接收关于一个book 的所有属性，此时为空，然后我再下面又引入了一个methods对象，里面包含了点击按钮触发的save()方法

```
this.$http.post('localhost:8080/createBook',{}).then(function(){})
```

便是vue-resource的使用方法，此处的url-'localhost:8080/createBook',便是发送的请求链接，于是大家便知道，我们接下来要定义后台的监听端口，并定义/createBook方法，才能使这个方法生效

### 2.5完成数据交互

首先安装需要的依赖

```
npm install express morgan mongodb body-parser --save-dev
```

Morgan和body-parser，分别用来log美化和解析参数。然后再根目录创建app.js作为入口

```
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
//确定数据库名称vuetest
var mongoUrl = 'mongodb://localhost:27017/vuetest';
var _db;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));
MongoClient.connect(mongoUrl, function (err, db) {
  if(err) {
    console.error(err);
    return;
  }
  console.log('mongodb have connected your project');
  _db = db;
  //监听端口8080
  app.listen(8080, function () {
    console.log('server is running at 8080');
  });
});
```

通过上面的配置，我们创建了名为vuetest的数据库，确定了监听端口8080

接下来继续在app.js编写/createBook方法

```
//增加书籍
app.post('/createBook', function(req, res, next) {
var request = req.body;
//接受请求
var collection = _db.collection('book');
//创建名为book的数据表
if(!request.name || !request.teacher || !request.introduction || !request.shopUrl || !request.pictureUrl) {
  res.send({errcode:-1,errmsg:"参数不完整"});
  return;
}
//插入数据表
collection.insert({name: request.name, teacher: request.teacher,introduction: request.introduction,shopUrl: request.shopUrl,pictureUrl: request.pictureUrl,}, function (err, ret) {
  if(err) {
    console.error(err);
    res.status(500).end();
  } else {
    res.send({errcode:0,errmsg:"ok"});
  }
});
});
```

接下来需要开启我们的mongodb服务，本地开发，就得在本机的windows或者mac上安装mongodb

完成了mongodb安装之后

切换到mongodb目录

```
$ ./mongod --dbpath E:\data
```

使用这个命令启动mongodb服务 dbpath是为了确定数据存储的路径，我的本地数据库存储路径就是E:\data

![mongo](C:\Users\decade\Pictures\Saved Pictures\mongo.png)

有上图的显示表示开启成功

接下来,打包构建并运行我们的项目

```
npm run build
node app.js
```

可以在localhost:8080访问我们的项目，直接http://localhost:8080/#/bookAdmin到达录入页

输入一些信息进行测试

![test](C:\Users\decade\Pictures\Saved Pictures\test.png)

在XHR请求里面可以看到一切正常，数据已经插入到数据库，并且此时已经跳转到了/books列表页了，由于没有写列表页，所以中间部分是空白的

### 2.6创建数据展示组建-列表页

BookList.vue

```
<template>
  <div>
    <div class="col-sm-9">
      <div>
        <i class="glyphicon glyphicon-list-alt"></i>
        书籍列表
        </div>
      <hr>
      <div>
        <p v-if="!books.length"><strong>还没有任何书籍</strong></p>

        <div class="list-group">
          <a class="list-group-item" v-for="(book,index) in books" :href="book.shopUrl">
            <div class="row">
              <div class="col-sm-3 book-avatar">
                <img :src="book.pictureUrl" class="avatar img-responsive" />
              </div>

              <div class="col-sm-4 text-center">
                <h5 class="list-group-item-text total-time">
                  <i class="glyphicon glyphicon-book"></i>
                  {{ book.name }}
                </h5>
                <p class="label label-primary text-center">
                  <i class="glyphicon glyphicon-user"></i>
                  {{ book.teacher }}
                </p>
              </div>

              <div class="col-sm-5">
                <p>{{ book.introduction }}</p>
              </div>

            </div>
          </a>

        </div>
      </div>
    </div>
    <div class="col-sm-3">
        <sidebar></sidebar>
    </div>
  </div>
</template>
<script>
import Sidebar from "./Sidebar.vue"
    export default {
        components:{
          'sidebar': Sidebar,
        },
        name : 'BookList',
        data(){
          return {
            books:[]
          }
        },
        created(){
          document.title="书籍列表"
          this.$http.get('http://localhost:8080/book-list')
            .then(function(ret) {
              this.books = ret.data;
              console.log(ret.data)
            })
            .then(function(err) {
              console.log(err);
            })
        },
    }
</script>
<style>
.avatar {
    width:100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .book-avatar {
    width:100%;
    background-color: #f5f5f5;
    border-top: 18px;
  }
</style>

```

套路和之前一模一样

再到router的index.js插入路径

```
...
import BookList from '@/components/BookList'
...
...
    {
      path: '/books',
      component: BookList,
    },
```

然后回到app.js添加控制方法

```
//获取书籍列表
app.get('/book-list', function(req, res, next) {
  var collection = _db.collection('book');
  //使用了数据表查找全部的方法
  collection.find({}).toArray(function (err, ret) {
    if(err) {
      console.error(err);
      return;
    }
    res.json(ret);
  });
});
```

然后我又去http://localhost:8080/#/bookAdmin录入了一本书，此时跳转之后的效果

![book-list](C:\Users\decade\Pictures\Saved Pictures\book-list.png)

感觉还是不错的

于是到此处，关于本地环境下的项目，已经跑通全栈，接下来，便是服务器跑通的环节

## 3.完成服务器环境下的项目开发

### 3.1首先是先将项目上传到服务器

在此处我选择使用git，然后考虑我们应该上传哪些到服务器，dist生成文件肯定是要的，然后是app.js涉及到的部分,不需要的在.gitgignore里面便可以再上传时被忽视

现在github上创建一个git仓库https://github.com/decadeheart/vue-example.git

在本地

```
git init 
git remote add origin https://github.com/decadeheart/vue-example.git
git add .
git commit -m "上传服务器"
git push origin master
```

这个时候可以切换到服务器了

至于服务的来源，推荐腾讯云，学生优惠之前可以抢1元一个月的，现在我买的是10元一个月，最低配置，但也可以拿来耍耍

```
ssh root@xxx.xx.xx.xx
//后面的是ip
```

登录上去之后，首先将项目文件拉取下来

```
cd /home
mkdir vue-exmaple
cd vue-exmaple
git init
//前提是你的服务器安装好了git
 git remote add origin https://github.com/decadeheart/vue-example.git
git pull origin master
ls
```

接下来就是想要运行node app.js来运行项目了

但是肯定是需要依赖的，首先便就是服务器上的nodejs，还有服务器上的mongodb

### 3.2安装服务器上的依赖

顺序应该是

+ 安装nodejs，可以参考[Linux系统（Centos）下安装nodejs并配置环境](http://blog.csdn.net/qq_21794603/article/details/68067821)
+ 安装mongodb[MongoDB系列一：CentOS7.2下安装mongoDB3.2.8](http://www.cnblogs.com/roam/p/5762459.html)
+ 安装nginx [Centos下 Nginx安装与配置](http://www.jianshu.com/p/d5114a2a2052)

在我们启动了mongodb之后。可以考虑来安装运行app.js的依赖

```
npm i express body-parser morgan mongodb
//安装完成后尝试运行
node app.js
```

访问http://ip:8080/#/就可以在网页看到网上的效果

但是这个时候，我们所有的交互数据都出现了问题，报下面这个错误

![error](C:\Users\decade\Pictures\Saved Pictures\error.png)

这是因为我们发送的请求loacalhost并不是我们现在的服务器ip，所以连接的不是服务器数据库，被拒绝，需要修改成

```
http://119.29.208.124:8080/createBook
http://119.29.208.124:8080/book-list
```

然后重新打包，打包之后上传git再拉下来更新，就发现我们可以正常录入信息到数据库了，作为在服务器上运行的项目，肯定是希望他在服务器上永久运行，所以可以安装pm2或者forever等工具使得项目永久在服务器上运行

由于我的服务器原因，下载pm2老是失败，所以我选择了forever

```
npm i forever g
forever start app.js
```

常用命令如下

```
$ npm install forever -g   #安装
$ forever start app.js          #启动
$ forever stop app.js           #关闭
$ forever start -l forever.log -o out.log -e err.log app.js   #输出日志和错误
```

然后你就可以推出当前目录去做其他事情了

讲道理，这个项目现在已经可以在服务器自主运行，终于完结撒花了

test：圣诞树测试

最后附上github地址

https://github.com/decadeheart/vue-example.git

