  <template>
    <div class="app">
      <div class="header">
        <img src="../../assets/fanhui.png" @click="fanhui" >
          <span>
            充值
          </span>
      </div>
      <div class="h2">客服直充</div>
      <div class="czcz">
        <div class="ye">
          <span>当前余额</span>
          <p>{{money}}</p>
        </div>
        <div class="cz">
          <span>充值金额</span>
          <input type="text" placeholder="请输入充值金额" @blur="czje">
        </div>
      </div>
      <button id="sub" @click="sub">提交订单</button>

    </div>
  </template>
  <script>
    const axios = require('axios');
    import { Url } from '../../utils/config';
  export default {
    mounted:function(){
      this.getye();
    },
    data(){
      return{
        money:"",
        cz:""
      }
    },
    methods:{
      fanhui:function(){
        this.$router.back(-1);
      },
      getye:function(){
        var id = localStorage.getItem("Id");
        var _this = this;
        axios({
          method:"post",
          url:Url+"/apis/user/getUserMoneyCount",
          data:{
            id:id,
          }
        }).then(function(res){
          console.log(res)
          if(res.data.code == 1){
            _this.money = res.data.data.money;
          }
        })
      },
      czje:function(e){
        this.cz = e.srcElement.value;
      },
      sub:function(){
        var id = localStorage.getItem("Id");
        var _this = this;
        axios({
          method:"post",
          url:Url+"/apis/user/saveUserMoneyAdd",
          data:{
            user_id: id,
            change_money: _this.cz,
            acc_type: 3,
          }
        }).then(function(res){
          console.log(res)
          if(res.data.code == 1){
            _this.$dialog.alert({
              message: res.data.msg
            }).then(
              _this.$router.push({
                path:"/information"
              })
            );
            
          }else{
            _this.$dialog.alert({
              message: res.data.msg
            });
          }
        })
      }
    }
  }
  </script>
  <style scoped>
    .app{
      width: 100%;
      height: 100%;
      position: absolute
    }
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
    .h2{
      width: 100%;
      height: 0.88rem;
      color: #040404;
      font-size: 0.3rem;
      line-height: 0.88rem;
      margin-left: 0.54rem;
    }
    .czcz{
      width: 100%;
      height: 1.9rem;
      background: #fff;
    }
    .czcz .ye,.czcz .cz{
      width: 100%;
      height: 0.85rem;
    }
    .czcz .ye span,.czcz .cz span{
      display: block;
      width: 1.2rem;
      height: 0.85rem;
      float: left;
      font-size: 0.28rem;
      color: #333;
      line-height: 0.85rem;
      position: relative;
      left: 0.56rem;
    } 
    .czcz .ye p{
      width: 2rem;
      height: 0.85rem;
      float: left;
      font-size: 0.28rem;
      color: #F14529;
      position: relative;
      left: 0.98rem;
      line-height: 0.85rem;
    }
    .czcz .cz input{
      width: 4rem;
      float: left;
      font-size: 0.28rem;
      position: relative;
      left: 0.98rem;
      top: 0.25rem;
      border: 0;
    }
    #sub{
      width: 5.87rem;
      height: 0.8rem;
      background: #08C161;
      color: #fff;
      font-size: 0.28rem;
      border: 0;
      border-radius: 0.08rem;
      position: relative;
      top: 1.06rem;
      left: 0.82rem;
    } 
  </style>