<template>
    <div class="app">
        <h1 class="bt">首页</h1>
        <div class="ts">
            <van-notice-bar
                color="#F45600"
                background="#E4C46D"
                left-icon="bell"
                @click="xxzx"
                v-show="shows"
                :text = "text"
            >
            

            </van-notice-bar>
        </div>
        <!-- 弹窗 -->

        <van-popup v-model="show" >
            <div class="gg">
                <img src="../assets/juxing.png" alt="">
                <h2>{{title}}</h2>
                <p>{{content}}</p>
                <button class="quer" @click="que">确认</button>
            </div>
        </van-popup>
        
        <a target="_blank" :href="kefuq+qq+kefuh">
            <div class="xiaoxi" @click="kefu">
            <img class="xiaoxi_left" src="../assets/kefu.png">
            <div class="xiaoxi_right">
                <h2>在线客服</h2>
                <div class="neiron">你好，任何疑问请联系我</div>
            </div>
            </div>
        </a>



        <div class="xiaoxi" :id="item.id" @click="qun" v-for="(item,key) of hblist" :key="key">
            <img class="xiaoxi_left" src="../assets/hongbao.png">
            <div class="xiaoxi_right">
                <div class="nc">
                    <h2>{{item.title}}</h2>
                    <span>{{item.add_time | formatTime(3)}}</span>
                </div>
                <div class="cm">{{item.user_nickname}}：[红包]</div>
            </div>
        </div>
    </div>
</template>
<script>
    const axios = require("axios");
    import { Url } from "../utils/config"
export default {
    mounted:function(){
        this.getxx();
        this.gonggao();
        this.gethbList();
        this.kefu();
    },
    data(){
        return{
            show: false,
            title:"",
            content:"",
            page:"0",
            hblist:[],
            text:"",
            shows:true,
            qq:'',
            kefuq:"http://wpa.qq.com/msgrd?v=3&uin=",
            kefuh:"&site=qq&menu=yes"
        }
  },
  methods:{
    fanhui:function(){
        this.$router.back(-1);
    },
    que:function(){
        this.show = false;
    },
    gonggao:function(){
        this.show = true;
        axios({
            url:Url+"/apis/common/getNotice",
            method:"post",
            params:{
            }
        }).then(function(res){
            this.title = res.data.data[0].title;
            this.content =res.data.data[0].content;
        }.bind(this))
    },
    getxx:function(){
        var _this = this;
        var id = localStorage.getItem("Id");
        axios({
            method:"post",
            url:Url+"/apis/user/getSystemMsgList",
            data:{
                user_id: 45,
                start:0,
                page_size:10,
                type:0
            }
        }).then(function(res){
            if(res.data.code == 1){
                for(var i = 0; i<res.data.data.length;i++){
                    _this.text += res.data.data[i].msg.title
                }
            }else{
                _this.shows = false;
            }
        })
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
            _this.hblist = res.data.data;
        })
    },
    xxzx:function(){
        this.$router.push({
            path:"/xxzx"
        })
    },
    qun:function(e){
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
    kefu:function(){
        var _this = this;
        axios({
            method:"post",
            url:Url+"/apis/user/getSystemQq",
        }).then(function(res){
            _this.qq = res.data.data.qq;
        })
    }
  }
}
</script>
<style scoped>
    .app{
        width: 100%;
        height: 12rem;
    }
    .bt{
        width: 100%;
        height: 0.87rem;
        text-align: center; 
        line-height: 0.87rem;
        font-size: 0.3rem;
        background: #fff;
    }
    .ts{
        width: 100%;
        height: 0.6rem;
        background-color: #E4C46D;
    }
    .tongzhi{
        margin-left: 0.47rem;
        display: block;
        width: 0.26rem;
        height: 0.32rem;
        float: left;
        margin-top:0.14rem; 
    }
    .tz{
        float: left;
        font-size: 0.24rem;
        color: #F45600;
        line-height: 0.6rem;
    }
    /* 公告 */
    .gg{
        width: 5.16rem;
        height: 6.18rem;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        top: -0.5rem;
     }
  .gg img{
    display: block;
    width: 100%;
  }
  .gg h2{
    width: 100%;
    color: #FC624E;
    font-size: 0.36rem;
    position: absolute;
    bottom: 3rem;
    text-align: center;
  }
  .gg p{
    color: #717171;
    font-size: 0.26rem;
    position: relative;
    bottom: 0.2rem;
    width: 4rem;
    margin: 0 auto;
  }

  .quer{
    width: 1.73rem;
    height: 0.52rem;
    color: #fff;
    font-size: 0.26rem;
    border: 0;
    background: linear-gradient(#FC5D4C,#FC8E5E);
    position: absolute;
    bottom: 0.5rem;
    left: 1.66rem;;
  }

    .xiaoxi{
        width: 100%;
        height: 1.47rem;
        margin-top: 0.3rem; 
        background: #fff;
    }
    .xiaoxi .xiaoxi_left{
        display: block;
        width: 0.96rem;
        height: 0.96rem;
        margin-left: 0.49rem;
        margin-top: 0.26rem;
        float: left;
    }
    .xiaoxi .xiaoxi_right{
        margin-left: 0.3rem;
        width: 5.5rem;
        height: 1.1rem; 
        float: left;
        margin-top: 0.37rem; 
    }
    .xiaoxi .xiaoxi_right h2{
        font-size: 0.3rem;
        color: #393939;
        height: 0.5rem;
    }
    .xiaoxi .xiaoxi_right .neiron{
        font-size: 0.25rem;
        color: #808080;
    }
    .xiaoxi .xiaoxi_right .nc{
        width: 4.5rem;
       
    }
    .xiaoxi .xiaoxi_right .nc h2{
        font-size: 0.3rem;
        color: #393939;
        width: 2.5rem;
        float: left;
    }
    .xiaoxi .xiaoxi_right .neiron{
        font-size: 0.25rem;
        color: #808080;
        display: block;
        float: left;
    }
    .cm{
        font-size: 0.25rem;
        color: #808080;
        float: left;
        position: relative;
        right: 2.5rem;
        top: 0.2rem;
        width: 3rem;
        height: 0.3rem;
        overflow: hidden;
    }
    .xiaoxi .xiaoxi_right .nc span{
        font-size: 0.2rem;
        width: 0.1rem;
        color: #808080;
        display: block;
        float: right;
        margin-top: 0.05rem;
        margin-right: 0.5rem;
    }
    
</style>
