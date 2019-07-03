<template>
  <div class="app">
    <div class="header">
      <img src="../../assets/fanhui.png" @click="fanhui" >
        <span>
          群信息
        </span>
    </div>
    <div class="qun">
      <div class="qm">
        <span>群名称</span>
        <div>{{title}}</div>
      </div>
      <div class="qm" @click="gz">
        <span>群游戏规则</span>
        <img src="../../assets/jinru.png">
      </div>
    </div>
    <div class="qc" @click="qingchu">
      <span>清除聊天记录</span>
    </div>
    <div class="cy">
      <div class="qcy">
        <dl v-for="(item,key) of quncylist" :key="key">
          <dt>
            <img :src="url+item.head_img">
          </dt>
          <dd>
              {{item.user_nickname}}
          </dd>
        </dl>
        <div class="qb" @click="allquncy">
          <p>查看全部群成员</p>
          <span>（{{cynum}}）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');
  import { Url } from "../../utils/config";
export default {
  mounted:function(){
    this.getqxx();
    this.getquncy();
  },
  data(){
    return{
      title:'',
      qun_id:"",
      quncylist:[],
      url:Url,
      cynum:""
    }
  },
  methods:{
    //返回上一页
    fanhui:function(){
      this.$router.back(-1);
    },
    //跳转至群规则
    gz:function(){
      this.$router.push({
         path:"/yxgz"
      })
    },
    getqxx:function(){
      this.qun_id = this.$route.params.id;
      var _this = this;
      axios({
        method:'post',
        url:Url+"/apis/user/getQunInfo",
        data:{
          id: _this.qun_id,
        }
      }).then(function(res){
        console.log(res)
        _this.title = res.data.data.title;
      })
    },
    // 清除信息
    qingchu:function(){
      var id = localStorage.getItem("Id");
      var qun_id = this.$route.params.id;
      var _this = this;
      axios({
        method:'post',
        url:Url+"/apis/user/qingKongLog",
        params:{
          user_id:id,
          id:qun_id,
        }
      }).then(function(res){
        console.log(res)
        _this.$dialog.alert({
          message: res.data.msg
        });
      })
    },
    //获取群成员信息
    getquncy:function(){
      var _this = this;
       axios({
        method:'post',
        url:Url+"/apis/user/getUsrList",
        params:{
          id:_this.qun_id,
          start:0,
          page_size:15,
          all:0
        }
      }).then(function(res){
        console.log(res)
        if((res.data.code == 1)){
          _this.quncylist = res.data.data;
          _this.cynum = res.data.count;
        }
      })
    },
    //获取所以群成员信息
    allquncy:function(){
       var _this = this;
       axios({
        method:'post',
        url:Url+"/apis/user/getUsrList",
        params:{
          id:_this.qun_id,
          all:1
        }
      }).then(function(res){
        console.log(res)
        if((res.data.code == 1)){
          _this.quncylist = [];
          _this.quncylist = res.data.data;
        }
      })
    }
  }
}
</script>
<style scoped>
  .header{
    width:100%;
    height: 0.87rem;
    background-color: #f7f7f7;
    position: relative;
    z-index: 4;
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
  .qun{
    width: 100%;
    height: 1.94rem;
    background: #fff;
    margin-top: 0.4rem; 
  }
  .qun .qm{
    width: 100%;
    height: 0.97rem;
    border-bottom: 0.01rem solid #f7f7f7;
  }
  .qun .qm div{
    font-size: 0.28rem;
    color: #333333;
    height: 0.97rem;
    line-height: 0.97rem;
    float: right;
    position: relative;
    right: 0.42rem;
  }
  .qun .qm span{
    display: block;
    width: 1.7rem;
    height: 0.97rem;
    font-size: 0.28rem;
    color: #333333;
    float: left;
    line-height: 0.97rem;
    position: relative;
    left: 0.47rem;

  }
  .qun .qm img{
    display: block;
    width: 0.17rem;
    height: 0.29rem;
    float: right;
    position: relative;
    top: 0.4rem;
    right: 0.5rem;
  }
  .qc{
    font-size: 0.28rem;
    color: #333333;
    height: 0.97rem;
    line-height: 0.97rem;
    background: #fff; 
    margin-top: 0.31rem;
  }
  .qc span{
    display: block;
    position: relative;
    left: 0.47rem;
  }
  .cy{
    width: 100%;
    height: 6.42rem;
    background: #fff;
    margin-top: 0.3rem;
  }
  .cy .qcy{
    width: 6.78rem;
    height: 5.42rem;
    margin: 0 auto;
  }
  .cy .qcy dl{
    width: 0.95rem;
    height: 1.46rem;
    margin: 0.2rem;
    float: left;
  }
  .cy .qcy dl dt{
    width: 0.9rem;
    height: 0.9rem;
    display: block;
    float: left;
  }
  .cy .qcy dl dt img{
    width: 0.9rem;
    height: 0.9rem;
    display: block;
  }
  .cy .qcy dl dd{
    width: 0.7rem;
    color: #666666;
    display: block;
    font-size: 0.26rem;
    text-align: center;
    float: left;
    overflow: hidden;
  }
  .cy .qcy .qb{
    font-size: 0.28rem;
    color: #808080;
    position: relative;
    left: 2rem;
  }
  .cy .qcy .qb p{
    float:left;
  }
  .cy .qcy .qb span{
    display: block;
    float: left;
  }
</style>
