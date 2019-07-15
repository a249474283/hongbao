<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui" >
        <span>
          设置支付密码
        </span>
    </div>
    <div class="neirong">
      <div class="yword">
        <input type="password" placeholder="输入原支付密码" @blur="getJpassword">
        <span>(*首次设置不填写)</span>
      </div>
      <div class="yword">
        <input type="password" placeholder="输入新支付密码" @blur="getpassword">
        <span>(*6位纯数字)</span>
      </div>
      <div class="yword">
        <input type="password" placeholder="再次输入新支付密码" @blur="getpasswords">
        <span>(*六位纯数字)</span>
      </div>
      <button class="sub" @click="sub">确认</button>
    </div>
  </div>
</template>
<script>
const axios = require('axios');
import { Url } from "../../utils/config";
export default {
  data(){
    return{
      ypassword:'',
      npassword:'',
      npasswords:''
    }
  },
  methods:{
    //返回上一页
    fanhui:function(){
      this.$router.back(-1);
    },
    //获取旧的支付密码
    getJpassword:function(e){
      this.ypassword = e.srcElement.value;
    },
    //获取新的支付密码
    getpassword:function(e){
      this.npassword = e.srcElement.value;
    },
    //获取第二次输入的支付密码
    getpasswords:function(e){
      this.npasswords = e.srcElement.value;
    },
    // 修改密码
    sub:function(e){
      var id = localStorage.getItem("Id");
      var _this = this;
      if(!this.npassword){
        _this.$dialog.alert({
          message: '请输入新支付密码'
        });
      }else if(!this.npasswords){
        _this.$dialog.alert({
          message: '请确认新支付密码'
        });
      }else if(!this.npasswords == this.npassword){
        _this.$dialog.alert({
          message: '两次密码输入不一致'
        });
      }else{
        axios({
          url:Url+"/apis/user/editPayPasswd",
          method:"post",
          params:{
            user_id:id,
            money_passwd:this.npassword,
            money_passwd1:this.npasswords,
            old_money_pass:this.ypassword,	
          }
        }).then(function(res){
          console.log(res)
          if(res.data.code==1){
            _this.$dialog.alert({
              message: '支付密码修改成功'
            });
          }else{
            _this.$dialog.alert({
              message: res.data.msg
            });
          }
        })
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
    top: 0.3rem;
  }
  .neirong .yword span{
    display: block;
    width: 2.3rem;
    height: 0.88rem;
    font-size: 0.26rem;
    color: #FF4911;
    float: left;
    line-height: 0.88rem;
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
</style>
