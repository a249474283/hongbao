<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui">
        <span>
          消息详情
        </span>
    </div>
    <div class="h2">
      <span>
        {{title}}
      </span>
    </div>
    <div class="neirong">
      <img :src="url+img" alt="">
      <div class="wb" v-html="content">

      </div>
    </div>
  </div>
</template>
<script>
  const axios = require('axios');
  import { Url } from '../../utils/config';
export default {
  mounted:function(){
    this.getId()
  },
  data(){
    return{
     title:"",
     img:"",
     content:"",
     url:Url,
    }
  },
  methods:{
     fanhui:function(){
      this.$router.back(-1);
    },
    getId:function(){
      var id = this.$route.params.id;
      var _this = this;
      console.log(id)
      axios({
        method:"post",
        url:Url+"/apis/article/getArticleDetails",
        params:{
          id: id
        }
      }).then(function(res){
        console.log(res.data.data);
        _this.title = res.data.data.title;
        _this.img = res.data.data.img_url;
        _this.content = res.data.data.content;
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
  .h2{
    width: 100%;
    height: 1.1rem;
    margin-top: 1rem;
    
  }
  .h2 span{
    display: block;
    width: 90%;
    color: #363636;
    font-size: 0.3rem;
    margin: 0 auto;

  }
  .neirong{
    width: 100%;
    background: #fff;
    padding-bottom: 2rem;
  }
  .neirong img{
    display: block;
    width: 6.56rem;
    height: 2.99rem;
    margin: 0 auto;
    position: relative;
    top: 0.18rem;
  }
  .wb{
    width: 85%;
    color: #6D6363;
    font-size: 0.28rem;
    line-height: 0.6rem;
    margin: 0 auto;
    position: relative;
    top: 0.5rem;
  }
</style>
