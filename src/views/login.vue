<template>
  <div class="app">
    <div class="box">
      <img class="chang" src="../assets/chang1.png">
    </div>
    <div class="tell">
      <img src="../assets/shouji.png">
      <input type="text" placeholder="请输入手机号" @blur="getTell">
    </div>
    <div class="password">
      <img src="../assets/suo.png">
      <input type="password" placeholder="请输入密码（6-12位)" @blur="getPassword">
    </div>
    <button class="sub" @click="sub">登录</button>
    <ul class="avg">
      <li @click="regis">注册账号</li>
      <li @click="wjmm">忘记密码</li>
    </ul>
    <div class="zhanwei"></div>
  </div>
</template>
<script>
const axios = require('axios');
import { Url } from "../utils/config";
import { loginIn} from "../utils/auth";
export default {
  mounted(){
    this.loginq();
  },
  data(){
    return{
      tell:'',//手机号
      passWord:""//密码
    }
  },
  methods:{
    //获取用户输入的手机号
    getTell:function(e){
      this.tell = e.srcElement.value;
    },
    //获取用户输入的密码
    getPassword:function(e){
      this.passWord = e.srcElement.value;
    },
    //登录
    sub:function(){
      var _this = this;
      axios({

        method:"post",
        url: Url+"/apis/user/Login",
        // url:"http://paofen.guotf.cn/home/login/register",

        data:{
          user_login:this.tell,
          passwd:this.passWord

        }
      }).then(function(res){
        console.log(res)
        if(res.data.code == 1){
          loginIn("Id",res.data.data);
          this.$dialog.alert({
            message: '登录成功'
          }).then(function(){
            console.log(this)
            _this.$router.push({
              path:"/index"
            })
          });

        }else{
          _this.$dialog.alert({
            message: res.data.msg
          });
        }
      }.bind(this))

    },
    loginq:function(){
      if(localStorage.getItem("Id")) {
        this.$router.push({
          path:"/index"
        })
      }
    },
    //跳转至注册页面
    regis:function(){
      this.$router.push({
        path:"/regis"
      })
    },
    //跳转至忘记密码页面
    wjmm:function(){
      this.$router.push({
        path:"/wjmm"
      })
    }
  }
}
</script>
<style scoped>
body{
  height: 100%;
}
  .app{
    width: 100%;
    height: 100%;
    background-image: url(../assets/beijing.png);
    padding: 0;
    position: fixed;
    
  }
  .box{
    width: 1.76rem;
    height: 1.76rem;
    display: block;
    position: relative;
    top: 2.33rem;
    border-radius: 1.76rem;
    background: #F3FAE4;
    margin: 0 auto;
  }
  .box .chang{
    width: 1.45rem;
    height: 1.45rem;
    position: relative;
    top: 0.155rem;
    margin: 0 auto;
  }
  .tell,.password{
    width: 5.8rem;
    height: 1.1rem;
    border-bottom: 0.01rem solid #fff;
    position: relative;
    top: 3.6rem;
    margin: 0 auto;
  }
  .tell img{
    width: 0.28rem;
    height: 0.44rem;
    display: block;
    float: left;
    position: relative;
    top: 0.33rem;
    left: 0.17rem;
  }
  .tell input,.password input{
    border: 0;
    display: block;
    float: left;
    font-size: 0.28rem;
    background: transparent;
    position: relative;
    top: 0.4rem;
    left: 0.47rem;
    color: #fff;
  }
  .tell input::placeholder,.password input::placeholder{
    color:#fff;
  }
  
  .password img{
    width: 0.31rem;
    height: 0.39rem;
    float: left;
    position: relative;
    top: 0.33rem;
    left: 0.17rem;
  }
  .sub{
    border: 0;
    width: 5.87rem;
    height: 0.8rem;
    background: #C5EFCF;
    border-radius: 0.08rem;
    font-size: 0.28rem;
    color: #0AC161;
    position: relative;
    top: 4rem;
    display: block;
    margin: 0 auto;
  }
  .avg{
    width: 3.82rem;
    height: 0.66rem;
    position: relative;
    top: 4.89rem;
    margin: 0 auto;
  }
  .avg li{
    width: 1.5rem;
    height: 0.26rem;
    font-size: 0.24rem;
    color: #D0FDDE;
    margin: 0.2rem;
    float: left;
    border-right: 0.02rem solid #D0FDDE;
  }
 .avg li:nth-child(2){
   border: 0;
 }

</style>
