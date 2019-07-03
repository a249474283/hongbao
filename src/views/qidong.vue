<template>
  <div class="app">
    <img class="chang" src="../assets/chang.png">
    <div class="cx">畅想</div>
    <p>畅 / 享 / 生 / 活</p>
    <button class="ty" @click="ty">
      立即体验
    </button>
  </div>

</template>
<script>
    const axios = require("axios");
    import { Url } from "../utils/config"
export default {
  mounted:function(){
  },
  data(){
    return{
      
    }
  },
  methods:{
    ty:function(){
      this.$router.push({
        path:"/login"
      })
    }
  }
}
</script>
<style scoped>
  .app{
    width: 100%;
    height: 13.34rem;
    background-image: url(../assets/beijing.png);
  }
  .chang{
    width: 1.45rem;
    height: 1.45rem;
    display: block;
    position: relative;
    top: 2.98rem;
    margin: 0 auto;
  }
  .cx{
    width: 100%;
    font-size: 0.4rem;
    color: #fff;
    position: relative;
    top: 3.3rem;
    text-align: center;
  }
  p{
    color: #fff;
    font-size: 0.3rem;
    width: 100%;
    text-align: center;
    position: relative;
    top: 3.58rem;

  }
  .ty{
    display: block;
    width: 2.2rem;
    height: 0.6rem;
    background-color: rgba(255,255,255,0);
    border:1px solid #fff;
    color: #fff;
    font-size: 0.3rem;
    border-radius: 0.08rem;
    position: relative;
    top: 7.28rem;
    margin: 0 auto;
  }
</style>
