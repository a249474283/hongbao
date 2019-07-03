<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui" >
      <span>
        佣金排行榜
      </span>
    </div>    
    <div class="zhanwei"></div>
    <ul class="th">
      <li>排名</li>
      <li>ID</li>
      <li>佣金(元)</li>
    </ul>
      <ul class="tb" v-for="(item,key) of List" :key="key">
        <li>{{key+1}}</li>
        <li>{{item.user_nickname}}</li>
        <li>{{item.sum}}</li>
      </ul>
     <van-popup v-model="show" position="bottom"><span class="qingqiu">数据请求中</span></van-popup>
  </div>
</template>
<script>
  const axios = require("axios");
  import { Url } from "../../utils/config"
  let Base64 = require('js-base64').Base64;
export default {
  mounted:function(){
    this.getlist();
    window.addEventListener("scroll", this.scrollBottom,true);
  },
  data(){
    return{
      List:[],
      num:0,
      show:false,
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
     getlist:function(){
      var _this = this;
      axios({
        method:"post",
        url:Url+"/apis/user/getYongJinOrder",
        data:{
            start:0,
            page_size:10
        }
      }).then(function(res){
        console.log(res)
        if(res.data.code == 0){
          this.$dialog.alert({
            message: msg
          });
        }else{
          _this.List = res.data.data;
          
        }
      })
    },
    scrollBottom:function(){
      let getScreen = window.screen.height;
      let scrollTops =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let bHeight = document.body.clientHeight;
      console.log(getScreen + parseInt(scrollTops));
      console.log(bHeight);
      if (getScreen + parseInt(scrollTops) - 19 == bHeight) {
        this.num += 1;
        var _this = this;
        this.show = true;
      setTimeout(function(){
        axios({
        method:"post",
        url:Url+"/apis/user/getYongJinOrder",
        data:{
            start:_this.num,
            page_size:10
        }
      }).then(function(res){
        console.log(res)
        if(res.data.code == 0){
          this.$dialog.alert({
            message: msg
          });
        }else{
          _this.show = false;
          _this.List = res.data.data;
          document.getElementsByClassName('zhanwei')[0].scrollIntoView();
        }
      })
      },1000);
      }

    }
  }
}
</script>
<style scoped>
body{
  height: 100%;
}
  .app{
    background: #fff;
    height: 100%;
    
  }
  .header{
    width:100%;
    height: 0.87rem;
    background-color: #fff;
    position: relative;
    z-index: 4;
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
    margin-left: 2.3rem;
    float: left;
    color: #040404;
  }
  .zhanwei{
    width: 100%;
    height: 0.9rem;
  }
  .th{
    width: 100%;
    height: 1.1rem;
    border-bottom: 0.01rem solid #f7f7f7;
    border-top: 0.6rem solid #f7f7f7;
  }
  .th li{
    width: 33%;
    height: 1.1rem;
    float: left;
    text-align: center;
    color: #040404;
    line-height: 1.1rem;
    font-size: 0.3rem;
  }
  .tb{
    width: 98%;
    height: 1.1rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid #f7f7f7;
  }
  .tb li{
    width: 33%;
    height: 1.1rem;
    float: left;
    text-align: center;
    color: #040404;
    line-height: 1.4rem;
    font-size: 0.28rem;
  }
  .tb li:last-child{
    color: #E53030;
  }
   .qingqiu{
    width: 100%;
    display: block;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    font-size: 0.4rem;
  }
</style>
