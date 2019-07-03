<template>
  <div class="app">
    <div class="header">
      <img src="../assets/fanhuibai.png" @click="fanhui">
        <span>
          注册
        </span>
    </div>
    <div class="kuai">
      <span>手机号</span> 
      <input type="text" id="tell" placeholder="请输入手机号" @blur="settell">
    </div>
    <div class="kuai">
      <span>验证码</span>
      <input type="text" id="tell" placeholder="请输入验证码" @blur="setyzm">
      <button v-if="yzmbj" @click="fsyzm">获取验证码</button>
      <button v-if="!yzmbj">{{yzmnum}}秒后再次获取</button>
    </div>
    <div class="kuai">
      <span>密码</span>
      <input type="password" id="tell" placeholder="请输入密码（6~12位)" @blur="getword">
    </div>
    <div class="kuai">
      <span>昵称</span>
      <input type="text" id="tell" placeholder="请输入昵称" @blur="setnickname">
    </div>
    <div class="kuai">
      <span>推荐码</span>
      <input type="text" id="tell" placeholder="请输入推荐码" @blur="setcode">
    </div>
    <button id="submit" @click="sub">注册</button>
  </div>
</template>
<script>
  const axios = require('axios');
  import { Url } from "../utils/config"
export default {
  data(){
    return{
      tell:'',//用户手机号
      password:'',//密码
      user_nickname:'',//昵称
      code:'',//推荐码
      yzm:'',//用户验证码
      getyzm:'',//发送的验证码
      yzmnum:60,//下次验证码获取时间
      yzmbj:true,//标记
    }
  },
  
  methods:{
    //返回上一页
     fanhui:function(){
        this.$router.back(-1);
    },
    //获取手机号
    settell:function(e){
      this.tell = e.srcElement.value;
      var _this = this;
      axios({
        url:Url+"/apis/user/validateMobile",
        method:"post",
        params:{
          send_type:1,
          user_login:this.tell
        }
      }).then(function(res){
        //console.log(res.data);
        if(res.data.code == 0){
          //alert(res.data.msg)
          _this.$dialog.alert({
            title: '提示',
            message: res.data.msg
          }).then(() => {
              // on close
          });
        }
      })
    },
    //获取密码
    getword:function(e){
      this.password = e.srcElement.value;
    },
    //发送验证码
    fsyzm:function(){
      axios({
        url:Url+"/apis/user/sendSms",
        method:"post",
        params:{
          user_login:this.tell,
          send_type: 1,
        }
      }).then(function(res){
        console.log(res)
        console.log(res.data.data)
        if(res.data.code == 1){
          console.log(res.data.data)
          this.getyzm = res.data.data;
        }
      }.bind(this))
      this.yzmbj = false;
      var shuzi = 59;
      var djs = setInterval(()=>{
        this.yzmnum = shuzi--;
        console.log(this.yzmnum)
        if(this.yzmnum==0){
        clearInterval(djs);
        this.yzmnum = 60;
        this.yzmbj = true;
      }
      },1000)
      
    },
    //获取用户输入的验证码
    setyzm:function(e){
      this.yzm = e.srcElement.value;
    },
    //获取昵称
    setnickname:function(e){
      this.user_nickname = e.srcElement.value;
    },
    //获取推荐码
    setcode:function(e){
      this.code = e.srcElement.value;
    },

    sub:function(){
      var _this = this;
      if(this.yzm == this.getyzm){
        if(this.tell && this.password && this.user_nickname && this.code){
          axios({
            url:Url+"/apis/user/register",
            method:"post",
            params:{
              user_login:this.tell,
              passwd: this.password,
              user_nickname:this.user_nickname,
              code:this.code
            }
          }).then(function(res){
            console.log(res.data)
            if(res.data.code == 1){
              _this.$dialog.alert({
                title: '提示',
                message: '注册成功'
              }).then(function(){
                  _this.$router.push({
                  path:"/"
                })
              })
            }else{
              _this.$dialog.alert({
                title: '提示',
                message: res.data.msg
              }).then(function(){
                // on close
              })
            }
          }.bind(this).bind(this))
            }else{
                alert("所有信息都是必填项");
              }
            }else{

              alert("验证码输入错误")
            }
        }
      }
}
</script>
<style scoped>
  .app{
    width: 100%;
    height: 13.34rem;
    background-image: url(../assets/beijing.png);
  }
  .header{
    width:100%;
    height: 0.87rem;
    position: relative;
    z-index: 4;
  }
    .header img{
        display: block;
        width: 0.2rem;
        height: 0.34rem;
        margin: 0.29rem 0 0 0.5rem;
        float: left;
    }
    .header span{
        display: block;
        width: 3rem;
        height: 0.3rem;
        font-size: 0.3rem;
        margin-top: 0.25rem;
        margin-left: 0.2rem;
        float: left;
        color: #fff;
    }
    .kuai{
      width: 5.83rem;
      height: 0.75rem;
      margin: 0 auto;
      border-bottom: 0.01rem solid #fff;
      position: relative;
      top: 1.5rem;
      margin-bottom: 0.33rem;
    }
    .kuai span{
      width: 1.39rem;
      height: 0.75rem;
      color: #fff;
      display: block;
      line-height: 0.75rem;
      font-size: 0.28rem;
      float: left;
      
    }
    .kuai input{
      border: 0;
      width: 2.7rem;
      background:rgba(255, 255, 255, 0);
      height: 0.75rem;
      display: block;
      float: left;
      color: #fff;
      font-size: 0.28rem;
    }
    .kuai input::placeholder{
      color: #fff;
    }
    .kuai button{
      height: 0.75rem;
      border: 0;
      background:rgba(255, 255, 255, 0);
      display: block;
      float:right;
      font-size: 0.24rem;
      color:#fff;
    }
    #submit{
      border: 0;
      width: 5.87rem;
      height: 0.8rem;
      background: #fff;
      border-radius: 0.08rem;
      font-size: 0.28rem;
      color: #0AC161;
      position: relative;
      top: 1.4rem;
      left: 0.82rem;
    }
</style>
