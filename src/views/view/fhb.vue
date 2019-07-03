<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui">
      <span>
        发红包
      </span>
    </div>
    <div class="lan">
      <span>红包个数</span>
      <p>{{number}}个</p>
    </div>
    <div class="ts">
      <p>游戏倍数：</p>
      <span>{{pei}}倍</span>
    </div>
    <div class="lan">
      <span>总金额</span>
      <input class="num" type="number" placeholder="请输入整数" @input="zje">
    </div>
    <div class="ts">
      <p>金额范围：</p>
      <span>{{min}}~{{max}}元</span>
    </div>
     <div class="lan">
      <span>雷数</span>
      <input class="num" type="text" placeholder="请输入" @blur="leishu">
    </div>
    <div class="ts">
      <p>雷数存在 0~9，多雷 "," 隔开</p>
    </div>
    <span class="qian">
      ￥{{hbje}}.00
    </span>
    <button class="sub" @click="sub">塞钱进红包</button>
    <span class="xts">未领过的红包，将会自动退回</span>
  </div>
  
</template>
<script>
  const axios = require('axios');
  import { Url } from "../../utils/config";
export default {
  mounted:function(){
    this.getqunxx();
  },
  data(){
    return{
      hbje:0,
      max:"",
      min:"",
      number:"",
      pei:""
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    //获取用户
    zje:function(e){
      console.log(e.srcElement.value)
      if(e.srcElement.value){
        this.hbje = e.srcElement.value;
      }else{
        this.hbje = 0;
      }
    },
    //获取雷的数字
    leishu:function(e){
      this.leishu = e.srcElement.value;
      console.log(this.leishu)
    },
    //发红包
    sub:function(){
      var qun_id = this.$route.params.id;
      var id = localStorage.getItem("Id");
      var qun_id = this.$route.params.id;
      var _this = this;
      axios({
        method:'post',
        url:Url+"/apis/user/saveUserBao",
        data:{
          qun_id:qun_id,
          user_id:id,
          money: this.hbje,
          lei_number:this.leishu
        }
      }).then(function(res){
        console.log(res)
        if(res.data.code == 1){
          _this.$dialog.alert({
            message: '发送成功'
          });
          _this.$router.back(-1);
        }else{
          _this.$dialog.alert({
            message: res.data.msg
          });
        }
      })
    },
    //获取规则
    getqunxx:function(){
      this.qun_id = this.$route.params.id;
      var id = localStorage.getItem("Id");
      var _this = this;
      axios({
        url:Url+"/apis/user/getHongBaoList",
          method:"post",
          data:{
            id:_this.qun_id,
            user_id:id,
            start:0,
            page_size:20,
          }
        }).then(function(res){
          console.log(res);
          _this.min = res.data.data.qun_info.min_bao;
          _this.max = res.data.data.qun_info.max_bao;
          _this.number = res.data.data.qun_info.number;
          _this.pei = res.data.data.qun_info.paid;
      })
    },
  }
}
</script>
<style scoped>
  .app{
    height: 13rem;
  }
  .header{
    width:100%;
    height: 0.87rem;
    background-color: #fff;
    position: relative;
    z-index: 4;
    margin-bottom: 0.29rem;
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
    margin-left: 2.8rem;
    float: left;
    color: #040404;
  }
  .lan{
    width: 100%;
    height: 0.98rem;
    background: #fff;
  }
  .lan span{
    font-size: 0.28rem;
    color: #272727;
    display: block;
    width: 1.2rem;
    height: 0.98rem;
    line-height: 0.98rem;
    float: left;
    margin-left: 0.5rem;
  }
  .lan p{
    font-size: 0.28rem;
    color: #272727;
    display: block;
    width: 1.2rem;
    height: 0.98rem;
    line-height: 0.98rem;
    float: right;
  }
  .lan input{
    font-size: 0.28rem;
    display: block;
    width: 1.68rem;
    float: right;
    border: 0;
    line-height: 0.98rem;
  }
  .ts{
    width: 100%;
    height: 0.67rem;
  }
  .ts p{
    color: #FF4911;
    font-size: 0.24rem;
    float: left;
    line-height: 0.67rem;
    margin-left: 0.48rem;
  }
  .ts span{
    width: 3rem;
    height: 0.3rem;
    color: #FF4911;
    font-size: 0.24rem;
    float: left;
    line-height: 0.67rem;
  }
  .qian{
    width: 100%;
    height: 0.7rem;
    display: block;
    color: #333;
    font-size: 0.64rem;
    text-align: center;
    line-height: 0.7rem;
    position: relative;
    top: 1.38rem;
  }
  .sub{
    border: 0;
    width: 5.87rem;
    height: 0.8rem;
    background: #08C161;
    border-radius: 0.08rem;
    font-size: 0.28rem;
    color: #fff;
    position: relative;
    top: 1.3rem;
    left: 0.82rem;
  }
  .xts{
    width: 100%;
    display: block;
    height: 1rem;
    color: #FF3D26;
    font-size: 0.24rem;
    position: relative;
    top: 4rem;
    line-height: 1rem;
    text-align: center;
  }
</style>
