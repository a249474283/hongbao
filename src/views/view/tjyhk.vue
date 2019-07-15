<template>
<div class="app">
  <div class="header">
    <img src="../../assets/fanhui.png" @click="fanhui">
    <span>
      添加银行卡
    </span>
  </div>
  <div class = "h2">
    请绑定持卡人本人银行卡
  </div>
  <div class="neirong">
    <div>
      <span>持卡人姓名</span>
      <input id="name" type="text" placeholder="请输入" @blur="getname">
    </div>
    <div>
      <span>选择银行卡</span>
      <!-- <van-dropdown-menu id="yh">
        <van-dropdown-item v-model="value" :options="option" />
      </van-dropdown-menu> -->
      <select name="" id="yh" @change="yhh">
        <option value="0">请选择</option>
        <option :value="item.id" v-for="(item,key) of option" :key="key">{{item.bank_name}}</option>
      </select>
    </div>
    <div>
      <span>银行卡号</span>
      <input  id="id" type="number" placeholder="请输入" @blur="getyhkid">
    </div>
    <div>
      <span>银行支行</span>
      <input id="zh" type="text" placeholder="请输入" @blur="getyhzh">
    </div>
    <button id="sub" @click="sub">确认</button> 
  </div>  
</div>
  
</template>
<script>
  const axios = require("axios");
  import { Url } from "../../utils/config"
export default {
  mounted:function(){
    this.getyhList();
  },
  data(){
    return{
      option:[],
      bank_id:'',
      name:'',
      yhkh:'',
      yhzh:''
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    getyhList:function(){
      var _this = this;
      axios({
        method:"post",
        url:Url+"/apis/user/getBankList",
        data:{

        }
      }).then(function(res){
        console.log(res);
        _this.option = res.data.data;
        console.log(_this.option)
      })
    },
    //获取银行id
    yhh:function(e){
      console.log(e.srcElement.value)
      this.bank_id = e.srcElement.value;
    },
    //获取名字
    getname:function(e){
      this.name = e.srcElement.value;
    },
    //获取银行卡号
    getyhkid:function(e){
      this.yhkh = e.srcElement.value;
    },
    //获取支行
    getyhzh:function(e){
      this.yhzh = e.srcElement.value;
    },
    //提交
    sub:function(){
      var _this = this;
      var id = localStorage.getItem("Id");
      axios({
        method: "post",
        url: Url+"/apis/user/saveBankcardAdd",
        data:{
          user_id: id,
          name: _this.name,
          bank_id: _this.bank_id,
          card_number: _this.yhkh,
          card_address:_this.yhzh
        }
      }).then(function(res){
        console.log(res)
        if(res.data.code == 1){
          _this.$dialog.confirm({
            message: res.data.msg
          }).then(function(){
            _this.$router.push({
              path:"/wdskh"
            })
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
  .h2{
    width: 100%;
    height: 0.86rem;
    color: #2a2a2a;
    font-size: 0.3rem;
    line-height: 0.86rem;
    padding-left: 0.52rem;
    font-weight: 500;
  }
  .neirong{
    width: 100%;
    height: 6.7rem;
    background: #ffffff;
    position: relative;
  }
  .neirong div{
    width: 80%;
    height: 0.8rem;
    margin: 0 auto;
    font-size: 0.28rem;
    border-bottom: 0.01rem solid #B5B5B5;
  }
  .neirong div span{
    color: #2a2a2a;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .neirong div input{
    border: 0;
  }
  #name{
    position: relative;
    left: 0.8rem;
  }
  #uid{
    position: relative;
    left: 0.8rem;
  }
  #yh{
    width: 3rem;
    height: 0.8rem;
    border: 0;
    background: 0;
    position: relative;
    left: 0.7rem;
    font-size: 0.3rem;
  }
   #id{
    position: relative;
    left: 1.1rem;
  }
   #zh{
    position: relative;
    left: 1.1rem;
  }
  .neirong div input:nth-child(0){
    position: relative;
    left: 1rem;
  }
  #sub{
    width: 5.9rem;
    height: 0.8rem;
    display: block;

    font-size: 0.28rem;
    background: #08c161;
    color: #ffffff;
    position: absolute;
    bottom: 1.07rem;
    left: 0.85rem;
    border-radius: 0.1rem;
  }
</style>
