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
      <!-- <ul class="tb" v-for="(item,key) of List" :key="key">
        <li>{{num*10+key+1}}</li>
        <li>{{item.user_nickname}}</li>
        <li>{{item.sum}}</li>
      </ul> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="asd"
      >
      <ul class="tb" v-for="(item,key) of List" :key="key">
        
        <li>{{key+1}}</li>
        <li>{{item.user_nickname}}</li>
        <li>{{item.sum}}</li>
      </ul>
      </van-list>
  </div>
</template>
<script>
  const axios = require("axios");
  import { Url } from "../../utils/config"
  let Base64 = require('js-base64').Base64;
export default {
  mounted:function(){
    this.getlist();
  },
  data(){
    return{
      List:[],
      num:0,
      loading: false,
      finished: false
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
          
        }else{
          _this.List = res.data.data;
          
        }
      })
    },
    onLoad() {
      
      this.num++;
      var _this = this;
      // 异步更新数据
      
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
          if(res.data.code == 0){
          _this.finished = true;
        }
        }else{
        //   _this.List.push(res.data.data);
        //  console.log(_this.List)
          for(let i=0;i<res.data.data.length;i++){
            _this.List.push(res.data.data[i]);
          }
        }
        
      })
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
    }
  
  },

}
</script>
<style scoped>
body{
  height: 100%;
}
.asd{
  overflow: hidden;
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
    height: 1.07rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid #f7f7f7;
  }
  .tb li{
    width: 33%;
    height: 100%;
    float: left;
    text-align: center;
    color: #040404;
    line-height: 1.07rem;
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
