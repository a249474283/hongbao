<template>
<div class="app">
  <div class="header">
    <img src="../../assets/fanhui.png" @click="fanhui" >
    <span>
      设置
    </span>
  </div>
  <div class="password">
    <div class="word" @click="setword">
      <span>修改登录密码</span>
      <img src="../../assets/jinru.png">
    </div>
    <div class="word" @click="setpassword">
      <span>修改支付密码</span>
      <img src="../../assets/jinru.png">
    </div>
  </div>
   <div class="password">
    <div class="word">
      <span>已绑定手机号</span>
      <div class="num">**{{sj}}</div>
    </div>
    <div class="word">
      <span>当前版本</span>
      <div class="bb">{{banben}}</div>
    </div>
  </div>
  <div class="passwords">
    <div class="word" @click="jiancha">
      <span>检查更新</span>
      <img src="../../assets/jinru.png">
    </div>
  </div>
  <button class="login" @click="tuichu">退出登录</button>
 
</div>
  
</template>
<script>
const axios = require('axios');
import { Url } from "../../utils/config";
import { mui } from "../../../static/js/mui";
export default {
  mounted:function(){
    this.bbh();
    this.bdsjh();
  },
  data(){
    return{
      banben:"", 
      sj:""
    }
  },
  methods:{
    fanhui:function(){
      this.$router.back(-1);
    }, 
    setword:function(){
      this.$router.push({
        path:"/setword",
      })
    },
    setpassword:function(){
      this.$router.push({
        path:"/setpassword",
      })
    },
    bbh:function(){
      // var _this = this;
      // axios({
      //   method:"post",
      //   url:Url+"/apis/user/getSystemVersion",
      //   params:{

      //   }
      // }).then(function(res){
      //   _this.banben = res.data.data.version;
      // })
      var _this = this;
      plus.runtime.getProperty(plus.runtime.appid, function (inf) {
        _this.banben = inf.version;
      })
    },
    bdsjh:function(){
      var _this = this;
      var id = localStorage.getItem("Id");
      axios({
        url:Url+"/apis/user/getBindMobile",
        method:"post",
        params:{
          id:id
        }
      }).then(function(res){
        console.log(res)
        var str =  res.data.data.mobile;
        _this.sj = str.substring(7,11);
      })
    },

    jiancha(){
         var _this =this; 
      function installWgt(path){  
      plus.nativeUI.showWaiting("安装wgt文件...");  
      plus.runtime.install(path,{},function(){  
          plus.nativeUI.closeWaiting();  
          console.log("安装wgt文件成功！");  
          plus.nativeUI.alert("应用资源更新完成！",function(){  
              plus.runtime.restart();  
          });  
      },function(e){  
          plus.nativeUI.closeWaiting();  
          console.log("安装wgt文件失败["+e.code+"]："+e.message);  
          plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);  
      });  
      } 
        var btn = ["确定升级", "取消"];
    plus.runtime.getProperty(plus.runtime.appid, function (inf) {
      ver = inf.version;//当前版本
      var Url = 'http://hongbao.guotf.cn/'
      console.log(ver)
      
      axios.post(Url+'apis/common/checkVersion',{version:ver})
        .then((res) => {
          console.log(res.data.code)
          if (res.data.code==1) {
          	var rVer = res.data.data.version;
            var downurl = Url+res.data.data.url;

            var _msg = "发现新版本:" + rVer;
            _this.mui.confirm(_msg, '确认升级', btn, function (e) {
              if (e.index == 0) { //执行升级操作
                // plus.nativeUI.toast("正在准备环境，请稍后！");
                var dtask = plus.downloader.createDownload(downurl, {},
                  function (d,
                    status) {
                    if (status == 200) {
                      var path = d.filename; //下载apk
                      plus.runtime.install(path); // 自动安装apk文件
                      installWgt(path);// 安装wgt包
                      
                    } else {
                      plus.nativeUI.alert('版本更新失败:' + status);
                    }
                  });
                dtask.start();
                var showLoading = plus.nativeUI.showWaiting("正在下载");
                dtask.addEventListener("statechanged", function (task, status) { //给下载任务设置一个监听 并根据状态 ?做操作
                  switch (task.state) {
                    case 1:
                      showLoading.setTitle("正在下载");
                      break;
                    case 2:
                      showLoading.setTitle("已连接到服务器");
                      break;
                    case 3:
                      prg = parseInt(parseFloat(task.downloadedSize) / parseFloat(task.totalSize) *
                        100);
                      if (prg % 10 == 0) {
                        // 让百分比 10% 增长，如果这里不这么处理 ?出现 堆栈内存溢出的问题，有知道原因的大神指导一下哈
                        showLoading.setTitle("　　 已下载" + prg + "%　　 ");
                      }
                      break;
                    case 4:
                      plus.nativeUI.closeWaiting();
                      break;
                  }
                });
              }
            });
          } else {
            // console.log('当前版本号已是最新');
            alert("已经是最新版本");
            return;
          }
        })
    });



    },
    tuichu:function(){
      window.localStorage.removeItem("Id");
      this.$dialog.alert({
        message: '退出成功'
      }).then(()=>{
        this.$router.push({
          path:"/"
        })
      });
     
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
  .password{
    width: 100%;
    height: 1.94rem;
    background: #fff;
    margin-top: 0.4rem; 
  }
  .password .word{
    width: 100%;
    height: 0.97rem;
    border-bottom: 0.01rem solid #f7f7f7;
    position: relative;
    left: 1.05rem;
  }
  .password .word span{
    display: block;
    width: 1.7rem;
    height: 0.97rem;
    font-size: 0.28rem;
    color: #333333;
    float: left;
    line-height: 0.97rem;
    position: relative;
    left: -0.5rem;
  }
  .password .word img{
    display: block;
    width: 0.17rem;
    height: 0.29rem;
    float: right;
    position: relative;
    top: 0.4rem;
    right: 1.59rem;
  }
  .password .word .num{
    width: 0.8rem;
    height: 0.29rem;
    float: right;
    position: relative;
    top: 0.4rem;
    right: 1.59rem;
    font-size: 0.28rem;
    color: #808080;
  }
.password .word .bb{
    width: 0.8rem;
    height: 0.29rem;
    float: right;
    position: relative;
    top: 0.4rem;
    right: 1.59rem;
    font-size: 0.28rem;
    color: #808080;
    text-align:right;
  }
  .passwords{
    width: 100%;
    height: 0.97rem;
    background: #fff;
    margin-top: 0.4rem; 
  }
  .passwords .word{
    width: 100%;
    height: 0.97rem;
    position: relative;
    left: 1.05rem;
  }
  .passwords .word span{
    display: block;
    width: 1.7rem;
    height: 0.97rem;
    font-size: 0.28rem;
    color: #333333;
    float: left;
    line-height: 0.97rem;
    position: relative;
    left: -0.5rem;
  }
  .passwords .word img{
    display: block;
    width: 0.17rem;
    height: 0.29rem;
    float: right;
    position: relative;
    top: 0.4rem;
    right: 1.59rem;
  }

  .login{
    border: 0;
    width: 100%;
    height: 0.8rem;
    background: #fff;
    border-radius: 0.08rem;
    font-size: 0.28rem;
    color: #333;
  }
  .zhanwei{
    width: 100%;
    height: 6.57rem;
  }
</style>
