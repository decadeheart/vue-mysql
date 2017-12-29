<template>
  <div class="container">
    <div class="col-sm-12">
      <div>
        <i class="glyphicon glyphicon-list-alt"></i>
        书籍列表
        </div>
        <button class="btn btn-primary" @click="addLock()">生成缺书列表</button>
      <hr>
      <div>
        <p v-if="!books.length"><strong>还没有任何书籍</strong></p>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>书号</th>
              <th>书名</th>
              <th>作者</th>
              <th>出版社</th>
              <th>价格</th>
              <th>关键词</th>
              <th>供应商</th>
              <th>存货</th>
              <th>链接</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book,index) in books">
              <td>{{book.bookId}}</td>
              <td>{{book.bookName}}</td>
              <td>{{book.author}}</td>
              <td>{{book.publisher}}</td>
              <td>{{book.price}}</td>
              <td>{{book.keyword}}</td>
              <td>{{book.supplier}}</td>
              <td>{{book.inventory}}</td>
              <td>{{book.url}}</td>
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
            <div class="form-group">
              <label for="exampleInputPassword1">链接</label>
              <input type="text" class="form-control"  placeholder="url" v-model="selectedBook.url">
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
        this.$http.get('/api/book/bookList')
          .then(function(ret) {
            this.books = ret.data;
            console.log(ret.data)
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
          bookName: this.selectedBook.bookName,
          url: this.selectedBook.url,
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
        },
        addLock(){
          let self = this
          console.log(1)
          for(var i =0 ;i<self.books.length;i++){
            if(self.books[i].inventory<20){
                let lockbook=self.books[i]
                console.log(lockbook)
                self.$http.post('/api/lockbooks/addLock',{
                bookId:lockbook.bookId,
                bookName:lockbook.bookName,
                publisher:lockbook.publisher,
                supplier:lockbook.supplier,
                inventory:lockbook.inventory
              })
              .then(function(ret){
                console.log(ret)
                if(ret.data==-1){
                  alert('请勿重复添加！')
                }else{
                  alert('添加成功')
                }
              })
            }
          }
          location.href="/#/books/lockBooks"
        }
      }
    }
</script>
<style>
