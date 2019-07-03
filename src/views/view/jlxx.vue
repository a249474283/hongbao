<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui">
      <span>
        奖励信息
      </span>
    </div>
    <div class="neirong" v-html="content">

    </div>
  </div>
</template>
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
          id:36
        }
      }).then(function(res){
        console.log(res)
        _this.content = res.data.data.content;
      })
    }
  }
}
</script>
<style>
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
  }
  .header span{
    display: block;
    width: 3rem;
    height: 0.3rem;
    font-size: 0.3rem;
    margin-top: 0.25rem;
    margin-left: 2.8rem;
    float: left;
    color: #040404;
  }
  .neirong{

    width: 86%;
    position: relative;
    top: 0.9rem;
    margin: 0 auto;
    line-height: 0.25rem;
  }
  .neirong img{
    display: block;
    width: 86%;
    margin: 0 auto;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
