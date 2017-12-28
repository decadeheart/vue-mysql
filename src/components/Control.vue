<template>
  <div>
    <div class="col-sm-3">
      <ul class="nav nav-pills nav-stacked">
        <li role="presentation" class="active"><router-link to="/control/bookAdmin">录入书籍</router-link></li>
        <li role="presentation"><router-link to="/books">书籍表</router-link></li>
        <li role="presentation"><router-link to="/control/VedioAdmin">录入视频</router-link></li>
        <li role="presentation"><router-link to="/userlist">用户表</router-link></li>
      </ul>
    </div>
    <div class="col-sm-9">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name:'Control',
  created(){
    document.title="控制台";
  }
}
</script>

