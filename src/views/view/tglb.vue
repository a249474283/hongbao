<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui" >
      <span>
        推广列表
      </span>
    </div>    
    <ul class="th">
      <li>ID</li>
      <li>直推人数</li>
      <li>间推人数</li>
    </ul>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="tb" :id="item.id" v-for="(item,key) of List" :key="key">
        <li>{{item.user_nickname}}</li>
        <li>{{item.zhitui_number}}</li>
        <li>{{item.jiantui_number}}</li>
      </ul>
    </van-list>
  </div>
</template>

<script>
  const axios = require("axios");
  import { Url } from "../../utils/config"
export default {
  mounted:function(){
  },
  data(){
    return{
      List:[],
      loading: false,
      finished: false,
      page:-1,
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    // getlist:function(){
    //   var _this = this;
    //   axios({
    //     method:"post",
    //     url:Url+"/apis/user/getTuiGuangList",
    //     data:{
    //       start:1,
    //       page_size:10
    //     }
    //   }).then(function(res){
    //     console.log(res)
    //     if(res.data.code == 1){
    //       _this.List = res.data.data;
    //     }else{
    //       this.$dialog.alert({
    //         message: res.data.msg
    //       });
    //     }
    //   })
    // },
    onLoad(){
      var _this = this;
      this.page++;
      axios({
        method:"post",
        url:Url+"/apis/user/getTuiGuangList",
        data:{
          start:this.page,
          page_size:7
        }
      }).then(function(res){
        console.log(res.data.data)
        _this.loading = false;
        if(res.data.code == 1){
          for(let i=0; i<res.data.data.length;i++){
            _this.List.push(res.data.data[i]);
          }
          
          console.log(_this.List)
        }else{
          _this.finished = true;
        }
      })
    }
  }
  
}

</script>
<style scoped>
  .app{
    background: #fff;
  
  }
  .header{
    width:100%;
    height: 0.87rem;
    background-color: #fff;
    position: fixed;
    top: 0;
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
  .th{
    width: 100%;
    height: 1.4rem;
    border-bottom: 0.01rem solid #f7f7f7;
    border-top: 1.6rem solid #f7f7f7;
  }
  .th li{
    width: 33%;
    height: 1.4rem;
    float: left;
    text-align: center;
    color: #040404;
    line-height: 1.4rem;
    font-size: 0.3rem;
  }
  
  .tb{
    width: 98%;
    height: 1.4rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid #f7f7f7;
  }
  .tb li{
    width: 33%;
    height: 1.4rem;
    float: left;
    text-align: center;
    color: #040404;
    line-height: 1.4rem;
    font-size: 0.28rem;

  }
</style>
