<template>
  <div class="app">
    <div class="header">
        <span>
          我的
        </span>
    </div>
    <div class="th" @click="information">
      <img :src="img" alt="">
      <div class="xinx">
        <span>{{nickName}}</span>
        <p><span>账号：</span> <span>{{user_login}}</span></p>
        <p><span>余额：</span> <span>{{user_money}}</span></p>
      </div>
    </div>
  <div class="box">
    <div class="hang" @click="cz">
      <img src="../assets/chongzhi.png">
      <span>充值</span>
    </div>
    <div class="hang" @click="tx">
      <img src="../assets/tixian.png">
      <span>提现</span>
    </div>
  </div>
  <div class="box">
    <div class="hang" @click="yemx">
      <img src="../assets/mxi.png">
      <span>余额明细</span>
    </div>
    <div class="hang" @click="wdskh">
      <img src="../assets/bangding.png">
      <span>绑定收款账号</span>
    </div>
  </div>
  <div class="box">
    <div class="hang" @click="xxzx">
      <img src="../assets/xiaoxi.png">
      <span>消息中心</span>
    </div>
    <div class="hang" @click="setup">
      <img src="../assets/shezhi.png">
      <span>设置</span>
    </div>
  </div>
  </div>
</template>
<script>
  const axios = require('axios');
  import { Url } from '../utils/config';
export default {
  mounted:function(){
    this.getMy();
  },
  data(){
    return{
      nickName:"",
      user_money:"",
      user_login:"",
      img:"",
    }
  },
  methods:{
    information:function(){
      this.$router.push({
        path:"/information"
      })
    },
    cz:function(){
      this.$router.push({
        path:"/cz"
      })
    },
    tx:function(){
      this.$router.push({
        path:"/tx"
      })
    },
    yemx:function(){
      this.$router.push({
        path:"/yemx"
      })
    },
    wdskh:function(){
      this.$router.push({
        path:"/wdskh"
      })
    },
    xxzx:function(){
      this.$router.push({
        path:"/xxzx"
      })
    },
    setup:function(){
       this.$router.push({
        path:"/setup"
      })
    },
    getMy:function(){
      var _this = this;
      var id = localStorage.getItem("Id");
      axios({
        url:Url+"/apis/user/getUserInfo",
        method:"post",
        params:{
          id:id
        }
      }).then(function(res){
        console.log(res);
        if(res.data.code == 1){
          _this.nickName = res.data.data.user_nickname;
          _this.user_money = res.data.data.user_money;
          _this.user_login = res.data.data.user_login;
          _this.img = Url+res.data.data.head_img;
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
.app{
  width: 100%;
  overflow: hidden;
}
  .header{
    width:100%;
    height: 0.87rem;
    background-color: #ffffff;
    position: relative;
    z-index: 4;
    margin-bottom: 0.39rem;

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
    margin-left: 3.5rem;
    float: left;
    color: #040404;
  }
  .th{
    width: 100%;
    height: 1.43rem;
    background: #ffffff;
    padding-top: 0.27rem;
  }
  .th img{
    width: 1.03rem;
    height: 1.04rem;
    display: block;
    float: left;
    margin-left: 0.5rem;
  }
  .th .xinx{
    width: 3rem;
    height: 1.5rem;
    float: left;
  }
  .th .xinx span{
    color: #010101;
    font-size: 0.33rem;
    display: block;
    margin-left: 0.35rem;
   
  }
  .th .xinx p{
    width: 3rem;
    height: 0.3rem;
    float: left;
  }
  .th .xinx p span{
    font-size: 0.22rem;
    color: #6B6B6B;
    float: left;
  }

.box{
    width: 100%;
    height: 1.94rem;
    background: #fff;
    margin-top: 0.4rem; 
  }
.box .hang{
    width: 100%;
    height: 0.97rem;
    border-bottom: 0.01rem solid #f7f7f7;
    position: relative;
    left: 1.05rem;
  }
.box .hang span{
  display: block;
  width: 1.7rem;
  height: 0.97rem;
  font-size: 0.28rem;
  color: #333333;
  float: left;
  line-height: 0.97rem;
  position: relative;
  left: -0.5rem;
}
.box .hang img{
    display: block;
    width: 0.33rem;
    height: 0.29rem;
    float: left;
    position: relative;
    top: 0.35rem;
    right: 0.6rem;
  }
 
</style>
