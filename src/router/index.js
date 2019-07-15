import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login.vue'         //登录
import Regis from '../views/regis.vue'         //注册
import Index from '../views/index.vue'         //首页 *
import Tuiguang from '../views/tuiguang.vue'   //推广*
import Qun from '../views/view/qun.vue'        //红包群
import Lqxq from '../views/view/lqxq.vue'       //领取详情
import Tgewm from '../views/view/tgewm.vue'     //推广二维吗
import Tglb from '../views/view/tglb.vue'       //推广列表
import Tjyhk from '../views/view/tjyhk.vue'     //添加银行卡
import Tx from '../views/view/tx.vue'           //提现 *
import Setpassword from '../views/view/setpassword.vue' //设置支付密码
import Setup from '../views/view/setup.vue'  //设置   *
// import Qidong from '../views/qidong.vue'   //启动
import Qxx from '../views/view/qxx.vue'   //群信息
import Cz from '../views/view/cz.vue' //充值
import Tc from '../views/view/tanchuang/tanchuang.vue' //弹窗
import Fhb from '../views/view/fhb.vue'  //发红包
import Information from '../views/information.vue' //个人信息*
import Wd from '../views/wd.vue' //我的 *
import Gg from '../views/view/tanchuang/gonggao.vue' //公告
import Yemx from '../views/view/yemx.vue' //余额明细*
import Yjphb from '../views/view/yjphb.vue'  //佣金排行榜
import Game from '../views/game.vue'  //游戏*
import Xxzx from '../views/view/xxzx.vue'  //消息中心*
import Setword from '../views/view/setword.vue'  //修改密码
import Wjmm from '../views/view/wjmm.vue'   //忘记密码
import Yjlb from '../views/view/yjlb.vue'       //佣金列表
import Wdskh from '../views/view/wdskh.vue'  //我的收款号
import Xxxq from '../views/view/xxxq.vue'   //消息详情
import Yxgz from '../views/view/yxgz.vue'   //游戏规则
import Xgnc from '../views/view/setnickname.vue'//修改昵称
import Jlxx from '../views/view/jlxx.vue' //奖励信息
import Setname from '../views/view/setname.vue' //奖励信息
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path:'/',
    //   name:'Qidong',
    //   component:Qidong
    // },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/regis',
      name: 'Regis',
      component: Regis
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path:'/xxzx',
      name:'Xxzx',
      component:Xxzx
    },
    {
      path: '/tuiguang',
      name: 'Tuiguang',
      component: Tuiguang
    },
    {
      path: '/qun/:id',
      name:'Qun',
      component: Qun
    },
    {
      path: '/lqxq/:id',
      name:'Lqxq',
      component: Lqxq
    },
    {
      path: '/tgewm',
      name:'Tgewm',
      component: Tgewm
    },
    {
      path:'/tglb',
      name:'Tglb',
      component:Tglb
    },
    {
      path:'/tjyhk',
      name:'Tjyhk',
      component:Tjyhk
    },
    {
      path:'/tx',
      name:'Tx',
      component:Tx
    },
    {
      path:'/setpassword',
      name:'Setpassword',
      component:Setpassword
    },
    {
      path:'/setup',
      name:'Setup',
      component:Setup
    },
    {
      path:'/setname',
      name:'Setname',
      component:Setname
    },
    {
      path:'/yjlb',
      name:'Yjlb',
      component:Yjlb
    },
    {
      path:'/qxx/:id',
      name:'Qxx',
      component:Qxx
    },
    {
      path:'/cz',
      name:'Cz',
      component:Cz
    },
    {
      path:'/tc',
      name:'Tc',
      component:Tc
    },
    {
      path:'/gg',
      name:'Gg',
      component:Gg
    },
    {
      path:'/fhb/:id',
      name:'Fhb',
      component:Fhb
    },
    {
      path:'/information',
      name:'Information',
      component:Information
    },
    {
      path:'/wd',
      name:'Wd',
      component:Wd
    },
    {
      path:'/yemx',
      name:'Yemx',
      component:Yemx
    },
    {
      path:'/setword',
      name:'Setword',
      component:Setword
    },
    {
      path:'/yjphb',
      name:'Yjphb',
      component:Yjphb
    },
    {
      path:'/wjmm',
      name:'Wjmm',
      component:Wjmm
    },
    {
      path:'/wdskh',
      name:'Wdskh',
      component:Wdskh
    },
    {
      path:'/xxxq/:id',
      name:'Xxxq',
      component:Xxxq
    },
    {
      path:'/yxgz',
      name:'Yxgz',
      component:Yxgz
    },
    {
      path:'/xgnc',
      name:'Xgnc',
      component:Xgnc
    },
    {
      path:'/jlxx',
      name:'Jlxx',
      component:Jlxx
    }
  ],
  mode:"hash"
})
