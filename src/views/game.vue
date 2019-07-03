<template>
  <div class="app">
        <h1 class="bt">游戏</h1>
    <!-- 以上是头部标题 -->
    <van-swipe :autoplay="3000" indicator-color="white" class="banner">
      <van-swipe-item v-for="(item,index) of bannerList" :key="index">  
        <img :src="Url+item.img" class="aimg">
      </van-swipe-item>
 
    </van-swipe>


   <!--  以上是轮播图 -->
    <div class="box" v-for="(item,key) of hblist" :key="key">
      <img src="../assets/hongbao.png">
      <div class="zhong">
        <p>{{item.title}}</p>
        <span>{{item.lei_desc}}{{item.number}}包</span>
      </div>
      <button :id="item.id" @click="tiao">进入</button>
    </div>
  </div>
</template>
<script>
const axios = require('axios');
import { Url } from "../utils/config";
import { loginIn} from "../utils/auth";
export default {
  mounted:function(){
    this.getbanner();
    this.gethbList();
  },
  data(){
    return{
      bannerList:[],
      Url:Url,
      hblist:[],
      page:"0"
    }
  },
  methods:{
    tiao:function(e){
      var qun_id = e.currentTarget.id;
      var id = localStorage.getItem("Id");
      var _this = this;
        axios({
            url:Url+"/apis/user/saveUserQun",
            method:"post",
            params:{
                qun_id:qun_id,
                user_id:id
            }
        }).then(function(res){
            _this.$router.push({
              name:'Qun',
              params:{
                id:qun_id
              }
            })
      })
    },
    getbanner:function(){
      var _this = this;
      axios({
        url:Url+"/apis/common/getBannerList",
        method:"post",
        params:{
          position:"index",
        }
      }).then(function(res){
        console.log(res);
        var banner = [];
        //for(let i in res.data.list)
          _this.bannerList =res.data.list;
        })
        console.log(_this.bannerList);
    },
     gethbList:function(){
        var _this = this;
        axios({
            method:"post",
            url:Url+"/apis/user/getQunList",
            data:{
                start: _this.page,
                page_size: 5,
            }
        }).then(function(res){
            console.log(res.data.data);
            _this.hblist = res.data.data;
        })
    },
  }
}
</script>
<style scoped>
  .bt{
    width: 100%;
    height: 0.87rem;
    text-align: center; 
    line-height: 0.87rem;
    font-size: 0.3rem;
    background: #fff;
    }
  .banner,.youx{
    width: 100%;
    height: 3.4rem;
    margin: 0.17rem 0 0.13rem 0;
  }
  .aimg{
    width: 100%;
  }
  .box{
    width: 87.3%;
    height: 0.96rem;
    background: #fff;
    padding: 0.26rem 0.5rem 0.25rem 0.46rem;
    margin-bottom: 0.32rem;
  }
  .box img{
    width: 0.97rem;
    height: 0.96rem;
    float: left;
  }
  .box .zhong{
    width: 3rem;
    height: 0.96rem;
    float: left;
    margin-left: 0.33rem;
  }
  .box .zhong p{
    color: #393939;
    font-size: 0.3rem;
    margin-bottom: 0.2rem;
  }
  .box .zhong span{
    display: block;
    color: #808080;
    font-size: 0.24rem;
  }
  .box button{
    width: 1.33rem;
    height: 0.62rem;
    border: 0.01rem solid #FD492C;
    display: block;
    font-size: 0.24rem;
    color: #F95746;
    background: 0;
    border-radius: 0.08rem;
    float: right;
    margin-top: 0.19rem;
  }
</style>
