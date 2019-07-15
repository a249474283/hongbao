<template>
  <div class="app">
    <div class="header" ref="header">
      <img src="../../assets/fanhui.png" @click="fanhui" >
      <span>
        佣金列表
      </span>
    </div>
    <div class="tt" ref="tt">
      <div class="tt_left">
        <p>
          <img src="../../assets/lb.png">
          总收益
        </p>
        <span>
          {{zsy}}
        </span>
      </div>
      <div class="tt_right">
        <p>
          <img src="../../assets/jb.png" alt="">
          今日收益
        </p>
        <span>
          {{rsy}}
        </span>
      </div>
    </div>

    <ul class="th" ref="th">
      <li>ID</li>
      <li>佣金</li>
      <li>时间</li>
     
    </ul>
			<!--内容...-->
      <div class="wrapper" ref='box'>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
         <ul class="tb" v-for="(item,key) of List" :key="key" id="tb">
          <li>{{item.user_nickname}}</li>
          <li>{{item.change_money}}</li>
          <li>
            <p class="nyr">{{item.add_time*1000 | formatTime(1)}}</p>
            <p class="time">{{item.add_time*1000 | formatTime(5)}}</p>
          </li>
        </ul>
        </van-list>
      </div>

  </div>
</template>

<script>
  const axios = require("axios");
  import { Url } from "../../utils/config"
  import BScroll from '@better-scroll/core'

export default {
   data(){
    return{
      List:[],
      rsy:"",
      zsy:"",
      time:"",
      num:-1,
      show:false,
      loading: false,
      finished: false
    }
  },
  mounted(){
   this.getlist();
},

  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    getlist:function(){
      var _this = this;
      axios({
        method:"post",
        url:Url+"/apis/user/getYongJinList",
        data:{
          start:0,
          page_size:6
        }
      }).then(function(res){
        console.log(res);
        if(res.data.code == 0){
          _this.rsy = "0.00";
          _this.zsy = "0.00";

        }
      })

    },
   onLoad() {
      // 异步更新数
        var _this = this;
        console.log(this.num)
        this.num++;
      axios({
        method:"post",
        url:Url+"/apis/user/getYongJinList",
        data:{
          start:this.num,
          page_size:6
        }
      }).then(function(res){
        console.log(res.data);
        if(res.data.code == 0){
           _this.finished = true;
        }else{
          console.log(res)
          for(let i = 0;i<res.data.data.length;i++){
            _this.List.push(res.data.data[i]);
            _this.rsy=res.data.jinri_shouyi;
            _this.zsy = res.data.zong_shouyi;
           
          }
          
        }
        _this.loading = false;
      })
        // 加载状态结束
        
    }
  },

}
</script>
<style scoped>

  .app{
    background: #fff;
    height: 100%;

  }
  .header{
    width:100%;
    height: 0.83rem;
    background-color: #fff;
    position: relative;
    z-index: 6;
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
.tishi{
  height: 1rem;
}
.wrapper{
  width: 100%;
  height: 9.2rem;
}
  .tt{
    width: 100%;
    height: 1.82rem;
    background: #f7f7f7;
    margin-top: 1rem;
  }
  .tt .tt_left{
    width: 50%;
    height: 100%;
    float: left;
  }
  .tt .tt_left p{
    width: 100%;
    height: 0.3rem;
    color: #040404;
    font-size: 0.24rem;
    text-align: center;
    margin-top: 0.46rem;
    margin-bottom: 0.36rem;
  }
  .tt .tt_left p img{
    display: block;
    width: 0.25rem;
    height: 0.27rem;
    float: left;
    position: relative;
    left: 1.15rem;
  }
  .tt .tt_left span{
    display: block;
    width: 100%;
    color: #1DA223;
    font-size: 0.45rem;
    float: left;
    text-align: center;
  }
   .tt .tt_right{
    width: 50%;
    height: 100%;
    float: right;
  }
  .tt .tt_right p{
    width: 100%;
    height: 0.3rem;
    color: #040404;
    font-size: 0.24rem;
    text-align: center;
    margin-top: 0.46rem;
    margin-bottom: 0.36rem;
  }
  .tt .tt_right p img{
    display: block;
    width: 0.25rem;
    height: 0.27rem;
    float: left;
    position: relative;
    left: 1.15rem;
  }
  .tt .tt_right span{
    display: block;
    width: 100%;
    color: #1DA223;
    font-size: 0.45rem;
    float: left;
    text-align: center;
  }
  .th{
    width: 100%;
    height: 1rem;
    border-bottom: 0.01rem solid #f7f7f7;
    background: #fff;
  }
  .th li{
    width: 33%;
    height: 100%;
    float: left;
    text-align: center;
    color: #040404;
    line-height: 70px;
    font-size: 0.3rem;
  }
  .tb{
    width: 98%;
    height: 1.11rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid #f7f7f7;
  }
  .tb li{
    width: 33%;
    height: 1.11rem;
    float: left;
    text-align: center;
    color: #040404;
    line-height: 1.11rem;
    font-size: 0.28rem;
  }
  .tb li:nth-child(3){
    font-size: 0.28rem;
    color: #040404;
    line-height: 0.9rem;
  }
  .tb li:nth-child(3) p{
    width: 100%;
    height: 0.3rem;
    font-size: 0.28rem;
    color: #040404;
    text-align: center;
  }
  .qingqiu{
    width: 100%;
    display: block;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    font-size: 0.4rem;
  }
</style>
