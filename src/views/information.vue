<template>
  <div class="app">
    <div class="header">
      <img src="../assets/fanhui.png" @click="fanhui" >
        <span>
          个人信息
        </span>
    </div>
    <div class="touxiang">
      <p>头像</p>
      <div class="aimg">
        <!-- 上传图片 -->
          <!-- <van-uploader  /> -->
          <van-uploader :after-read="afterRead">
             <img class="tx" :src="url">
          </van-uploader>
        <img class="jr" src="../assets/jinru.png">
      </div>
    </div>
     <div class="tg">
      <div class="tgl" @click="xgnc">
        <span>昵称</span>
        <p>
          {{nickName}}
          <img src="../assets/jinru.png" alt="">  
        </p>
      </div>
      <div class="tgl">
        <span>账号</span>
        <p>{{user_login}}</p>
      </div>
      <div class="tgl">
        <span>推荐码</span>
        <p>{{user_login}}</p>
      </div>
      <div class="tgl" @click="tg">
        <span>二维码</span>
        <img class="ewm" src="../assets/tgewm.png" alt=""> 
      </div>
    </div>
    <div class="tga">
     <div class="tgl">
        <span>真实姓名</span>
        <p>范**</p>
      </div>
      <div class="tgl">
        <span>手机号</span>
        <p>{{user_login}}</p>
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
      img:"",
      url:"",
      nickName:"",
      user_login:"",
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    // xgtx:function(){
     
    // },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      var _this = this;
      this.img = file.content;
      var id = localStorage.getItem("Id");
      axios({
        method:"post",
        url:Url+"/apis/user/uploadUserImg",
        data:{
          id:id,
          head_img:this.img
        }
      }).then(function(res){
        if(res.data.code == 1){
          _this.getMy();
        }else{
          _this.$dialog.alert({
            message: res.data.msg
          });
        }
      })
    },
    tg:function(){
      this.$router.push({
        path:"/tgewm"
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
          _this.user_login = res.data.data.user_login;
          _this.url = Url+res.data.data.head_img;

        }else{
          _this.$dialog.alert({
            message: res.data.msg
          });
        }
      })
    },
    xgnc:function(){
      this.$router.push({
        path:"/xgnc"
      })
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
  margin-left: 2.3rem;
  float: left;
  color: #040404;
}
.touxiang{
  width: 100%;
  height: 1.7rem;
  background: #fff;
  margin: 0.4rem 0 0.3rem 0;
}
.touxiang p{
  width: 1rem;
  height: 1.7rem;
  font-size: 0.3rem;
  line-height: 1.7rem;
  float: left;
  margin-left: 0.56rem;
}
.touxiang .aimg{
  width: 1.6rem;
  height: 1.7rem;
  float: right;
}
.tx{
  width: 0.96rem;
  height: 0.96rem;
  display: block;
  position: relative;
  top: 0.37rem;

}
.touxiang .aimg .jr{
  width: 0.17rem;
  height: 0.29rem;
  position: relative;
  right: 0.1rem;
}
 .tg{
    width: 100%;
    height: 3.7rem;
    background: #fff;
    margin-top: 0.4rem;
    padding-left: 0.57rem;
  }
  .tg .tgl{
    width: 100%;
    height: 0.9rem;
    color: #333333;
    font-size: 0.28rem;
    border-bottom: 1px solid #f7f7f7;
  }
  .tg .tgl span{
    display: block;
    width: 2rem;
    height: 0.9rem;
    float: left;
    line-height: 0.9rem;
  }
  .tg .tgl p{
    width: 4rem;
    height: 0.9rem;
    line-height: 0.9rem;
    margin-left: 0.6rem;
    float: right;
    color: #808080;
    text-align: right;
    margin-right: 0.9rem;
    font-size: 0.28rem;
  }
  .tg .tgl p img{
    width: 0.17rem;
    height: 0.29rem;
    position: relative;
    top: 0.06rem;
  }
  .tg .tgl .ewm{
    width: 0.43rem;
    height: 0.43rem;
    float: right;
    margin-right: 0.9rem;
    margin-top: 0.265rem;
  }

  .tga{
    width: 100%;
    height: 1.85rem;
    background: #fff;
    margin-top: 0.4rem;
    padding-left: 0.57rem;
  }
  .tga .tgl{
    width: 100%;
    height: 0.9rem;
    color: #333333;
    font-size: 0.28rem;
    border-bottom: 1px solid #f7f7f7;
  }
  .tga .tgl span{
    display: block;
    width: 2rem;
    height: 0.9rem;
    float: left;
    line-height: 0.9rem;
  }
  .tga .tgl p{
    width: 4rem;
    height: 0.9rem;
    line-height: 0.9rem;
    margin-left: 0.6rem;
    float: right;
    color: #808080;
    text-align: right;
    margin-right: 0.9rem;
    font-size: 0.28rem;
  }
</style>
