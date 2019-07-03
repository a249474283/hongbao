<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui">
        <span>
          红包领取详情
        </span>
    </div>
    <div class="huq">
      <div class="hu"></div>
    </div>
    <div class="box">
      <img class="mytouxiang" :src="url+hongbxx.head_img" >
      <div class="lqxx">
        <span class="name">{{hongbxx.user_nickname}}的红包</span>
        <span class="num">{{hongbxx.money}}-{{hongbxx.lei_number}}</span>
        <span class="price" v-if="user">{{user.bao_money}}</span>
        <span class="prices" v-if="!user">未领取到红包</span>
      </div>
    </div>
    <div class="lqxq">
      <div class="th">
          <span>{{hongbxx.number}}个红包共{{hongbxx.money}}元{{hongbxx.diff_time}}秒被抢光</span>
      </div>
      <ul class="lqr">
        <li v-for="(item,key) of lingqulist" :key="key">
          <div class="txm">
            <img class="tx" :src="url+item.head_img">
            <div class="xinx">
              <p class="xinN">{{item.user_nickname}}</p>
              <p class="xinT">{{item.update_time*1000 | formatTime(3)}}</p>
            </div>
          </div>
          <div class="lqzt">
            <p class="qian">{{item.bao_money}}</p>
            <p class="zl" v-if="item.is_paid">遗憾中雷</p>
            <p class="yqw" v-if="item.is_max">手气最佳</p>
          </div>
        </li>
        <!-- <li>
          <div class="txm">
            <img class="tx" src="../../assets/tx1.png">
            <div class="xinx">
              <p class="xinN">沉默</p>
              <p class="xinT">10:24</p>
            </div>
          </div>
          <div class="lqzt">
            <p class="qian">1.72元</p>
            <p class="zt">遗憾中雷</p>
          </div>
        </li>
        <li>
          <div class="txm">
            <img class="tx" src="../../assets/tx1.png">
            <div class="xinx">
              <p class="xinN">沉默</p>
              <p class="xinT">10:24</p>
            </div>
          </div>
          <div class="lqzt">
            <p class="qian">1.72元</p>
            <p class="zt">遗憾中雷</p>
          </div>
        </li>
        <li>
          <div class="txm">
            <img class="tx" src="../../assets/tx1.png">
            <div class="xinx">
              <p class="xinN">沉默</p>
              <p class="xinT">10:24</p>
            </div>
          </div>
          <div class="lqzt">
            <p class="qian">1.72元</p>
            <p class="zt">遗憾中雷</p>
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');
  import { Url } from "../../utils/config";
export default {
  mounted:function(){
    this.getlqxq();
  },
  data(){
    return{
      lingqulist:[],
      user:[],
      hongbxx:[],
      url:Url,
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    getlqxq:function(){
      var hbid = this.$route.params.id;
      var id = localStorage.getItem("Id");
      var _this = this;
      axios({
        method:"post",
        url:Url+"/apis/user/getHongBaoInfo",
        params:{
          id:hbid,
          user_id:id
        }
      }).then(function(res){
        console.log(res);
        if(res.data.code == 1){
          _this.lingqulist = res.data.bao_log;
          _this.user = res.data.user;
          _this.hongbxx = res.data.bao_info;
          console.log(res.data.bao_log);
          console.log(res.data.user);
          console.log(res.data.bao_info);
        }else{
          _this.$dialog.alert({
            message: res.data.msg
          });
        }
      })
    }
  }
}
</script>
<style scoped>
    html{
     background: #fff;
   }
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
    .box{
      width: 100%;
      height: 3.9rem;
      background: #f7f7f7;
    }
    .huq{
      width: 100%;
      height: 1.42rem;
      overflow: hidden;
      position: relative;
      background: #f7f7f7;
    }
    .hu{
      width: 30rem;
      height: 30rem;
      border-radius: 30rem;
      background: #ff3d26;
      position: absolute;
      left: -11rem;
      bottom: 0rem;
    }
    .mytouxiang{
      width: 0.76rem;
      height: 0.76rem;
      position: relative;
      z-index: 4;
      left: 3.37rem;
      top: -0.58rem;
    }
    .lqxx{
      width: 1.45rem;
      height: 1.5rem;
      margin: 0 auto;
      position: relative;
      bottom: 0.68rem;
    }
    .lqxx .name{
      font-size: 0.28rem;
      color: #171717;
      display: block;
      width: 1.45rem;
      text-align: center;
    }
    .lqxx .num{
      font-size: 0.28rem;
      color: #171717;
      display: block;
      width: 1.45rem;
      text-align: center;
    }
    .lqxx .price{
      color: #FF3D26;
      font-size:0.45rem;
      display: block;
      width: 1.45rem;
      text-align: center;
      position: relative;
    }
    .lqxx .prices{
      color: #FF3D26;
      font-size:0.3rem;
      display: block;
      width: 1.45rem;
      text-align: center;
      
    }
    .lqxq{
      width: 100%;
      position: relative;
      bottom: 0.42rem;
      height: 0.79rem;
      background: #fff;
    }
    .lqxq .th{
      width: 100%;   
      font-size: 0.3rem;
      color: #808080;
      width: 100%;
      height: 0.79rem;
      line-height: 0.79rem;
      border-bottom: 0.01rem solid #f7f7f7; 
    }
    .lqxq .th span{
      display: block;
      width: 100%;
      height: 0.79rem;
      margin-left: 0.45rem;
    }
    .lqr{
      width: 100%;
    }
    .lqr li{
      width: 100%;
      height: 1.36rem;
      padding-top: 0.02rem;
      border-bottom: 1px solid #f7f7f7;
      margin-left: 0.45rem;

    }
    .lqr li .txm{
      width: 2.7rem;
      height: 1.38rem;
      float: left;
    }
    .lqr li .txm .tx{
      width: 0.91rem;
      height: 0.91rem;
      float: left;
    }
    .lqr li .txm .xinx{
      width: 1.78rem;
      height: 1.38rem;
      float: right;
    }
    .lqr li .txm .xinx .xinN{
      font-size: 0.3rem;
      color: #333333;
      
    }
    .lqr li .txm .xinx .xinT{
      font-size: 0.28rem;
      color: #808080;
    }
    .lqzt{
      width: 1.5rem;
      height: 1.38rem;
      float: right;
      margin-right: 0.45rem;
    }
    .lqzt .qian{
      color: #333333;
      font-size: 0.3rem;
    }
    .lqzt .zl{
      color: #FB5135;
      font-size: 0.26rem;
    }
    .lqzt .yqw{
      color: #FBBE21;
      font-size: 0.26rem;
    }
</style>
