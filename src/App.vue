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
          </a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav" >
            <li><router-link to="/home">首页</router-link></li>
            <li><router-link to="/shopbooks">书城</router-link></li>
            <li><router-link to="/control">控制台</router-link></li>
          </ul>
          <div class="navbar-form navbar-left">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search" v-model="bookFactor">
            </div>
            <button type="submit" class="btn btn-default" @click="toSearch()">搜索</button>
          </div>
          <ul class="nav navbar-right navbar-nav">
            <li><a data-toggle="modal" href="#myModal" v-if="!showName">登录</a></li>
            <li><a data-toggle="modal" href="#registModal" v-if="!showName">注册</a></li>
            <li v-if="showName">
              <a href="#/user"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>
              {{showName}}
              </a>
            </li>
            <li v-if="showName" @click="loginOut()">
              <a><span>|</span>
              登出
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="col-sm-12">
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">登录</h4>
              </div>
              <div class="modal-body">
                <form>
                  <fieldset class="form-group">
                    <label for="formGroupExampleInput">用户名</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="用户名" v-model="userId">
                  </fieldset>
                  <fieldset class="form-group">
                    <label for="formGroupExampleInput2">密码</label>
                    <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="密码" v-model="password">
                  </fieldset>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="login()">登录</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" href="#registModal">去注册</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="registModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">注册</h4>
              </div>
              <div class="modal-body">
                <form>
                  <fieldset class="form-group">
                    <label for="formGroupExampleInput">用户名</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="用户名" v-model="userId">
                  </fieldset>
                  <fieldset class="form-group">
                    <label for="formGroupExampleInput2">密码</label>
                    <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="密码" v-model="password">
                  </fieldset>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="addUser()">注册</button>
              </div>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      userId:'',
      password:'',
      showName:'',
      bookFactor:'',
    }
  },
  mounted(){
    let self = this
    console.log(localStorage)
    if(localStorage.name){
      self.showName=localStorage.name
    }else{
      alert('需要登录')
    }
  },
  methods: {
    addUser() {
      this.$http.post('/api/user/addUser', {
        userId: this.userId,
        password: this.password
      },{}).then((response) => {
        console.log(response);
        alert("注册成功!")
        $('#registModal').modal('hide')
      })
    },
    toSearch(){
      location.href=`/#/booksearch?bookFactor=${this.bookFactor}`
    },
    login() {
      this.$http.post('/api/user/selectUser', {
        userId: this.userId,
        password: this.password
      },{}).then((response) => {
        console.log(response);
        if(response.body=='-1'){
          alert('用户名错误!')
        }else if(response.body=='0'){
          alert('密码错误!')
        }else{
          localStorage.setItem("name",response.body[0].userId)
          this.showName = localStorage.name
          alert('登录成功')
          $('#myModal').modal('hide')
        }
      })
    },
    loginOut(){
      localStorage.clear()
      this.showName=''
    }
  }
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
li a:hover{
  cursor: pointer;
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
