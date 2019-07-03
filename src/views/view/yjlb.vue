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
        <div class="zhanwei"></div>
        <ul class="tb" v-for="(item,key) of List" :key="key" id="tb">
          <li>{{item.user_nickname}}</li>
          <li>{{item.change_money}}</li>
          <li>
            <p class="nyr">{{item.add_time*1000 | formatTime(1)}}</p>
            <p class="time">{{item.add_time*1000 | formatTime(5)}}</p>
          </li>
        </ul>
      </div>
    <van-popup v-model="show" position="bottom"><span class="qingqiu">数据请求中</span></van-popup>
  </div>
</template>

<script>
  const axios = require("axios");
  import { Url } from "../../utils/config"
  import BScroll from '@better-scroll/core'

export default {
   data(){
    return{
      List:"",
      rsy:"",
      zsy:"",
      time:"",
      num:0,
      show:false,
    }
  },
  mounted(){
    var tb = document.getElementById("tb");
    this.getlist();
    // 添加滚动事件，检测滚动到页面底部
    window.addEventListener('scroll', this.appScroll,true)
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
          start:1,
          page_size:10
        }
      }).then(function(res){
        console.log(res.data);
        if(res.data.code == 0){
          _this.$dialog.alert({
            message: msg
          });
        }else{
          _this.List = res.data.data;
          _this.rsy = res.data.jinri_shouyi;
          _this.zsy = res.data.zong_shouyi;
        }
      })

    },
    appScroll() {
      let getScreen = window.screen.height;
      let scrollTops =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let bHeight = document.body.clientHeight;
      var height =this.$refs.tt.offsetHeight+this.$refs.header.offsetHeight+this.$refs.th.offsetHeight;
      var _this = this;
        console.log(_this.$refs.box.scrollTop)
      if (getScreen + parseInt(scrollTops) - 242 == bHeight) {
        this.num += 1;
      var _this = this;
      this.show = true;
      setTimeout(function(){
        axios({
        method:"post",
        url:Url+"/apis/user/getYongJinList",
        data:{
          start:_this.num,
          page_size:10
        }
      }).then(function(res){
        console.log(res.data);
        _this.show = false;
        if(res.data.code == 0){
          _this.$dialog.alert({
            message: msg
          });
        }else{
          console.log(_this.$refs.box.scrollTop)
          document.getElementsByClassName('zhanwei')[0].scrollIntoView();
          _this.$refs.box.scrollTop = 0;
          _this.List = [];
          _this.List = res.data.data;
          _this.rsy = res.data.jinri_shouyi;
          _this.zsy = res.data.zong_shouyi;
        }
      })
      },1000);
      
      }
    },
    
  },
  destroyed() {
    window.removeEventListener("scroll", this.appScroll,true); //移除监听页面滚动事件
  },
}
</script>
<style scoped>
  body{
    height: 100%;
    overflow: hidden;
  }
  .app{
    background: #fff;
    height: 100%;
        overflow: auto;
  }
  .header{
    width:100%;
    height: 0.87rem;
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

  .wrapper{
    height: 13.39rem;
  }
  .zhanwei{
    width: 100%;
    height:4.09rem;;
  }
  .tt{
    width: 100%;
    height: 1.82rem;
    background: #f7f7f7;
    margin-top: 1rem;
    position:fixed;
    z-index: 6;
  }
  .tt .tt_left{
    width: 50%;
    height: 1.82rem;
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
    height: 1.82rem;
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
    height: 1.4rem;
    border-bottom: 0.01rem solid #f7f7f7;
    position:fixed;
    top:2.69rem;
    background: #fff;
  }
  .th li{
    width: 33%;
    height: 1.4rem;
    float: left;
    text-align: center;
    color: #040404;
    line-height: 1.4rem;
    font-size: 0.3rem;
  }
  .tb{
    width: 98%;
    height: 1.4rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid #f7f7f7;
  }
  .tb li{
    width: 33%;
    height: 1.4rem;
    float: left;
    text-align: center;
    color: #040404;
    line-height: 1.4rem;
    font-size: 0.28rem;
  }
  .tb li:nth-child(3){
    font-size: 0.28rem;
    color: #040404;
    line-height: 0.9rem;
  }
  .tb li:nth-child(3) p{
    width: 100%;
    height: 0.7rem;
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
