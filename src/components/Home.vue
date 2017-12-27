<template>
  <div>
      <div class="col-sm-9">
        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
          </ol>

          <!-- Wrapper for slides -->
          <div class="carousel-inner" role="listbox">
            <div class="item active">
              <img src="http://res.cloudinary.com/dyb29pfpm/image/upload/v1507608949/1507513417919_h1vcov.jpg" alt="#">
              <div class="carousel-caption">
                1
              </div>
            </div>
            <div class="item">
              <img src="http://res.cloudinary.com/dyb29pfpm/image/upload/v1507608948/1507514383114_ksq1ib.jpg" alt="#">
              <div class="carousel-caption">
                2
              </div>
            </div>
            <div class="item">
              <img src="http://res.cloudinary.com/dyb29pfpm/image/upload/v1507608944/1507514233895_bv935a.jpg" alt="#">
              <div class="carousel-caption">
                2
              </div>
            </div>
          </div>

          <!-- Controls -->
          <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="col-sm-3">
        <sidebar></sidebar>
      </div>
  </div>
</template>
<script>
import Sidebar from "./Sidebar.vue"
export default {
  components:{
    'sidebar': Sidebar,
  },
}
</script>

