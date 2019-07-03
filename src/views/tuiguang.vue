<template>
  <div class="app">
    <h1 class="bta">推广</h1>
    <div class="tg">
      <div class="tgl" @click="ewm">
        <img src="../assets/tgewm.png">
        <p>推广二维码</p>
      </div>
      <div class="tgl" @click="tglb">
        <img src="../assets/tuiguanglb.png">
        <p>推广列表</p>
      </div>
    </div>
    <div class="yj">
      <div class="yjl" @click="yjlb">
        <img src="../assets/yj.png" >
        <p>佣金列表</p>
      </div>
      <div class="yjl" @click="yjphb">
        <img src="../assets/yjph.png">
        <p>佣金排行榜</p>
      </div>
    </div>
    <div class="jl">
      <div class="jll" @click="jlsm">
        <img src="../assets/jl.png">
        <p>奖励说明</p>
      </div>
    </div>
  </div>
</template>
<script>
  const axios = require('axios');
  import { Url } from "../utils/config";
export default {
  data(){
    return{

    }
  },
  methods:{
    fanhui:function(){
        this.$router.back(-1);
    },
    ewm:function(){
      this.$router.push({
        path:"/tgewm"
      })
    },
    tglb:function(){
      this.$router.push({
        path:"/tglb"
      })
    },
    yjlb:function(){
      this.$router.push({
        path:"/yjlb"
      })
    },
    yjphb:function(){
      this.$router.push({
        path:"/yjphb"
      })
    },
    jlsm:function(){
      this.$router.push({
        path:"/jlxx"
      })
    }
  }
}
</script>
<style scoped>
  .bta{
      width: 100%;
      height: 0.87rem;
      text-align: center; 
      line-height: 0.87rem;
      font-size: 0.3rem;
      background: #fff;
      margin-bottom: 0.4rem;
    }
  .tg{
    width: 100%;
    height: 1.82rem;
    background: #fff;
    margin-top: 0.4rem;
    padding-left: 0.57rem;
  }
  .tg .tgl{
    width: 100%;
    height: 0.9rem;
    color: #333333;
    font-size: 0.28rem;
  }
  .tg .tgl img{
    display: block;
    width: 0.29rem;
    height: 0.29rem;
    float: left;
    margin-top: 0.3rem;
  }
  .tg .tgl p{
    width: 6.5rem;
    height: 0.94rem;
    line-height: 0.9rem;
    margin-left: 0.6rem;
    border-bottom: 1px solid #f7f7f7;
  }
  .yj{
    width: 100%;
    height: 1.82rem;
    background: #fff;
    margin-top: 0.4rem;
    padding-left: 0.57rem;
  }
  .yj .yjl{
    width: 100%;
    height: 0.9rem;
    color: #333333;
    font-size: 0.28rem;
  }
  .yj .yjl img{
    display: block;
    width: 0.29rem;
    height: 0.29rem;
    float: left;
    margin-top: 0.3rem;
  }
  .yj .yjl p{
    width: 6.5rem;
    height: 0.94rem;
    line-height: 0.9rem;
    margin-left: 0.6rem;
    border-bottom: 1px solid #f7f7f7;
  }
  .jl{
    width: 100%;
    height: 0.96rem;
    background: #fff;
    margin-top: 0.4rem;
    padding-left: 0.57rem;
  }
   .jl .jll{
    width: 100%;
    height: 0.9rem;
    color: #333333;
    font-size: 0.28rem;
  }
  .jl .jll img{
    display: block;
    width: 0.29rem;
    height: 0.29rem;
    float: left;
    margin-top: 0.3rem;
  }
  .jl .jll p{
    width: 6.5rem;
    height: 0.96rem;
    line-height: 0.96rem;
    margin-left: 0.6rem;
    border-bottom: 2px solid #f7f7f7;
  }
</style>
