<template>
  <div class="app">
    <img class="tgewm" :src="ewm" alt="">
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
        var clipboard = new Clipboard('.copy')
        clipboard.on('success', e => {
          console.log('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
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
  }
  .tgewm{
    display: block;
    width: 67%;
    margin: 0 auto;
  }
  .tgli{
    width: 5rem;
    margin: 0 auto;
    margin-top: 0.2rem; 
    margin-bottom: 1.7rem; 
  }
  .tgli p{
    font-size: 0.28rem;
    color: #3c3c3c;
    margin-top: 0.39rem;
  }
  .copy{
    width: 100%;
    height: 0.9rem;
    border: 0;
    background: #08C161;
    font-size: 0.28rem;
    color: #FCFCFC;
    position: relative;
    bottom: 1.8rem;
  }
</style>
