import Vue from 'vue'
import Vant from 'vant' // 引入已安装好的 Vant ui 这个插件
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import {axios} from "axios"
import { Icon } from 'vant';
import { Pagination } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import VueRouter from 'vue-router';
import { Popup } from 'vant';
import { Dialog } from 'vant';
import VueChatScroller from 'vue-chat-scroller';
import mui from '../src/js/mui'
import MescrollVue from 'mescroll.js/mescroll.vue'

Vue.prototype.mui = mui
Vue.use(VueChatScroller);
Vue.use(Dialog);
Vue.use(Popup);
Vue.use(VueRouter);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Pagination);
Vue.use(Icon);
Vue.prototype.$ajax = axios
Vue.use(Vant);
Vue.config.productionTip = false
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
const eventBus = new Vue();
Vue.config.productionTip = false;
Vue.prototype.$eventBus = eventBus;
// import Vant from 'vant'
// import 'vant/lib/index.css'
// // Vue.config.productionTip = false
// Vue.use(Vant)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName('html')[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 750) {
    htmlWidth = 750;
  }
  if (htmlWidth <= 320) {
    htmlWidth = 320;
  }
  htmlDom.style.fontSize = `${htmlWidth / 7.5}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();

//元素的补零计算
function addZero(val) {
  if (val < 10) {
      return "0" + val;
  } else {
      return val;
  }
};
Vue.filter("formatTime", function (value, type) { 
  var dataTime = "";
  var data = new Date();
  data.setTime(value);
  var year = data.getFullYear();
  var month = addZero(data.getMonth() + 1);
  var day = addZero(data.getDate());
  var hour = addZero(data.getHours());
  var minute = addZero(data.getMinutes());
  var second = addZero(data.getSeconds());
  if (type == 1) {
      dataTime = year + "-" + month + "-" + day;
  } else if (type == 2) {
      dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
  } else if (type == 3) {
      dataTime = hour + ":" + minute;
  } else if (type == 4) {
      dataTime = year + "-" + month;
  } else if (type == 5 ){
    dataTime = hour + ":" + minute + ":" + second;
  }
  return dataTime; //将格式化后的字符串输出到前端显示

});


// document.addEventListener('plusready', function() {
//   var _this = this;
//   var webview = plus.webview.currentWebview();
//   plus.key.addEventListener('backbutton', function() {
//       webview.canBack(function(e) {
//           if(e.canBack) {
//             console.log(_this)
//             history.go(-1);
//           } else {
//               //webview.close(); //hide,quit
//               //plus.runtime.quit();
//               //首页返回键处理
//               //处理逻辑：1秒内，连续两次按返回键，则退出应用；
//               var first = null;
//               plus.key.addEventListener('backbutton', function() {
//                   //首次按键，提示‘再按一次退出应用’
//                   if (!first) {
//                       first = new Date().getTime();
//                       console.log('再按一次退出应用');
//                       setTimeout(function() {
//                           first = null;
//                       }, 1000);
//                   } else {
//                       if (new Date().getTime() - first < 1500) {
//                           plus.runtime.quit();
//                       }
//                   }
//               }, false);
//           }
//       })
//   });
// });
