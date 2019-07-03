<template>
<div class="app">
  <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui">
        <span>
          我的收款号
        </span>
    </div>
  <div :id="item.id" :class="a+item.bank_id" v-for="(item,key) of list" :key="key" >
    <div class="yh">
      <img :src="url+item.bank_logo" alt="">
      <span>{{item.bank_name}}</span>
    </div>
    <ul class="kh">
      <li>****</li>
      <li>****</li>
      <li>****</li>
      <li>{{item.card_number}}</li>
    </ul>
  </div>
  <div class="floot" @click="tj">+添加银行卡</div> 
</div>
</template>
<script>
  const axios = require("axios");
  import { Url } from "../../utils/config"
export default {
  mounted:function(){
    this.getlist(); 
  },
  data(){
    return{
      url:Url,
      list:[],
      a:"a"
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    getlist:function(){
      var id = localStorage.getItem("Id");
      var _this = this;
      axios({
        method:"post",
        url:Url+"/apis/user/getBankcardList",
        data:{
          user_id: id,
          start: 1,
          page_size: 10
        }
      }).then(function(res){
        if(res.data.code == 1){
          _this.list = res.data.data;
         
          for(let i = 0;i < _this.list.length;i++){
            _this.list[i].card_number = _this.list[i].card_number.substr(-4);
          }
          console.log(_this.list)
        }else{
          _this.$dialog.alert({
            message: res.data.msg
          });
        }
      })
    },
    //按钮事件
    tj:function(){
      this.$router.push({
        path:"/tjyhk"
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
    margin-left: 2.3rem;
    float: left;
    color: #040404;
  }
  /* a2 中国银行  a1 中国建设*/
  .a2{
    width: 6.45rem;
    height: 1.99rem;
    margin:0 auto;
    background-image: url(../../assets/nongye.png);
    position: relative;
    top:0.3rem;
    margin-bottom: 0.48rem;
    border-radius: 0.2rem;
  }
.a1{
    width: 6.45rem;
    height: 1.99rem;
    margin:0 auto;
    background-image: url(../../assets/jianshe.png);
    position: relative;
    top:0.3rem;
    margin-bottom: 0.48rem;
    border-radius: 0.2rem;
  }
  .yh img{
    display: block;
    width: 0.58rem;
    height: 0.58rem;
    float: left;
    position: relative;
    left: 0.64rem;
    top: 0.42rem;
  }
  .yh span{
    font-size: 0.32rem;
    color: #fff;
    position: relative;
    left: 0.83rem;
    bottom: 0.1rem;
  }
  .kh{
    height: 0.5rem;
    position: relative;
    top: 0.3rem;
  }
  .kh li{
    float: left;
    width: 1.05rem;
    font-size: 0.46rem;
    color: #fff;
    line-height: 0.46rem;
    margin: 0.15rem;
    position: relative;
    bottom: 0.35rem;
    left: 1rem;
  }
  .floot{
    width: 100%;
    height: 0.96rem;
    background: #fff;
    font-size: 0.28rem;
    line-height: 0.96rem;
    text-align: center;
    color: #08C161;
    position:fixed;
    bottom: 0rem;
  }
</style>
