<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui" >
        <span>
          消息中心
        </span>
    </div>
    <div class="box" :id="item.id" v-for="(item,index) of List" :key="index" @click="tiao">
      <p class="sj">{{item.add_time}}</p>
      <img class="xx" :src="url+item.img_url" alt="">
      <p class="xwbt">{{item.title}}</p>
    </div>
  </div>
</template>
<script>
  const axios = require('axios');
  import { Url } from '../../utils/config';
export default {
  mounted:function(){
    this.getxxlist();
  },
  data(){
    return{
      List:[],
      url:Url,
      num:1,
      isLoading: true
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    },
    getxxlist:function(){
      var _this = this;
       axios({
         method:"post",
         url:Url+"/apis/article/getArticleList",
         params:{
           start:_this.num,
           page_size:5,
         }
       }).then(function(res){
         console.log(res.data.data);
          _this.List = res.data.data;
       })
    },
    tiao:function(e){
      console.log(e.currentTarget.id)
      
      this.$router.push({
        name:'Xxxq',
        params:{
          id:e.currentTarget.id
        }
      })
    },
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
    margin-top: 1rem;
    width: 100%;
    height: 7rem;
    margin-bottom: 0.9rem;
    background: #fff;
  }
  .box .sj{
    width: 100%;
    height: 0.92rem;
    color: #353535;
    font-size: 0.24rem;
    line-height: 0.92rem;
    text-align: center;
  }
  .box .xx{
    display: block;
    width: 6.56rem;
    margin: 0 auto;
  }
  .box .xwbt{
    width: 6.56rem;
    height: 0.9rem;
    margin: 0 auto;
    color: #353535;
    font-size: 0.26rem;
    line-height: 0.9rem;
    margin: 0 auto;
    overflow: hidden;
    padding-left: 0.2rem;
  }
</style>
