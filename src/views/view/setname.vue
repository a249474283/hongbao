<template>
  <div class="app">
    <div class="headera">
      <img src="../../assets/fanhui.png" @click="fanhui" >
        <span>
          绑定真实姓名
        </span>
    </div>
    <div class="xgnc">
      <input type="text" placeholder="请输入真实姓名" @blur="getname">
      <button @click="sub">保存</button>
    </div>
  </div>
</template>
<script>
  const axios = require('axios');
  import { Url } from '../../utils/config';
export default {
  data(){
    return{
      username:""
    }
  },
  methods: {
    fanhui:function(){
      this.$router.back(-1);
    },
    getname:function(e){
      this.username = e.srcElement.value;
    },
    sub:function(){
      var id = localStorage.getItem("Id");
      var _this = this
      axios({
        url:Url+"/apis/user/saveUserInfo",
        method:"post",
        params:{
          id:id,
          user_name:this.username
        }
      }).then(function(res){
        console.log(res)
        if(res.data.code == 1){
          _this.$dialog.alert({
            message: '绑定成功'
          });
          _this.$router.push({
            path:"/information"
          })
        }else{
          _this.$dialog.alert({
            message: res.data.msg
          });
        }
      })
    }
  },
}
</script>
<style scoped>
  .headera{
    width:100%;
    height: 0.87rem;
    background-color: #fff;
    position: relative;
    z-index: 4;
  }
  .headera img{
    display: block;
    width: 0.2rem;
    height: 0.34rem;
    margin: 0.25rem 0 0 0.5rem;
    position: absolute;
    z-index: 10;
  }
  .headera span{
    display: block;
    width: 100%;
    font-size: 0.3rem;
    line-height: 0.87rem;
    text-align: center;
    color: #040404;
  }
  .xgnc{
    width: 100%;
    height: 0.9rem;
    font-size: 0.3rem;
    border-bottom: 0.01rem solid #29D17A;
  }
  .xgnc input{
    height: 0.9rem;
    border: 0;
    background: none;
    margin-left: 0.2rem;
  }
  .xgnc button{
    background: none;
    border: 0;
  }
</style>
