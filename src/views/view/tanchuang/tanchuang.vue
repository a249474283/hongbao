<template>
  <div class="app">
    <div class="hongbao">
      <img src="../../../assets/hong.png" alt="">
      <dl>
        <dt><img src="../../../assets/touxiang.png"></dt>
        <dd>沉默</dd>
      </dl>
      <p>亲,已经领完了！</p>
      <span class="ck">看看大家手气>></span>
      <div class="yuan">X</div>

    </div>
  </div>
</template>
<style>
  .hongbao{
    width: 100%;
    height: 8.08rem;
    position: relative;
    top: 1.7rem;
  }
  .hongbao dl{
    width: 0.8rem;
    height: 1.14rem;
    position: absolute;
    left: 3.37rem;
    top: 2.42rem;
  }
  .hongbao dl dt{
    width: 0.76rem;
    height: 0.76rem;
    margin: 0 auto;
  }
  .hongbao dl dt img{
    width: 0.76rem;
    height: 0.76rem;
  }
  .hongbao dl dd{
    width: 0.8rem;
    color: #FFE4B4;
    font-size: 0.28rem;
    text-align: center;
    margin-top: 0.2rem;
  }
  .hongbao p{
    font-size: 0.3rem;
    margin: 0 auto;
    color: #FFE4B4;
    position: relative;
    bottom: 3.51rem;
    left: 2.9rem;
  }
  .hongbao .ck{
    font-size: 0.28rem;
    margin: 0 auto;
    color: #FFE4B4;
    position: relative;
    bottom: 2.5rem;
    left: 2.9rem;
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
    left: 3.45rem;
    bottom: 0.4rem;
  }
</style>
