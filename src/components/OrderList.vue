<template>
  <div class="container">
    <div class="col-sm-12">
      <div>
        <i class="glyphicon glyphicon-list-alt"></i>
        订单列表
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
              <td><button class="btn btn-warning" data-toggle="modal" data-target="#updateModal" @click="chooseOrder(order)">更新</button><button class="btn btn-danger" @click="deleteOrder(order)">删除</button></td>
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
  </div>
</template>

<script>
  export default {
      name : 'OrderList',
      data(){
        return {
          orders:[],
          selectedOrder:[],
        }
      },
      created(){
        document.title="用户列表"
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
        chooseOrder(order){
          this.selectedOrder = order
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
