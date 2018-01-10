<template>
  <div class="container">
    <div class="col-sm-12">
      <div>
          <div class="form-group form-inline ">
            <i class="glyphicon glyphicon-list-alt"></i>
            订单列表
              <div class="input-group">
                <div class="input-group-addon">搜索</div>
                <input type="text" class="form-control" id="exampleInputAmount" v-model="factor">
              </div>
            <button type="submit" class="btn btn-primary" @click="searchOrder()">search</button>
            </div>
        </div>

      <hr>
      <div>
        <p v-if="!orders.length"><strong>订单</strong></p>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>订单号</th>
              <th>用户Id</th>
              <th>书名</th>
              <th>书籍数量</th>
              <th>金额</th>
              <th>收货地址</th>
              <th>备注</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order,index) in orders">
              <td>{{order.orderId}}</td>
              <td>{{order.userId}}</td>
              <td>{{order.bookName}}</td>
              <td>{{order.orderNum}}</td>
              <td>{{order.money}}</td>
              <td>{{order.address}}</td>
              <td>{{order.situation}}</td>
              <td v-if="!order.status">未完成</td>
              <td v-if="order.status">已完成</td>
              <td>
                <button class="btn btn-warning" data-toggle="modal" data-target="#updateModal" @click="chooseOrder(order)">更新</button>
                <button class="btn btn-danger" @click="deleteOrder(order)">删除</button>
                <button class="btn btn-success" data-toggle="modal" data-target="#finishModal" @click="chooseOrder(order)" v-if="!order.status">完成订单</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-sm-12" v-if="searchOrders.length">
      <div>
        <i class="glyphicon glyphicon-list-alt"></i>
          搜索结果
        <span class="pull-right">关键字:{{factor}}</span>
        </div>
      <hr>
      <div>
        <p v-if="!orders.length"><strong>订单</strong></p>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>订单号</th>
              <th>用户Id</th>
              <th>书名</th>
              <th>书籍数量</th>
              <th>金额</th>
              <th>收货地址</th>
              <th>备注</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order,index) in searchOrders">
              <td>{{order.orderId}}</td>
              <td>{{order.userId}}</td>
              <td>{{order.bookName}}</td>
              <td>{{order.orderNum}}</td>
              <td>{{order.money}}</td>
              <td>{{order.address}}</td>
              <td>{{order.situation}}</td>
              <td v-if="!order.status">未完成</td>
              <td v-if="order.status">已完成</td>
              <td>
                <button class="btn btn-warning" data-toggle="modal" data-target="#updateModal" @click="chooseOrder(order)">更新</button>
                <button class="btn btn-danger" @click="deleteOrder(order)">删除</button>
                <button class="btn btn-success" data-toggle="modal" data-target="#finishModal" @click="chooseOrder(order)" v-if="!order.status">完成订单</button>
              </td>
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
            <h4 class="modal-title" id="myModalLabel">修改订单</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputEmail1">订单号</label>
              <input type="text" class="form-control"  placeholder="name" v-model="selectedOrder.orderId">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">用户ID</label>
              <input type="text" class="form-control"  placeholder="address" v-model="selectedOrder.userId">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">书名</label>
              <input type="text" class="form-control"  placeholder="publisher" v-model="selectedOrder.bookName">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">地址</label>
              <input type="text" class="form-control"  placeholder="price" v-model="selectedOrder.address">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">备注</label>
              <input type="text" class="form-control"  placeholder="price" v-model="selectedOrder.situation">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">书籍数量</label>
              <input type="text" class="form-control"  placeholder="price" v-model="selectedOrder.orderName">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">金额</label>
              <input type="text" class="form-control"  placeholder="price" v-model="selectedOrder.money">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateOrder()">确认修改</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="finishModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <div class="modal-body">
            <div class="col-sm-12">
              <h5>订单:{{selectedOrder.orderId}}</h5>
            </div>
            <div class="col-sm-12">
              <h5 class="list-group-item-text total-time">
                <i class="glyphicon glyphicon-book"></i>
                {{ selectedOrder.bookName }}
              </h5>
            </div>
            <div class="col-sm-12">
              <h5>数量:{{ selectedOrder.orderNum }}</h5>
            </div>
            <div class="col-sm-12">
              <h5>金额:{{selectedOrder.money}}</h5>
            </div>
            <div class="col-sm-12">
              <h5>等级:{{user.level}}</h5>
            </div>
            <div class="col-sm-12">
              <h5>最终:{{finnalMoney}}</h5>
            </div>
          </div>
          <div class="modal-body">
            .
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="finishOrder()">确定完成</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name : 'OrderList',
      data(){
        return {
          orders:[],
          selectedOrder:[],
          searchOrders:[],
          user:[],
          finnalMoney:'',
          factor:'',
        }
      },
      created(){
        document.title="订单列表"
        if(localStorage.name){
          this.$http.post('/api/user/selectUserInfo',{
            userId:localStorage.name
          })
          .then(function(ret){
            this.user=ret.data[0]
            console.log(ret.data)
          })
          .then(function(err){
            console.log(err);
          })
        }else{
          alert('需要登录!')
        }
        this.$http.get('/api/order/orderList')
          .then(function(ret) {
            this.orders = ret.data;
            console.log(ret.data)
          })
          .then(function(err) {
            console.log(err);
          })
      },
      methods:{
        searchOrder(){
          this.$http.post('/api/order/searchOrder',{
            factor:this.factor
          })
            .then(function(ret){
              if(ret.data==-1){
                alert('没有搜索到')
              }else{
                this.searchOrders=ret.data
              }
            })
        },
        chooseOrder(order){
          this.selectedOrder = order
          if(this.user.level==1){this.finnalMoney=parseFloat(this.selectedOrder.money)}
          if(this.user.level==2){this.finnalMoney=parseFloat(this.selectedOrder.money)*0.9}
          if(this.user.level==2||this.user.level==3){this.finnalMoney=parseFloat(this.selectedOrder.money)*0.85}
          if(this.user.level==4){this.finnalMoney=parseFloat(this.selectedOrder.money)*0.8}
          if(this.user.level==5){this.finnalMoney=parseFloat(this.selectedOrder.money)*0.75}
          this.finnalMoney=this.finnalMoney.toFixed(2)
        },
        updateOrder(){
          $('#updateModal').modal('hide')
          this.$http.post('/api/order/orderUpdate',{
          name: this.selectedOrder.name,
          address: this.selectedOrder.address,
          extral: this.selectedOrder.extral,
          level: this.selectedOrder.level,
          userId: this.selectedOrder.userId
          },{})
          .then(function(ret) {
            console.log(ret.data)
          })
          .then(function(err) {
            console.log(err);
          })
        },
        deleteOrder(order){
          console.log(order.name)
          this.removeByValue(this.orders,order)
          this.$http.post('/api/order/deleteorder',{
          orderId: order.orderId
          },{})
          .then(function(ret) {
            console.log(ret.data)
          })
          .then(function(err) {
            console.log(err);
          })
        },
        finishOrder(){
          this.user.extral=this.user.extral-this.finnalMoney
          this.$http.post('/api/user/updateExtral',{
            userId:localStorage.name,
            extral:this.user.extral
          })
          .then(function(ret){
            console.log(ret)
          })
          .then(function(err){
            console.log(err)
          })
          this.$http.post('/api/order/changeStatus',{
            orderId:this.selectedOrder.orderId
          })
          .then(function(ret){
            console.log(ret)
            this.selectedOrder.status=1
            $('#finishModal').modal('hide')
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
