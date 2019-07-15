<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui">
      <span>
        群游戏规则
      </span>
    </div>
    <div class="neirongh" v-html="content">

    </div>
  </div>
</template>
<style>
.neirongh{
    width: 86%;
    margin: 0 auto;
    line-height: 0.25rem;
    position: relative;
    top: 1rem;
  }
  .neirongh img{
    display: block;
    width: 86%;
    margin: 0 auto;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>

<script>
  const axios = require('axios');
  import { Url } from "../../utils/config";
export default {
  mounted:function(){
    this.getyxgz();
  },
  data(){
    return{
      content:""
    }
  },
  methods:{
     fanhui:function(){
      this.$router.back(-1);
    },
    getyxgz:function(){
      var _this = this;
      axios({
        method:"post",
        url:Url+"/apis/article/getArticleDetails",
        params:{
          id:37
        }
      }).then(function(res){
        console.log(res)
        _this.content = res.data.data.content;
      })
    }
  }
}
</script>
<style scoped>
  .header{
    width:100%;
    height: 0.87rem;
    background-color: #fff;
    position: relative;
    z-index: 4;
    margin-bottom: 0.29rem;
    position: fixed;
    top: 0;
  }
 .header img{
      display: block;
      width: 0.2rem;
      height: 0.34rem;
      margin: 0.25rem 0 0 0.5rem;
      float: left; 
      z-index: 10;
      position: absolute;
    }
    .header span{
      display: block;
      width: 100%;
      font-size: 0.3rem;
      line-height: 0.87rem;
      text-align: center;
      color: #040404;
      position: absolute;
    }
  
</style>
