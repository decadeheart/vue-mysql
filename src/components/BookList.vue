<template>
  <div class="container">
    <div>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/books/commonBooks" class="nav-link active">书籍列表</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/books/lockBooks" class="nav-link">缺书列表</router-link>
        </li>
      </ul>
    </div>
    <hr>
    <router-view></router-view>
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
          }
        },
        created(){
          document.title="书籍列表"
        },
        methods:{
        }
    }
</script>
<style>

</style>
