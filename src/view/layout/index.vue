<template>
  <div>
    <!-- navbar -->
    <van-nav-bar fixed :title="activeTitle" />
    <!-- 首页和搜索路由 -->
    <div class="main">
    <router-view></router-view>
  </div>


  <!-- tabbar -->
    <van-tabbar  route>
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/layout/search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data(){
    return{
      activeTitle: this.$route.meta.title
    }
  }
  ,
    watch:{
      // 监听路由组件变化
        $route(){
          this.activeTitle = this.$route.meta.title
          // $route为当前路由对象
        }
    }
}
</script>

<style scoped>
  .main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>