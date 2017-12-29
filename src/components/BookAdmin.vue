
<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      录入书籍
    </div>
    <div class="panel-body">
      <div class="form-horizontal">
        <div class="form-group">
          <div class="col-sm-12">
            <label>书籍号码</label>
            <input
              type="text"
              class="form-control"
              v-model="book.bookId"
              placeholder="bookId"
            />
          </div>
          <div class="col-sm-12">
            <label>书籍名称</label>
            <input
              type="text"
              class="form-control"
              v-model="book.bookName"
              placeholder="bookName"
            />
          </div>
          <div class="col-sm-12">
            <label>编写作者</label>
            <input
              type="text"
              class="form-control"
              v-model="book.author"
              placeholder="author"
            />
          </div>
          <div class="col-sm-12">
            <label>出版社</label>
            <input
              type="text"
              class="form-control"
              v-model="book.publisher"
              placeholder="publisher"
            />
          </div>
          <div class="col-sm-12">
            <label>价格</label>
            <input
              type="text"
              class="form-control"
              v-model="book.price"
              placeholder="price"
            />
          </div>
          <div class="col-sm-12">
            <label>关键字</label>
            <input
              type="text"
              class="form-control"
              v-model="book.keyword"
              placeholder="keyword"
            />
          </div>
          <div class="col-sm-12">
            <label>供货商</label>
            <input
              type="text"
              class="form-control"
              v-model="book.supplier"
              placeholder="supplier"
            />
          </div>
          <div class="col-sm-12">
            <label>存货量</label>
            <input
              type="text"
              class="form-control"
              v-model="book.inventory"
              placeholder="inventory"
            />
          </div>
          <div class="col-sm-12">
            <label>链接</label>
            <input
              type="text"
              class="form-control"
              v-model="book.url"
              placeholder="url"
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
                bookId:'',
                bookName : '',
                author : '',
                publisher : '',
                price : '',
                keyword : '',
                supplier : '',
                inventory : '',
                url:'',
              }
            }
        },
        methods:{
          save() {
            this.$http.post('/api/book/addBook',{
              bookId : this.book.bookId,
              bookName : this.book.bookName,
              author : this.book.author,
              publisher : this.book.publisher,
              price : this.book.price,
              keyword : this.book.keyword,
              supplier : this.book.supplier,
              inventory : this.book.inventory,
              url: this.book.url,
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
