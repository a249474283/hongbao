<template>
    <div class="app">
        
        <div class="header">
            <img src="../../assets/fanhui.png" @click="fanhui">
            <span class="biaoti">
                {{title}}
            </span>
                <span class="iconfont icon-icon-test gengduo" @click="xq"></span>
        </div>


        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="neirong" id="chatContainer" >
             <div class="hongbaoa" v-for="(item,key) of hblist" :key="key" >
                <van-button type="primary" v-if="!item.bao_id" @click="showPopup(item)" class="tan" :id="item.id">
                    <div class="xiaoxi" >
                        <img class="toux" :src="url+item.head_img" alt="">
                        <div class="hongb">
                            <span class="nickname">{{item.user_nickname}}</span>
                            <img src="../../assets/zu.png">
                            <span id="qian">{{item.money*1}}-{{item.lei_number}}</span>

                            <span id="lingqu">领取红包</span>
                        </div>
                    </div>
                </van-button>
                <div class="tsbox" v-else>
                    <div class="ts">
                        恭喜 {{item.user_nickname}} {{item.money}}-{{item.lei_number}}中奖，奖励12.34+6.66元
                    </div>
                    
                </div>
                <van-popup v-model="show">
                    <div class="hongbaoo">
                        <img src="../../assets/hong.png" alt="">
                        <dl>
                            <dt><img :src="url+fimg"></dt>
                            <dd>{{fnickname}}</dd>
                        </dl>
                        <p>亲,已经领完了！</p>
                        <span @click="xiangqing" class="ck">看看大家手气>></span>
                        <div class="yuan" @click="gb">X</div>
                    </div>
                </van-popup>
                
             </div>
              <div class="position-box"></div>
            </div>
        </van-pull-refresh>
        <!-- 以上是下拉刷新 -->
        <ul class="floot">
            <li class="yue">余额：{{yue}}</li>
            <li  @click="fahb">
                <img src="../../assets/xbao.png" >
                <span>发红包</span>
            </li>
        </ul>
    </div>
    
</template>
<script>
    const axios = require('axios');
    import { Url } from "../../utils/config";
    let Base64 = require('js-base64').Base64;
    // import VueChatScroller from 'vue-chat-scroller';
   
