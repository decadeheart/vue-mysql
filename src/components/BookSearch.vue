<template>
  <div class="container">
    <div class="col-sm-12">
      <div>
        <i class="glyphicon glyphicon-list-alt"></i>
        搜索结果
        <span class="pull-right">关键字:{{factor}}</span>
        </div>
      <hr>
      <div>
        <p v-if="!books.length"><strong>没有搜到任何书籍，请切换关键词</strong></p>
        <div class="list-group">
          <a class="list-group-item" v-for="(book,index) in books" data-toggle="modal" href="#shopModal" @click="chooseBook(book)">
            <div class="row">
              <div class="col-sm-3 user-details">
                <img :src="book.url" class="avatar img-responsive" />
              </div>
              <div class="col-sm-3 text-center">
                <h5 class="list-group-item-text total-time">
                  <i class="glyphicon glyphicon-book"></i>
                  {{ book.bookName }}
                </h5>
                <p class="label label-primary text-center">
                  <i class="glyphicon glyphicon-user"></i>
                  {{ book.author }}
                </p>
                <h1>￥{{book.price}}</h1>
              </div>

              <div class="col-sm-3">
                <h5>{{ book.keyword }}</h5>
              </div>
              <div class="col-sm-3">
                <h5>库存：{{book.inventory}}</h5>
              </div>
            </div>
          </a>

        </div>
            <div class="modal fade" id="shopModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                  </button>
                  <h4 class="modal-title" id="myModalLabel">购买书籍</h4>
                </div>
                <div class="modal-body">
                  <div class="col-sm-12 user-details">
                    <img :src="selectedBook.url" class="avatar img-responsive" />
                  </div>
                  <div class="col-sm-12 text-center">
                    <h5 class="list-group-item-text total-time">
                      <i class="glyphicon glyphicon-book"></i>
                      {{ selectedBook.bookName }}
                    </h5>
                    <p class="label label-primary text-center">
                      <i class="glyphicon glyphicon-user"></i>
                      {{ selectedBook.author }}
                    </p>
                    <h5>{{ selectedBook.keyword }}</h5>
                    <h5>库存：{{selectedBook.inventory}}</h5>
                    <h1>￥{{selectedBook.price}}</h1>
                  </div>
                  <div class="col-sm-12">
                    <div class="input-group col-sm-12">
                      <span class="input-group-addon" id="basic-addon3">收货地址</span>
                      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model='address'>
                    </div>
                    <div class="input-group col-sm-12">
                      <span class="input-group-addon" id="basic-addon3">备注信息</span>
                      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="situation">
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="input-group col-sm-4">
                      <span class="input-group-addon">购买数量</span>
                      <input type="text" class="form-control" v-model="orderNum">
                      <span class="input-group-addon">本</span>
                    </div>
                    <div class="col-sm-12 user-details" col-sm-4>
                      <h5>总金额:{{money}}元</h5>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" @click="addOrder()">购买</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name : 'BookSearch',
      data(){
        return {
          books:[],
          selectedBook:[],
          orderNum:0,
          money:0,
          address:'',
          situation:'',
          userId:'',
          factor:'',
        }
      },
      created(){
      let str=location.href
      str=str.match(/\?(\S*)/)[1]
      str=str.split('=')
      this.factor=str[1]
      this.factor=decodeURIComponent(this.factor)
      console.log(this.factor)
      this.$http.post('/api/book/bookSearch',{
        factor:this.factor
      })
        .then(function(ret) {
          this.books = ret.data;
          console.log(ret.data)
        })
        .then(function(err) {
          console.log(err);
        })
      },
      watch:{
        orderNum(curVal,oldVal){
          this.money=curVal*this.selectedBook.price
          if(curVal>this.selectedBook.inventory){
            alert('请不要超出库存！')
            curVal=0
            this.money=curVal*this.selectedBook.price
          }
        },
      },
      methods:{
        chooseBook(book){
          this.selectedBook = book
        },
        addOrder(){
          let self = this
          this.userId=localStorage.name
          this.orderNum=parseInt(this.orderNum)
          var myDate=new Date()
          var orderTime=myDate.getTime()
          this.orderId=this.selectedBook.bookId+orderTime
          self.selectedBook.inventory=parseInt(self.selectedBook.inventory)-this.orderNum
          console.log(self.selectedBook.inventory)
          console.log(this.orderId)
          $('#shopModal').modal('hide')
          if(this.money==0){
            alert('请添加商品后购买！')
          }else{
            self.$http.post('/api/order/addOrder',{
              orderId:self.orderId,
              userId:self.userId,
              bookName:self.selectedBook.bookName,
              orderNum:self.orderNum,
              money:self.money,
              address:self.address,
              situation:self.situation,
              inventory:self.selectedBook.inventory,
            }).then(function(ret){
              console.log(ret);
              alert('购买成功')
            })
          }
        }
      }
    }
</script>
<style>
