<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui">
        <span>
          余额明细
        </span>
    </div>
    <div class="box">
      <select v-if="!biaoj" class="chaxun" name="rq" id="" @click="gettime">
        <option value="">{{year}}{{month}}</option>
      </select>
      <select v-if="biaoj" class="chaxun" name="rq" id="" @click="gettime">
        <option value="">{{year}}{{month}}</option>
      </select>
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :max-date="maxDate"
          @confirm="xzsj"
        />
      </van-popup>

      <!-- 以上是日期选择 -->
    </div>
    <div class="kuai" v-for="(item,key) of List" :key="key">
      <div class="caozuo">
        <p>{{item.title}}</p>
        <span>{{item.tag}}{{item.change_money}}</span>
      </div>
      <div class="yue">
        余额：<span>{{item.next_money}}</span>
      </div>
      <div class="rq">
        {{item.add_time}}
      </div>
    </div>
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
      currentDate: new Date(),
      show:false,
      maxDate:new Date(),
      year:"",
      month:"",
      List:[],
      biaoj:false,
    }
  },
  methods:{
    fanhui:function(){
        this.$router.back(-1);
    },
    getye:function(){
      var id = localStorage.getItem("Id");
      var time = new Date(this.maxDate.getFullYear(),this.maxDate.getMonth(),1).getTime();
      var _this = this;
      this.year = this.maxDate.getFullYear()+"年";
      this.month = this.maxDate.getMonth()+1+"月";

      console.log(new Date(this.maxDate.getFullYear(),this.maxDate.getMonth(),1))
      axios({
        method:"post",
        url:Url+"/apis/user/getUserMoneyLog",
        params:{
          user_id: id,
          time:time,
          start:0,
          page_size:10,
        }
      }).then(function(res){
        console.log(res)
        if(res.data.code == 0){
          _this.$dialog.alert({
            message: res.data.msg
          });
        }else{
          _this.List = res.data.data;
        }
      })
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    },
    gettime:function(){
      this.show = true;
    },
    xzsj:function(e){
      var cxsj = e.getTime();
      this.year = e.getFullYear()+"年";
      this.month = e.getMonth()+1+"月";
      var id = localStorage.getItem("Id");
      var _this = this;
      console.log(e)
      axios({
        method:"post",
        url:Url+"/apis/user/getUserMoneyLog",
        params:{
          user_id: id,
          time:cxsj,
          start:1,
          page_size:10,
        }
      }).then(function(res){
        console.log(res)
        _this.biaoj = true;
         if(res.data.code == 0){
           _this.List = [];
          _this.$dialog.alert({
            message: "暂无数据"
          });
        }else{
          _this.List = [];
          _this.List = res.data.data;
        }
        _this.show = false;
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
    position: fixed;
    top: 0;
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
  .box{
    width: 100%;
    height: 1.2rem;
    margin-top: 1rem;
  }
  .box select{
    width: 6.48rem;
    height: 0.7rem;
    font-size: 0.26rem;
    color: #808080;
    position: relative;
    left: 0.56rem ;
    bottom: 0.28rem;
  }
  .box select option{
    width: 6.48rem;
  }
  .chaxun{
    position: fixed;
    top: -0.1rem;
  }
  .kuai{
    width: 86%;
    height: 1.53rem;
    background: #fff;
    margin-bottom: 0.32rem;
    padding: 0.34rem 0.49rem 0 0.7rem;
  }
  .kuai .caozuo{
    width: 100%;
    height: 0.5rem;
  }
  .kuai .caozuo p{
    width: 3rem;
    font-size: 0.3rem;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #333;
    float: left;
  }
  .kuai .caozuo span{
    display: block;
    color: #FD4F12;
    font-size: 0.3rem;
    line-height: 0.5rem;
    height: 0.5rem;
    float:right;
  }
  .kuai .yue{
    font-size: 0.27rem;
    color: #808080;
    margin-bottom: 0.2rem;
  }
  .kuai .yue span{
    font-size: 0.26rem;
    color: #808080;
  }
  .kuai .rq{
    font-size: 0.26rem;
    color: #808080;
  }
</style>