export default {
    mounted(){
        this.getqunxxone();
        this.getqunxx();
        this.getyue();
        // window.addEventListener("scroll", this.scrollBottom,true);
    },
    data(){
        return{
            show: false,
            qun_id:"",
            hblist:[],
            title:"",
            yue:"",
            zhongjiang:true,
            url:Url,
            fimg:"",
            fnickname:"",
            hbid:"",
            quna:"",//全局的计时器
            num:0,//页数
            count: 0,
            isLoading: false,
            biaoji:true,//是否到最低层
        }
    },
    methods:{
        gb:function(){
            this.show = false;
        },
        fanhui:function(){
            this.$router.back(-1);
        },
        xiangqing:function(){
            var _this = this;
            console.log(_this.hbid)
            this.$router.push({
                name:"Lqxq",
                params:{
                    id:_this.hbid
                }
            })
            console.log(1)
        },
        fahb:function(){
            var _this = this;
            console.log(_this.qun_id)
            this.$router.push({
                name:"Fhb",
                params:{
                    id:_this.qun_id
                }
            })
        },
        showPopup(val) {
            console.log(val);
            this.hbid = val.id
            var _this = this;
            var id = localStorage.getItem("Id");
            axios({
                method:"post",
                url:Url+"/apis/user/existHongBao",
                params:{
                    bao_id:_this.hbid
                }
            }).then(function(res){
                console.log(res)
                console.log(res.data.code)
                // 判断红包是否被领完
                if(res.data.code == 2 ){
                    //红包被领完了
                    console.log(res.data)
                    _this.fimg = res.data.data.head_img;
                    _this.fnickname = res.data.data.user_nickname;
                    _this.show = true;

                }else if(res.data.code == 1){
                    axios({
                        method:"post",
                        url:Url+"/apis/user/getUserBao",
                        params:{
                            bao_id:_this.hbid,
                            user_id:id
                        }
                    }).then(function(res){
                        console.log(res)
                        if(res.data.code == 1|| res.data.code == 3){
                            _this.$router.push({
                                name:"Lqxq",
                                params:{
                                    id:_this.hbid
                                }
                            })
                        }else{
                            _this.$dialog.alert({
                                message: res.data.msg
                            });
                        }
                    })
                    // sadegfsgv
                }
            })

        },
        // 获取群里的信息
    getqunxx:function(){
        this.quna = setInterval(()=>{
            this.qun_id = this.$route.params.id;
            var id = localStorage.getItem("Id");
            var _this = this;
            axios({
                url:Url+"/apis/user/getHongBaoList",
                method:"post",
                data:{
                    id:_this.qun_id,
                    user_id:id,
                }
            }).then(function(res){
                console.log(res.data.data.bao_list);
                if(res.data.code == 1){
                    for(var i = 0; i < res.data.data.bao_list.length;i++){
                        _this.hblist.shift(res.data.data.bao_list[i]);
                    }
                }
                 _this.$nextTick(function(){
                        if(_this.biaoji&&res.data.data.bao_list){
                            document.getElementsByClassName('position-box')[0].scrollIntoView();
                        }
                })
            })
        },3000)
         },
         getqunxxone:function(){
            this.qun_id = this.$route.params.id;
            var id = localStorage.getItem("Id");
            var _this = this;
            axios({
                url:Url+"/apis/user/getHongBaoList",
                method:"post",
                data:{
                    id:_this.qun_id,
                    user_id:id,
                    start:0,
                    page_size:10,
                }
            }).then(function(res){
                console.log(res.data.data.bao_list);
                console.log(res.data)
                _this.title = res.data.data.qun_info.title;
                if(res.data.code == 1){
                    for(var i = 0; i < res.data.data.bao_list.length;i++){
                        _this.hblist.unshift(res.data.data.bao_list[i]);
                    }
                     _this.$nextTick(function(){
                            document.getElementsByClassName('position-box')[0].scrollIntoView();
                })
                }
            })
         },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
      this.biaoji = false;
      var _this = this;
      this.num++;
       this.qun_id = this.$route.params.id;
            var id = localStorage.getItem("Id");
            var _this = this;
            axios({
                url:Url+"/apis/user/getHongBaoList",
                method:"post",
                data:{
                    id:_this.qun_id,
                    user_id:id,
                    start:this.num,
                    page_size:10,
                }
            }).then(function(res){
                console.log(res.data.data.bao_list);
                if(res.data.code == 1){
                    for(var i = 0; i < res.data.data.bao_list.length;i++){
                        _this.hblist.unshift(res.data.data.bao_list[i]);
                    }
                }
            })
        },
        xq:function(){
            var _this = this;
            this.$router.push({
                name:"Qxx",
                params:{
                    id:_this.qun_id
                }
            })
        },
        getyue:function(){
            var _this = this;
            var id = localStorage.getItem("Id");
             axios({
                url:Url+"/apis/user/getUserInfo",
                method:"post",
                data:{
                    id:id,
                }
            }).then(function(res){
                console.log(res);
                _this.yue = res.data.data.user_money;
                 console.log(_this.yue);
            })
        },
    },
    
    beforeDestroy(){
        clearInterval(this.quna);
    },
    
  

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
        position: fixed;
        top: 0;
        z-index: 6;
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
    .header .biaoti {
      display: block;
      width: 100%;
      font-size: 0.3rem;
      line-height: 0.87rem;
      text-align: center;
      color: #040404;
      position: absolute;
    }
    .header .gengduo{
        font-size: 0.4rem;
        position: absolute;
        top: 0.19rem;
        right: 0.25rem;
        z-index: 10;
    }
    .header p img{
        display: block;

        position: relative;
        bottom: 0.24rem;
    }
    .neirong{
        width: 100%;
        padding-top: 1rem;
    }
    .neirong .xiaoxi{
        width: 100%;
        height: 3.3rem;
        background-color: #f7f7f7;
    }
    .neirong .xiaoxi .toux{
        display: block;
        width: 0.86rem;
        height: 0.86rem;
        float: left;
        margin-top: 0.7rem;
        margin-left: 0.9rem;
    }
    .tan{
        width: 100%;
        background: none;
        height: 3.3rem;
        border: 0;
    }
    .neirong .xiaoxi .hongb{
        margin-top: 0.7rem;
        width: 4.8rem;
        height: 2.0rem;
        float: left;
    }
    .neirong .xiaoxi .hongb .nickname{
        display: block;
        height: 0.25rem;
        color: #808080;
        float: left;
        font-size: 0.24rem;
        position: relative;
        bottom: 0.3rem;
        left: 0.2rem;
    }
    .neirong .xiaoxi .hongb img{
        display: block;
        height: 4.48rem;
        height: 1.6rem;
        float: left;
    }
    .neirong .tsbox{
        width: 100%;
        height: 0.42rem;
    }
    .neirong .ts{
        width: 6rem;
        height: 0.42rem;
        margin: 0 auto;
        background-color: #d9d9d9; 
        font-size: 0.2rem;
        color: #F32B21;
        text-align: center;
        line-height: 0.42rem;
        
    }

    /* 弹窗部分 */
  .hongbaoo{
    width: 100%;
    position: relative;
    margin: 0 auto;
    background: rgba(74,74,74);
    overflow: hidden;
  }
  .hongbaoo img{
      width: 5.3rem;
  
      display: block;
      margin: 0 auto;
  }
  .hongbaoo dl{
    width: 100%;
    height: 1.5rem;
    position: absolute;

    top: 1rem;
  }
  .hongbaoo dl dt{
    width: 0.76rem;
    height: 0.76rem;
    margin: 0 auto;
  }
  .hongbaoo dl dt img{
    width: 0.76rem;
    height: 0.76rem;
  }
  .hongbaoo dl dd{
    width: 100%;
    color: #FFE4B4;
    font-size: 0.28rem;
    text-align: center;
    margin-top: 0.2rem;
  }
  .hongbaoo p{
    font-size: 0.3rem;
    color: #FFE4B4;
    position: relative;
    bottom: 3.51rem;
    width: 100%;
    text-align: center
  }
  .hongbaoo .ck{
    font-size: 0.28rem;
    display: block;
    width: 100%;
    color: #FFE4B4;
    position: relative;
    bottom: 1.5rem;
    text-align: center;
  }
  .yuan{
    width: 0.56rem;
    height: 0.56rem;
    border: 0.04rem solid #FE452B;
    color: #FE452B;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.56rem;
    border-radius: 0.56rem;
    position: relative;
    left: 2.3rem;
    bottom: 0.4rem;
  }
    #qian{
        width: 2rem;
        height: 0.5rem;
        color: #fff;
        display: block;
        font-size: 0.28rem;
        line-height: 0.5rem;
        position: relative;
        bottom: 1.4rem;
        left: 1.3rem;
        text-align: left;
    }
    #lingqu{
        width: 2rem;
        height: 0.5rem;
        color: #fff;
        display: block;
        font-size: 0.28rem;
        line-height: 0.5rem;
        position: relative;
        bottom: 1rem;
        left:0.8rem;
    }

    /* 页脚 */
    .floot{
        width: 100%;
        height: 1rem;
        background: #fff;
        position: fixed;
        bottom: 0rem;
        z-index: 44;
    }
    .floot li{
        width: 49%;
        height: 1rem;
        float: left;
        font-size: 0.24rem;
        color: #565656;
        text-align: center;
        line-height: 1rem;
    }
    .floot .yue{
        border-right: 1px solid #D6D4D3;
    }
    .floot li img{
        display: block;
        width: 0.18rem;
        height: 0.2rem;
        position: relative;
        top: 0.4rem;
        left: 1.2rem;
    }
    .floot li span{
        position: relative;
        bottom: 0.2rem;
    }
</style>
