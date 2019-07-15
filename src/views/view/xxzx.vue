<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui" >
        <span>
          消息中心
        </span>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <div class="box" :id="item.id" v-for="(item,index) of List" :key="index" @click="tiao(item)">
      <p class="sj">{{item.add_time}}</p>
      <img class="xx" :src="url+item.img_url" alt="">
      <p class="xwbt">{{item.title}}</p>
    </div>
    </van-list>
  </div>
</template>
<script>
  const axios = require('axios');
  import { Url } from '../../utils/config';
export default {
  mounted:function(){

  },
  data(){
    return{
      List:[],
      url:Url,
      num:-1,
      isLoading: true,
      loading: false,
      finished: false
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    tiao:function(val){
      console.log(val)
      
      this.$router.push({
        name:'Xxxq',
        params:{
          id: val.id
        }
      })
    },
    onLoad() {
      // 异步更新数据
        var _this = this;
        _this.num++;
       axios({
         method:"post",
         url:Url+"/apis/article/getArticleList",
         params:{
           start:_this.num,
           page_size:6,
         }
       }).then(function(res){
         console.log(res.data.data);
         if(res.data.code == 1){
           for(let i = 0;i < res.data.data.length;i++){
             _this.List.push(res.data.data[i])
           }
           console.log(_this.List)
          
         }else{
           // 数据全部加载完成
           _this.finished = true;
         }
          // 加载状态结束
            _this.loading = false;
       })
    }
  }
}
</script>
<style scoped>
  .app{
    padding-bottom: 1rem;
  }
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
    background: #f7f7f7;
  }
  .app div:nth-child(2){
    margin-top: 1rem;
    width: 100%;
    background: #f7f7f7;
  }
  .box .sj{
    width: 100%;
    height: 0.92rem;
    color: #353535;
    font-size: 0.24rem;
    line-height: 0.92rem;
    text-align: center;
    background: #f7f7f7;
  }
  .box .xx{
    display: block;
    width: 6.56rem;
    margin: 0 auto;
  }

  .box .xwbt{
    width: 6.36rem;
    height: 0.9rem;
    margin: 0 auto;
    color: #353535;
    font-size: 0.26rem;
    line-height: 0.9rem;
    margin: 0 auto;
    overflow: hidden;
    padding-left: 0.2rem;
    background: #fff;
  }
</style>
