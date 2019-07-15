<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui">
        <span>
          余额明细
        </span>
    </div>
    <div class="box">
      <div class="chaxun" name="rq" id="" @click="gettime">
        {{year}}{{month}}
        <div class="sanjiao"></div>
      </div>
      <!-- <select v-if="biaoj" class="chaxun" name="rq" id="" @click="gettime">
        <option value="">{{year}}{{month}}</option>
      </select> -->
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :max-date="maxDate"
          @confirm="xzsj"
          @cancel = "qx"
        />
      </van-popup>

      <!-- 以上是日期选择 -->
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getye"
    >
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
    </van-list>
    <!-- 选择时间 -->
    <!-- <van-list
      v-model="loadinga"
      :finished="finisheda"
      finished-text="没有更多了"
      @load="getyea"
      v-if="xzbj"
    >
    <div class="kuai" v-for="(item,key) of aList" :key="key">
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
    </van-list> -->
  </div>
</template>
<script>
  const axios = require("axios");
  import { Url } from "../../utils/config"
export default {
  mounted:function(){
    this.getsj();
  },
  data(){
    return{
      currentDate: new Date(),
      show:false,
      maxDate:new Date(),
      year:"",
      month:"",
      List:[], //默认列表
      aList:[],//选择列表
      biaoj:false,
      loading: false,
      finished: false,
      mrpage:-1, //默认页数
      xzpage:-1,// 选择的页数
      xzbj:false,//选择标记
    }
  },
  methods:{
    fanhui:function(){
        this.$router.back(-1);
    },
    getsj(){
      this.year = this.maxDate.getFullYear()+"年";
      this.month = this.maxDate.getMonth()+1+"月";
    },
    getye(){
      var id = localStorage.getItem("Id");
      var time = new Date(this.maxDate.getFullYear(),this.maxDate.getMonth(),1).getTime();
      var _this = this;
      _this.mrpage++;
      console.log(_this.mrpage)
      console.log(this.xzbj)
      if(this.xzbj){
        console.log("真"+time);
        axios({
          method:"post",
          url:Url+"/apis/user/getUserMoneyLog",
          params:{
            user_id: id,
            time:_this.cxsj,
            start:_this.mrpage,
            page_size:6,
          }
        }).then(function(res){
          console.log(res)
          if(res.data.code == 1){
            for(let i=0;i<res.data.data.length;i++){
              _this.List.push(res.data.data[i]);
            }
          }else if(res.data.code == 0){
            _this.finished = true;
          }
          _this.loading = false;
        })
      }else{
        console.log("假"+this.cxsj);
        axios({
          method:"post",
          url:Url+"/apis/user/getUserMoneyLog",
          params:{
            user_id: id,
            time:time,
            start:_this.mrpage,
            page_size:6,
          }
        }).then(function(res){
          console.log(res)
          if(res.data.code == 1){
            for(let i=0;i<res.data.data.length;i++){
              _this.List.push(res.data.data[i]);
            }
          }else if(res.data.code == 0){
            _this.finished = true;
          }
          _this.loading = false;
        })
      }
    },
    //   getyea:function(){
    //   var id = localStorage.getItem("Id");
    //   var _this = this;
    //   _this.xzpage++;
    //   axios({
    //     method:"post",
    //     url:Url+"/apis/user/getUserMoneyLog",
    //     params:{
    //       user_id: id,
    //       time:this.cxsj,
    //       start:_this.mrpage,
    //       page_size:6,
    //     }
    //   }).then(function(res){
    //     console.log(res)
    //     if(res.data.code == 1){
    //       for(let i=0;i<res.data.data.length;i++){
    //         _this.List.push(res.data.data[i]);
    //       }
    //     }else if(res.data.code == 0){
    //       _this.finished = true;
    //     }
    //     _this.loading = false;
    //   })
    // },
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
      console.log(e.getTime())
      this.cxsj = e.getTime();
      this.year = e.getFullYear()+"年";
      this.month = e.getMonth()+1+"月";
     
      var id = localStorage.getItem("Id");
      var _this = this;
      _this.xzpage=0;
      this.xzbj = true;
      _this.mrpage = -1;
      this.loading = false,
      this.finished = false,
      this.List = [];
      _this.getye();

      console.log(_this.xzbj)
      // console.log(e)
      // axios({
      //   method:"post",
      //   url:Url+"/apis/user/getUserMoneyLog",
      //   params:{
      //     user_id: id,
      //     time:_this.cxsj,
      //     start:_this.xzpage,
      //     page_size:6,
      //   }
      // }).then(function(res){
      //   console.log(res)
      //   _this.biaoj = true;
      //    if(res.data.code == 0){
      //     _this.aList = [];
      //     _this.List = [];
      //   }else{
      //     for(let i = 0;i<res.data.data.length;i++){
      //     _this.List = [];
      //     _this.aList.push(res.data.data[i]);
      //     }
      //   }
        _this.show = false;
      // })
    },
    // xzlogin(){
    //   if(this.xzbj){
    //     var id = localStorage.getItem("Id");
    //     var _this = this;
    //   console.log(1)
    //   axios({
    //     method:"post",
    //     url:Url+"/apis/user/getUserMoneyLog",
    //     params:{
    //       user_id: id,
    //       time:_this.cxsj,
    //       start:_this.xzpage,
    //       page_size:6,
    //     }
    //   }).then(function(res){
    //     console.log(res)
    //     _this.biaoj = true;
    //      if(res.data.code == 0){
    //       _this.List = [];
    //       _this.finisheda = true;
    //     }else{
    //       _this.List = [];
    //       for(let i = 0; i<res.data.data.length;i++){
    //         _this.aList.push(res.data.data[i]);
    //       }
    //       console.log(_this.aList)
    //     }
    //     _this.loadinga = false
    //   })
    //   _this.xzpage++;
    //   }
    // },
    qx(){
      this.show = false;
    }
  },
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
  .box{
    width: 100%;
    height: 1.2rem;
    margin-top: 1.1rem;
  }
  .box .chaxun{
    width: 6.25rem;
    height: 0.7rem;
    font-size: 0.26rem;
    border-radius: 0.09rem;
    color: #808080;
    border: 0.01rem solid #CDCDCD;
    line-height: 0.7rem;
    position: relative;
    left: 0.56rem ;
    bottom: 0.28rem;
    background-color: #fff;
    padding-left: 0.23rem;
  }
  .box .chaxun .sanjiao{
    width: 0rem;
    height: 0rem;
    border:0.16rem solid #fff;
    border-top:0.16rem solid #939393;
    position: relative;
    bottom: 0.46rem;
    left: 5.66rem;
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
