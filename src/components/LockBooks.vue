<template>
  <div class="container">
    <div class="col-sm-12">
      <div>
        <i class="glyphicon glyphicon-list-alt"></i>
        缺书列表
        </div>
      <hr>
      <div>
        <p v-if="!books.length"><strong>还没有任何书籍</strong></p>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>书号</th>
              <th>书名</th>
              <th>出版社</th>
              <th>供应商</th>
              <th>存货</th>
              <th>日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book,index) in books">
              <td>{{book.bookId}}</td>
              <td>{{book.bookName}}</td>
              <td>{{book.publisher}}</td>
              <td>{{book.supplier}}</td>
              <td>{{book.inventory}}</td>
              <td>{{book.date}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-sm-12">
      <div>
        <i class="glyphicon glyphicon-list-alt"></i>
        采购单
        </div>
      <hr>
      <div>
        <p v-if="!books.length"><strong>还没有任何书籍</strong></p>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>书号</th>
              <th>书名</th>
              <th>出版社</th>
              <th>供应商</th>
              <th>存货</th>
              <th>最少进货</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book,index) in books">
              <td>{{book.bookId}}</td>
              <td>{{book.bookName}}</td>
              <td>{{book.publisher}}</td>
              <td>{{book.supplier}}</td>
              <td>{{book.inventory}}</td>
              <td>{{20-book.inventory}}</td>
              <td><button class="btn btn-success" data-toggle="modal" data-target="#updateModal" @click="chooseBook(book)">进货</button></td>
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
            <h4 class="modal-title" id="myModalLabel">进货单</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputPassword1">进货数量</label>
              <input type="text" class="form-control"  placeholder="inventory" v-model="addBook">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateBook()">确认修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name : 'CommonBooks',
      data(){
        return {
          books:[],
          selectedBook:[],
          addBook:0,
        }
      },
      created(){
        this.$http.get('/api/lockbooks/lockBookList')
          .then(function(ret) {
            this.books = ret.data;
            console.log(ret.data)
            for(var k=0;k<this.books.length;k++){
              let newDate = new Date(this.books[k].date)
              newDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
              this.books[k].date=newDate
            }
          })
          .then(function(err) {
            console.log(err);
          })
      },
      methods:{
        chooseBook(book){
          this.selectedBook = book
          //this.removeByValue(this.books,this.selectedBook)
        },
        updateBook(){
          this.selectedBook.inventory=parseInt(this.selectedBook.inventory)+parseInt(this.addBook)
          $('#updateModal').modal('hide')
          this.$http.post('/api/lockbooks/updateInventory',{
          inventory: this.selectedBook.inventory,
          bookName: this.selectedBook.bookName
          },{})
          .then(function(ret) {
            console.log(ret.data)
            this.removeByValue(this.books,this.selectedBook)
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
        }
      }
    }
</script>
<style>
