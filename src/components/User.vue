<template>
  <div>
    <div class="col-sm-12">
      <div>
        <i class="glyphicon glyphicon-user"></i>
        个人信息
      </div>
      <hr>
      <div>
        <div class="panel panel-default">
          <div class="panel-body">
            <div>
              <i class="glyphicon glyphicon-tree-deciduous"></i>
              <span>账户</span>
              <span>{{userInfo.userId}}</span>
              <span></span>
            </div>
            <hr>
            <div>
              <i class="glyphicon glyphicon-apple"></i>
              <span>姓名</span>
              <span>{{userInfo.name}}</span>
            </div>
            <hr>
            <div>
              <i class="glyphicon glyphicon-lock"></i>
              <span>密码</span>
              <span>{{userInfo.password}}</span>
            </div>
            <hr>
            <div>
              <i class="glyphicon glyphicon-home"></i>
              <span>地址</span>
              <span>{{userInfo.address}}</span>
            </div>
            <hr>
            <div>
              <i class="glyphicon glyphicon-yen"></i>
              <span>余额</span>
              <span>{{userInfo.extral}}</span>
              <button type="button" class="btn btn-primary btn-lg active" data-toggle="modal" data-target="#moneyModal">充值</button>
            </div>
            <hr>
            <div>
              <i class="glyphicon glyphicon-signal"></i>
              <span>等级</span>
              <span>{{userInfo.level}}</span>
            </div>
            <hr>
          </div>
          <div class="panel-footer">
            <button type="button" class="btn btn-primary btn-lg active" data-toggle="modal" data-target="#updateModal">修改完善信息</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="moneyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">充值</h4>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <span class="input-group-addon">$</span>
              <input type="text" class="form-control" v-model="addExtral">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addMoney()">确认充值</button>
          </div>
        </div>
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
              <input type="text" class="form-control"  placeholder="name" v-model="userInfo.name">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">密码</label>
              <input type="text" class="form-control"  placeholder="password" v-model="userInfo.password">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">地址</label>
              <input type="text" class="form-control"  placeholder="address" v-model="userInfo.address">
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
import Sidebar from "./Sidebar.vue"
    export default {
        components:{
          'sidebar': Sidebar,
        },
        name : 'BookList',
        data(){
          return {
            userInfo:[],
            userId:'',
            addExtral:0.00,
          }
        },
        created(){
          document.title="个人信息"
          this.userId=localStorage.name
          this.$http.post('/api/user/selectUserInfo',{
            userId: this.userId
          },{})
            .then(function(ret) {
              this.userInfo = ret.data[0];
            })
        },
        methods:{
          addMoney(){
            this.userInfo.extral=parseFloat(this.userInfo.extral)+parseFloat(this.addExtral)
            console.log(parseFloat(this.userInfo.extral))
            $('#moneyModal').modal('hide')
            this.$http.post('/api/user/updateExtral',{
            userId: this.userInfo.userId,
            extral: this.userInfo.extral
            },{})
            .then(function(ret) {
              console.log(ret.data)
            })
          },
          updateUser(){
            $('#updateModal').modal('hide')
            this.$http.post('/api/user/updateUser',{
            userId: this.userInfo.userId,
            address: this.userInfo.address,
            password: this.userInfo.password,
            name: this.userInfo.name
            },{})
            .then(function(ret) {
              console.log(ret.data)
            })
            .then(function(err) {
              console.log(err);
            })
          }
        }
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
