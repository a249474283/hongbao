<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui">
      <span>
        提现
      </span>
    </div>   
    <div :id="item.id" :class="a+item.bank_id%2" v-for="(item,key) of yhkxx" :key="key" @click="xzyhk">
    <div class="yh">
      <!-- <img :src="url+item.bank_logo" alt=""> -->
      <img :src="url+item.bank_logo" alt="">
      <span>{{item.bank_name}}</span>
    </div>
    <ul class="kh">
      <li>****</li>
      <li>****</li>
      <li>****</li>
      <li>{{item.card_number}}</li>
    </ul>
  </div>
    <div class="xz" @click="xzyhk">选择银行卡</div>

    <!-- 以上是银行卡 -->
    <van-popup v-model="show" position="bottom">
      <ul class="yhlb">
        <li :id="item.id" v-for="(item,key) of list" :key="key" @click="yxzyhk(item)">
          <p>{{item.bank_name}}</p>
          <span>{{item.card_number}}</span>
        </li>
      </ul>
    </van-popup>
    <!-- 以上是弹窗 -->
    <div class="txcz">
      <div class="ye">
        <span>当前余额</span>
        <p>{{yue}}</p>
      </div>
      <div class="tx">
        <span>提现金额</span>
        <input type="number" placeholder="请输入提现金额" @blur="gettxje">
      </div>
    </div>
    <button id="sub" @click="sub">申请提现</button>
    <div class="zhanwei"></div>
  </div>
</template>
<script>
const axios = require("axios");
  import { Url } from "../../utils/config"
