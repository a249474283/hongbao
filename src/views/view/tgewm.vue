<template>
  <div class="app">
    <div class="header">
        <img src="../../assets/fanhui.png" @click="fanhui" >
          <span>
            推广二维码
          </span>
      </div>
    <img class="tgewm" src="../../assets/yqd.png" alt="">
    <img :src="ewm" class="ewm" alt="">
    <div class="tgli">
      <p>1、先复制链接，将注册链接发送给好友</p>
      <p>2 、好友注册时，填写您的专属推荐码</p>
      <p>3 、您的专属推荐码：{{user_login}}</p>
    </div>
    <button class="copy" data-clipboard-text="http://hongbao.guotf.cn/hongbao.apk" @click="copy">
      复制链接
    </button>
  </div>

</template>
<script>
const axios = require('axios');
import Clipboard from 'clipboard';
import { Url } from '../../utils/config';
export default {
  mounted:function(){
    this.getewm();
    this.getMy();
  },
  data(){
    return{
      ewm: "",
      user_login:""
    }
  },
  methods:{
     fanhui:function(){
        this.$router.back(-1);
      },
    getewm:function(){
      var _this = this;
      var id = localStorage.getItem("Id");
      axios({
        url:Url+"/apis/common/share_link",
        method:"post",
        params:{
          user_id: id
        }
      }).then(function(res){
        console.log(res);
        _this.ewm = Url+res.data.data
      })
    },
     copy:function(){
      var _this = this;
        var clipboard = new Clipboard('.copy')
        clipboard.on('success', e => {
          console.log('复制成功')
          _this.$dialog.alert({
            message: '复制成功'
          });
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          _this.$dialog.alert({
            message: '不支持复制'
          });
          // 释放内存
          clipboard.destroy()
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
          _this.user_login = res.data.data.user_login;

        }else{
          _this.$dialog.alert({
            message: res.data.msg
          });
        }
      })
    },
  }
}
</script>
<style scoped>
  .app,body{
    height: 100%;
    overflow: hidden;
    padding-bottom: 1rem;
  }
  .tgewm{
    display: block;
    width: 100%;
    margin: 0 auto;
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
  .tgli{
    width: 5rem;
    margin: 0 auto;
    margin-top: 0.2rem; 

  }
  .tgli p{
    font-size: 0.28rem;
    color: #3c3c3c;
    margin-top: 0.1rem;
  }
  .copy{
    width: 100%;
    height: 0.9rem;
    border: 0;
    background: #08C161;
    font-size: 0.28rem;
    color: #FCFCFC;
    position: fixed;
    bottom: 0;
  }
  .ewm{
    width: 2.7rem;
    height: 2.7rem;
    position:absolute;
    top: 7.53rem;
    left: 2.46rem;
  }
</style>
