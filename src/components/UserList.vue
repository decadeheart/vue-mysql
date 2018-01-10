<template>
  <div class="container">
    <div class="col-sm-12">
      <div>
          <div class="form-group form-inline ">
            <i class="glyphicon glyphicon-list-alt"></i>
            用户列表
              <div class="input-group">
                <div class="input-group-addon">搜索</div>
                <input type="text" class="form-control" id="exampleInputAmount" v-model="factor">
              </div>
            <button type="submit" class="btn btn-primary" @click="searchUser()">search</button>
            </div>
        </div>
      <hr>
      <div>
        <p v-if="!users.length"><strong>还没有任何用户</strong></p>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>姓名</th>
              <th>地址</th>
              <th>余额</th>
              <th>信用等级</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in users">
              <td>{{user.userId}}</td>
              <td>{{user.name}}</td>
              <td>{{user.address}}</td>
              <td>{{user.extral}}</td>
              <td>{{user.level}}</td>
              <td><button class="btn btn-warning" data-toggle="modal" data-target="#updateModal" @click="chooseUser(user)">更新</button><button class="btn btn-danger" @click="deleteUser(user)">删除</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-sm-12" v-if="searchUsers.length">
      <div>
        <i class="glyphicon glyphicon-list-alt"></i>
          搜索结果
        <span class="pull-right">关键字:{{factor}}</span>
        </div>
      <hr>
      <div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>姓名</th>
              <th>地址</th>
              <th>余额</th>
              <th>信用等级</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in searchUsers">
              <td>{{user.userId}}</td>
              <td>{{user.name}}</td>
              <td>{{user.address}}</td>
              <td>{{user.extral}}</td>
              <td>{{user.level}}</td>
              <td><button class="btn btn-warning" data-toggle="modal" data-target="#updateModal" @click="chooseUser(user)">更新</button><button class="btn btn-danger" @click="deleteUser(user)">删除</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">修改信息</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputEmail1">姓名</label>
              <input type="text" class="form-control"  placeholder="name" v-model="selectedUser.name">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">地址</label>
              <input type="text" class="form-control"  placeholder="address" v-model="selectedUser.address">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">余额</label>
              <input type="text" class="form-control"  placeholder="publisher" v-model="selectedUser.extral">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">等级</label>
              <input type="text" class="form-control"  placeholder="price" v-model="selectedUser.level">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateUser()">确认修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name : 'UserList',
      data(){
        return {
          users:[],
          selectedUser:[],
          searchUsers:[],
          factor:'',
        }
      },
      created(){
        document.title="用户列表"
        this.$http.get('/api/user/userList')
          .then(function(ret) {
            this.users = ret.data;
            console.log(ret.data)
          })
          .then(function(err) {
            console.log(err);
          })
      },
      methods:{
        searchUser(){
          this.$http.post('/api/user/searchUser',{
            factor:this.factor
          })
            .then(function(ret){
              if(ret.data==-1){
                alert('没有搜索到')
              }else{
                this.searchUsers=ret.data
              }
            })
        },
        chooseUser(user){
          this.selectedUser = user
        },
        updateUser(){
          $('#updateModal').modal('hide')
          this.$http.post('/api/user/AdminUpdate',{
          name: this.selectedUser.name,
          address: this.selectedUser.address,
          extral: this.selectedUser.extral,
          level: this.selectedUser.level,
          userId: this.selectedUser.userId
          },{})
          .then(function(ret) {
            console.log(ret.data)
          })
          .then(function(err) {
            console.log(err);
          })
        },
        deleteUser(user){
          console.log(user.name)
          this.removeByValue(this.users,user)
          this.$http.post('/api/user/deleteuser',{
          userId: user.userId
          },{})
          .then(function(ret) {
            console.log(ret.data)
          })
          .then(function(err) {
            console.log(err);
          })
        },
        removeByValue(arr,val){
          for(var i=0; i<arr.length;i ++){
            if(arr[i]==val){
              arr.splice(i,1)
              break
            }
          }
        },
      }
    }
</script>
<style>
