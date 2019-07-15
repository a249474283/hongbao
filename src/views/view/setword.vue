<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui" >
        <span>
          修改密码
        </span>
    </div>
    <div class="neirong">
      <div class="yword">
        <input type="password" placeholder="输入原始密码" @blur="getjword">
        
      </div>
      <div class="yword">
        <input type="password" placeholder="输入新密码" @blur="getnword">
        <span>(6-12位)</span>
      </div>
      <div class="yword">
        <input type="password" placeholder="再次输入新密码" @blur="getnwords">
        <span>(6-12位)</span>
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
      jword:"",
      nword:"",
      nwords:""
    }
  },
  mounted(){
},
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    getjword:function(e){
      this.jword = e.srcElement.value;
    },
    getnword:function(e){
      this.nword = e.srcElement.value;
    },
    getnwords:function(e){
      this.nwords = e.srcElement.value;
    },
    sub:function(){
      var _this = this;
      if(this.nword == this.nwords){
         var id = localStorage.getItem("Id");
        axios({
          method:"post",
          url:Url+"/apis/user/resetPasswd",
          params:{
            id:id,
            passwd: this.nword,
            passwd1: this.nwords,
            old_pass:	this.jword,
          }
        }).then(function(res){
          console.log(res.msg)
          if(res.data.code == 1){
           _this.$dialog.alert({
              message: '密码修改成功'
            });
          }else{
            console.log(res)
            _this.$dialog.alert({
              message: res.data.msg
            });
          }
        })
      }else{
        _this.$dialog.alert({
          message: "两次密码输入不一致"
        });
      }
     
    },
    goBack(){
      this.$router.replace({path: '/index'});
      //replace替换原路由，作用是避免回退死循环
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
  .zhanwei{
    width: 100%;
    height: 6.28rem;
  }
</style>