export default {
  mounted:function(){
    this.getye();
  },
  data(){
    return{
      a:"a",
      url:Url,
      show:false,
      list:[],
      yue:"",//当前账号余额
      yhkxx:[],//已选择的银行卡信息
      yxzh:"",//已选择的银行卡账号
      txje:"",//提现金额
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    //获取用户已绑定银行卡列表
    xzyhk:function(){
      
      var id = localStorage.getItem("Id");
      var _this = this;
      axios({
        method:"post",
        url:Url+"/apis/user/getBankcardList",
        data:{
          user_id: id,
          start: 1,
          page_size: 10
        }
      }).then(function(res){
        console.log(res)
        if(res.data.code == 1){
          _this.show=true;
          _this.list = res.data.data;
          for(let i = 0;i < _this.list.length;i++){
            _this.list[i].card_number = _this.list[i].card_number.substr(-4);
          }
        }else if(res.data.code == 0){
          _this.$dialog.confirm({
            message: "尚未绑定银行卡",
            confirmButtonText:"去绑定",

          }).then(() => {
            // on confirm
            _this.$router.push({
              path:"/wdskh"
            })
          }).catch(() => {
            // on cancel
          });
        }
      })
    },
    //获取用户余额
    getye:function(){
      var id = localStorage.getItem("Id");
      var _this = this;
      axios({
        method:"post",
        url:Url+"/apis/user/getUserMoneyCount",
        data:{
          id:id
        }
      }).then(function(res){
        console.log(res)
        if(res.data.code == 1){
          _this.yue = res.data.data.money;
        }else{
          _this.$dialog.alert({
            message: res.data.msg
          })
        }
      })
    },
    // 获取提现金额
    gettxje:function(e){
      this.txje = e.currentTarget.value;
    },
    yxzyhk:function(val){
      var _this = this;
      var id = val.id;
      console.log(id)
      axios({
        url:Url+"/apis/user/getBankcardInfo",
        method:"post",
        params:{
          id:id
        }
      }).then(function(res){
        console.log(res)
        if(res.data.code == 1 ){
          _this.yhkxx[0] = res.data.data;
          _this.yxzh = res.data.data.card_number;
          _this.yhkxx[0].card_number = _this.yhkxx[0].card_number.substr(-4);
          console.log(_this.yhkxx);
          _this.show = false;
          
        }else{
          _this.$dialog.alert({
            message: res.data.msg
          });
          _this.show = false;
        }
      })
    },
    sub:function(){
      var _this = this;
      var id = localStorage.getItem("Id");
      if(this.yue == 0){
         _this.$dialog.alert({
            message: "余额不足"
          })
      }else{
        if(_this.yxzh){
        axios({
        method:"post",
        url:Url+"/apis/user/saveUserMoneyWithdraw",
        data:{
          user_id:id,
          change_money:_this.txje,
          acc_type:3,
          account:_this.yxzh,
        }
      }).then(function(res){
        _this.$dialog.alert({
            message: res.data.msg
          })
      })
      }else{
        _this.$dialog.alert({
            message: "请选择银行卡"
          })
      }
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

.a0{
    width: 6.45rem;
    height: 1.99rem;
    margin:0 auto;
    background-image: url(../../assets/nongye.png);
    position: relative;
    top:0.3rem;
    margin-bottom: 0.48rem;
    border-radius: 0.2rem;
  }
.a1{
    width: 6.45rem;
    height: 1.99rem;
    margin:0 auto;
    background-image: url(../../assets/jianshe.png);
    position: relative;
    top:0.3rem;
    margin-bottom: 0.48rem;
    border-radius: 0.2rem;
  }
  .yh img{
    display: block;
    width: 0.58rem;
    height: 0.58rem;
    float: left;
    position: relative;
    left: 0.64rem;
    top: 0.42rem;
  }
  .yh span{
    font-size: 0.32rem;
    color: #fff;
    position: relative;
    left: 0.83rem;
    bottom: 0.1rem;
  }
  .kh{
    height: 0.5rem;
    position: relative;
    top: 0.3rem;
  }
  .kh li{
    float: left;
    width: 1.05rem;
    font-size: 0.46rem;
    color: #fff;
    line-height: 0.46rem;
    margin: 0.15rem;
    position: relative;
    bottom: 0.35rem;
    left: 1rem;
  }
  .yhlb{
    width: 100%;
    height: auto;
  }
  .yhlb li{
    width: 100%;
    height: 0.9rem;
    border-bottom: 0.02rem solid #bfbfbf;
  }
  .yhlb li p{
    width: 2rem;
    height: 0.9rem;
    font-size: 0.3rem;
    float: left;
    line-height: 0.9rem;
    margin-left: 0.5rem;
  }
  .yhlb li span{
    display: block;
    width: 2rem;
    height: 0.9rem;
    font-size: 0.3rem;
    float: right;
    line-height: 0.9rem;
    margin-left: 0.5rem;
  }
  .yhk .kh li{
    float: left;
    width: 1.05rem;
    font-size: 0.46rem;
    color: #fff;
    line-height: 0.46rem;
    margin: 0.15rem;
    position: relative;
    bottom: 0.35rem;
    left: 1rem;
  }
  .xz{
    width: 100%;
    height: 1.1rem;
      text-align: center;
    line-height: 1.1rem;
    font-size: 0.28rem;
    color: #08C161;
    position: relative;
    top: 0.3rem;
  }
  .txcz{
    width: 100%;
    height: 1.9rem;
    background: #fff;
    position: relative;
    top: 0.4rem;
  }
   .txcz .ye,.txcz .tx{
    width: 100%;
    height: 0.85rem;
  }
  .txcz .ye span,.txcz .tx span{
    display: block;
    width: 1.2rem;
    height: 0.85rem;
    float: left;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.85rem;
    position: relative;
    left: 0.56rem;
  }
  .txcz .ye p{
    width: 2rem;
    height: 0.85rem;
    float: left;
    font-size: 0.28rem;
    color: #F14529;
    position: relative;
    left: 0.98rem;
    line-height: 0.85rem;
  }
  .txcz .tx input{
    width: 4rem;
    float: left;
    font-size: 0.28rem;
    position: relative;
    left: 0.98rem;
    top: 0.25rem;
    border: 0;
  }
  #sub{
    width: 5.87rem;
    height: 0.8rem;
    background: #08C161;
    color: #fff;
    font-size: 0.28rem;
    border: 0;
    border-radius: 0.08rem;
    position: relative;
    top: 1.06rem;
    left: 0.82rem;
  }
.zhanwei{
  width: 100%;
  height: 5.35rem;
}
</style>
