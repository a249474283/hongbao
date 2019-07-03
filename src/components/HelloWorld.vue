<template>
   <div class="hader">
     <h1 class="bt">首页</h1>
   </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0;
  padding: 0;
}
  .hader{
    width: 100%;
    height: 87px;
  }
  .bt{
    font-size: 28px;
    text-align: center;
    line-height: 87px;
  }
</style>
