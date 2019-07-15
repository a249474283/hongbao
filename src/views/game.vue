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
    <van-tabs v-model="active">
    <van-tab title="红包游戏">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="gethbList"
    >
      <div class="neirong">
        <div class="box" v-for="(item,key) of hblist" :key="key">
          <img src="../assets/hongbao.png">
          <div class="zhong">
            <p>{{item.title}}</p>
            <span>{{item.lei_desc}}{{item.number}}包</span>
          </div>
          <button :id="item.id" @click="tiao">进入</button>
        </div>
      </div>
      </van-list>
    </van-tab>
    <van-tab title="棋牌游戏">
      <div class="neirong">
        <div class="box">
          <img src="../assets/hongbao.png">
          <div class="zhong">
            <p>斗地主</p>
            <!-- <span>{{item.lei_desc}}{{item.number}}包</span> -->
          </div>
          <button>敬请期待</button>
        </div>
        <div class="box">
          <img src="../assets/hongbao.png">
          <div class="zhong">
            <p>炸金花</p>
            <!-- <span>{{item.lei_desc}}{{item.number}}包</span> -->
          </div>
          <button>敬请期待</button>
        </div>
        <div class="box">
          <img src="../assets/hongbao.png">
          <div class="zhong">
            <p>大众麻将</p>
            <!-- <span>{{item.lei_desc}}{{item.number}}包</span> -->
          </div>
          <button>敬请期待</button>
        </div>
        
      </div>
    </van-tab>

  </van-tabs>
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
      page:"0",
      active: 0,
      loading: false,
      finished: false,
      hbpage:-1,
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
       this.hbpage++;
        var _this = this;
        axios({
            method:"post",
            url:Url+"/apis/user/getQunList",
            data:{
                start: _this.hbpage,
                page_size: 6,
            }
        }).then(function(res){
            console.log(res);
            if(res.data.code == 1){
              for(let i =0;i<res.data.data.length;i++){
                _this.hblist.push(res.data.data[i]);
              }
              
            }else{
              _this.finished = true;
            }
             _this.loading = false;
        })
    },
    // onClick(name, title) {
    //   this.$toast(title);
    // }
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
    /* position: fixed;
    top: 0; */
    }
  .banner,.youx{
    width: 100%;
    height: 3.4rem;
    margin: 0.17rem 0 0.13rem 0;
    /* position: fixed;
    top: 0.87rem; */
  }
  .aimg{
    width: 100%;
  }
  .van-tab__pane, .van-tab__pane-wrapper {
        box-sizing: border-box;
    width: 100%;
    height: 8rem;
    overflow: auto;
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
