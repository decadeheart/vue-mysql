<template>
  <div class="container">
    <div class="col-sm-12">
      <div>
        <i class="glyphicon glyphicon-list-alt"></i>
        供应商列表
        </div>
      <hr>
      <div>
        <p v-if="!publishers.length"><strong>还没有任何供应商</strong></p>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>供应商名</th>
              <th>供货信息</th>
              <th>可提供书籍</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(publisher,index) in publishers">
              <td>{{publisher.publisherName}}</td>
              <td>{{publisher.publishMessage}}</td>
              <td>{{publisher.publishBooks}}</td>
              <td><button class="btn btn-warning" data-toggle="modal" data-target="#updateModal" @click="choosePublisher(publisher)">更新</button><button class="btn btn-danger" @click="deletePublisher(publisher)">删除</button></td>
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
              <label for="exampleInputEmail1">供货名</label>
              <input type="text" class="form-control"  placeholder="name" v-model="selectedPublisher.publishMessage">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">可提供</label>
              <input type="text" class="form-control"  placeholder="name" v-model="selectedPublisher.publishBooks">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updatePublisher()">确认修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name : 'PublishList',
      data(){
        return {
          publishers:[],
          selectedPublisher:[],
        }
      },
      created(){
        this.$http.get('/api/publish/publishList')
          .then(function(ret) {
            this.publishers = ret.data;
            console.log(ret.data)
          })
          .then(function(err) {
            console.log(err);
          })
      },
      methods:{
        choosePublisher(publisher){
          this.selectedPublisher= publisher
        },
        updatePublisher(){
          $('#updateModal').modal('hide')
          this.$http.post('/api/publish/updatePublish',{
          publisherName: this.selectedPublisher.publisherName,
          publishMessage: this.selectedPublisher.publishMessage,
          publishBooks: this.selectedPublisher.publishBooks,
          },{})
          .then(function(ret) {
            console.log(ret.data)
          })
          .then(function(err) {
            console.log(err);
          })
        },
        deletePublisher(publisher){
          console.log(publisher.publisherName)
          this.removeByValue(this.publishers,publisher)
          this.$http.post('/api/publisher/deletePublisher',{
          publisherName: publisher.publisherName
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
