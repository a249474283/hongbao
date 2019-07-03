<template>
  <div id="app">

   <router-view />

<van-tabbar route v-if="headerShow">
  <van-tabbar-item
    replace
    to="/index"
    icon="home-o"
    active-color="#07c160"
    inactive-color="#000"
  >
    首页
  </van-tabbar-item>
  <van-tabbar-item
    replace
    to="/game"
    icon="gold-coin-o"
  >
    游戏
  </van-tabbar-item>
  <van-tabbar-item
    replace
    to="/tuiguang"
    icon="share"
  >
    推广
  </van-tabbar-item>
  <van-tabbar-item
    replace
    to="/wd"
    icon="manager"
  >
    我的
  </van-tabbar-item>
</van-tabbar>   


</div>

</template>

<script>
export default {
  
name: "app",
  data() {
    return {
      headerShow: false,
    };
  },
  mounted(){
   
  },
  methods:{

  },
  watch: {
    $route(to, from) {

      // if (this.$route.path === "/index" || this.$route.path === "/tuiguang"||this.$route.path === "/tx"||this.$route.path === "/setup"||this.$route.path === "/information"||this.$route.path === "/yemx"||this.$route.path === "/game"||this.$route.path === "/xxzx"||this.$route.path === "/wd") {
      //   this.headerShow = true;
      // }else{
      //   this.headerShow = false;
      // }
      if (this.$route.path === "/index" || this.$route.path === "/tuiguang"||this.$route.path === "/game"||this.$route.path === "/wd") {
        this.headerShow = true;
      }else{
        this.headerShow = false;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;


}
 html{
  width: 100%;
  background-color: #f7f7f7;
}
*{
  margin: 0;
  padding:  0;
}
.app{
  width: 100%;
  overflow: hidden;
  height: 100%;
}

</style>
