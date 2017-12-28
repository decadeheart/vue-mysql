<template>
  <div class="container">
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
              <th>日期</th>
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
              <td>{{book.date}}</td>
              <td><button class="btn btn-warning" data-toggle="modal" data-target="#updateModal" @click="chooseBook(book)">更新</button><button class="btn btn-danger" @click="deleteBook(book)">删除</button></td>
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
              <label for="exampleInputEmail1">书号</label>
              <input type="text" class="form-control"  placeholder="bookId" v-model="selectedBook.bookId">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">书名</label>
              <input type="text" class="form-control"  placeholder="name" v-model="selectedBook.bookName">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">作者</label>
              <input type="text" class="form-control"  placeholder="author" v-model="selectedBook.author">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">出版社</label>
              <input type="text" class="form-control"  placeholder="publisher" v-model="selectedBook.publisher">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">价格</label>
              <input type="text" class="form-control"  placeholder="price" v-model="selectedBook.price">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">关键</label>
              <input type="text" class="form-control"  placeholder="keyword" v-model="selectedBook.keyword">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">供应商</label>
              <input type="text" class="form-control"  placeholder="supplier" v-model="selectedBook.supplier">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">存货</label>
              <input type="text" class="form-control"  placeholder="inventory" v-model="selectedBook.inventory">
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
        },
        updateBook(){
          $('#updateModal').modal('hide')
          this.$http.post('/api/book/updateBook',{
          bookId: this.selectedBook.bookId,
          author: this.selectedBook.author,
          keyword: this.selectedBook.keyword,
          price: this.selectedBook.price,
          inventory: this.selectedBook.inventory,
          publisher: this.selectedBook.publisher,
          supplier: this.selectedBook.supplier,
          bookName: this.selectedBook.bookName
          },{})
          .then(function(ret) {
            console.log(ret.data)
          })
          .then(function(err) {
            console.log(err);
          })
        },
        deleteBook(book){
          console.log(book.bookName)
          this.removeByValue(this.books,book)
          this.$http.post('/api/book/deleteBook',{
          bookName: book.bookName
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
        }
      }
    }
</script>
<style>
