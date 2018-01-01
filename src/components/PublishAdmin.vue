
<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      录入供应商
    </div>
    <div class="panel-body">
      <div class="form-horizontal">
        <div class="form-group">
          <div class="col-sm-12">
            <label>供应商名</label>
            <input
              type="text"
              class="form-control"
              v-model="book.publisherName"
              placeholder="publisherName"
            />
          </div>
          <div class="col-sm-12">
            <label>供应书籍</label>
            <input
              type="text"
              class="form-control"
              v-model="book.publishMessage"
              placeholder="publishMessage"
            />
          </div>
          <div class="col-sm-12">
            <label>可提供书籍</label>
            <input
              type="text"
              class="form-control"
              v-model="book.publishBooks"
              placeholder="publishBooks"
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
        name : 'PublishAdmin',
        data() {
            return {
              book:{
                publisherName:'',
                publishMessage : '',
                publishBooks: '',
              }
            }
        },
        methods:{
          save() {
            this.$http.post('/api/publish/addPublish',{
              publisherName : this.book.publisherName,
              publishMessage : this.book.publishMessage,
              publishBooks : this.book.publishBooks,
            }).then(function(ret){
              console.log(ret);
              let book = this.book
              console.log(book);
              location.href="/#/publisherlist"
            })
          }
        }
    }
</script>
