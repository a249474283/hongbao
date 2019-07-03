<template>
<div class="app">
  <div class="header">
    <img src="../../assets/fanhui.png" @click="fanhui" >
    <span>
      设置
    </span>
  </div>
  <div class="password">
    <div class="word" @click="setword">
      <span>修改登录密码</span>
      <img src="../../assets/jinru.png">
    </div>
    <div class="word" @click="setpassword">
      <span>修改支付密码</span>
      <img src="../../assets/jinru.png">
    </div>
  </div>
   <div class="password">
    <div class="word">
      <span>已绑定手机号</span>
      <div class="num">**{{sj}}</div>
    </div>
    <div class="word">
      <span>当前版本</span>
      <div class="bb">{{banben}}</div>
    </div>
  </div>
  <button class="login" @click="tuichu">退出登录</button>
  <div class="zhanwei">
    
  </div>
</div>
  
</template>
<script>
const axios = require('axios');
import { Url } from "../../utils/config";
export default {
  mounted:function(){
    this.bbh();
    this.bdsjh();
  },
  data(){
    return{
      banben:"",
      sj:""
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    }, 
    setword:function(){
      this.$router.push({
        path:"/setword",
      })
    },
    setpassword:function(){
      this.$router.push({
        path:"/setpassword",
      })
    },
    bbh:function(){
      var _this = this;
      axios({
        method:"post",
        url:Url+"/apis/user/getSystemVersion",
        params:{

        }
      }).then(function(res){
        _this.banben = res.data.data.version;
      })
      // _this.banben = localStorage.getItem("banben");
    },
    bdsjh:function(){
      var _this = this;
      var id = localStorage.getItem("Id");
      axios({
        url:Url+"/apis/user/getBindMobile",
        method:"post",
        params:{
          id:id
        }
      }).then(function(res){
        console.log(res)
        var str =  res.data.data.mobile;
        _this.sj = str.substring(7,11);
      })
    },
    tuichu:function(){
      window.localStorage.removeItem("Id");
      this.$dialog.alert({
        message: '退出成功'
      }).then(()=>{
        this.$router.push({
          path:"/"
        })
      });
     
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
    margin-left: 2.8rem;
    float: left;
    color: #040404;
  }
  .password{
    width: 100%;
    height: 1.94rem;
    background: #fff;
    margin-top: 0.4rem; 
  }
  .password .word{
    width: 100%;
    height: 0.97rem;
    border-bottom: 0.01rem solid #f7f7f7;
    position: relative;
    left: 1.05rem;
  }
  .password .word span{
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
  .password .word img{
    display: block;
    width: 0.17rem;
    height: 0.29rem;
    float: right;
    position: relative;
    top: 0.4rem;
    right: 1.59rem;
  }
  .password .word .num{
    width: 0.8rem;
    height: 0.29rem;
    float: right;
    position: relative;
    top: 0.4rem;
    right: 1.59rem;
    font-size: 0.28rem;
    color: #808080;
  }
.password .word .bb{
    width: 0.8rem;
    height: 0.29rem;
    float: right;
    position: relative;
    top: 0.4rem;
    right: 1.59rem;
    font-size: 0.28rem;
    color: #808080;
    text-align:right;
  }
  .login{
    border: 0;
    width: 100%;
    height: 0.8rem;
    background: #fff;
    border-radius: 0.08rem;
    font-size: 0.28rem;
    color: #333;
  }
  .zhanwei{
    width: 100%;
    height: 6.57rem;
  }
</style>
