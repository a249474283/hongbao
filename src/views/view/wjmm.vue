<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui">
        <span>
          忘记密码
        </span>
    </div>
    <div class="neirong">
      <div class="yword">
        <input type="text" placeholder="输入手机号" @blur="getTell">
      </div>
      <div class="yword">
        <input type="text" placeholder="输入验证码" @blur="yzm">
        <button class="yzm" v-if="yzmbj" @click="fsyzm">获取验证码</button>
        <button class="yzm" v-if="!yzmbj">{{yzmnum}}秒后再次获取</button>
      </div>
      <div class="yword">
        <input type="password" placeholder="确认新密码" @blur="getPassword">

      </div>
      <button class="sub" @click="sub">确认</button>
    </div>
    <div class="zhanwei"></div>
  </div>
</template>

<script>
const axios = require('axios');
import { Url } from '../../utils/config';
export default {
  data(){
    return{
      tell:'',
      code:'',
      codes:'',
      password:'',
      id:'',
      yzmnum:60,//下次验证码获取时间
      yzmbj:true,//标记
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    //获取手机号
    getTell:function(e){
      this.tell = e.srcElement.value;
    },
    //获取用户输入的验证码
    yzm:function(e){
      this.code = e.srcElement.value;
    },
    //发送验证码
    fsyzm:function(){
      axios({
        url:Url+"/apis/user/sendSms",
        method:"post",
        params:{
          user_login:this.tell,
          send_type: 2,
        }
      }).then(function(res){
        console.log(res)
        console.log(res.data.data);
        if(res.data.code == 1){
          this.codes = res.data.data;
        }else{
           this.$dialog.alert({
            message: res.data.msg
          })
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
    getPassword:function(e){
      this.password = e.srcElement.value;
    },
    sub:function(){
      var _this = this;
      if(this.code==this.codes){
        var id = localStorage.getItem("Id");
        console.log(id)
      axios({
        url:Url+"/apis/user/resetPasswd",
        method:"post",
        params:{
          id:id,
          passwd:this.password
        }
      }).then(function(res){
        console.log(res)
        if(res.data.code = 1){
          _this.$dialog.alert({
            message: '修改成功'
          }).then(()=>{
            _this.$router.push({
              path:"/login"
            })
          });
        }else{
          this.$dialog.alert({
            message:res.data.msg
          });
        }
      })
      }else{
        _this.$dialog.alert({
          message: "验证码输入错误"
        });
      }
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
  .neirong{
    width: 100%;
    height: 5.7rem;
    background: #fff;
    margin-top: 0.5rem;
  }
  .neirong .yword{
    width: 6.4rem;
    height: 0.88rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid #b5b5b5;
  }
  .neirong .yword input{
    display: block;
    float: left;
    border: 0;
    font-size: 0.28rem;
    color: #5a5a5a;
    position: relative;
    top: 0.25rem;
  }
  .yzm{
    height: 0.75rem;
    border: 0;
    background:rgba(255, 255, 255, 0);
    display: block;
    float:right;
    font-size: 0.24rem;
    color:#FF4911;
  }
  .neirong .sub{
    border: 0;
    width: 5.87rem;
    height: 0.8rem;
    background: #08C161;
    border-radius: 0.08rem;
    font-size: 0.28rem;
    color: #fff;
    position: relative;
    left: 0.82rem;
    top: 0.55rem;
  }
  .zhanwei{
    width: 100%;
    height: 6.28rem;
  }
</style>
