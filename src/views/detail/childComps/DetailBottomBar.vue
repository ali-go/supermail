<template>
  <div class="bottom-bar">
    <div class="left">
      <div class="service">
        <img src="~assets/img/detail/service.png" alt="">
        <p>客服</p>
      </div>
      <div class="shop">
        <img src="~assets/img/detail/shop.png" alt="">
        <p>店铺</p>
      </div>
      <div class="collect">
        <img src="~assets/img/detail/collect.png" alt="">
        <p>收藏</p>
      </div>
    </div>
    <div class="cart" @click="addCartClick">加入购物车</div>
    <div class="buy">购买</div>
  </div>
</template>

<script>
  export default {
    methods:{
      addCartClick(){
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    height: 49px;
    background-color: #fff;
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    box-shadow: 0 -1px 1px #eee;
  }
  .left{
    flex: 2;
    display: flex;
    font-size: 15px;
  }
  .left img{
    width: 25px;
    height: 25px;
  }
  .service{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .shop{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
  .collect{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
  .cart{
    flex:1;
    text-align: center;
    line-height: 49px;
    background-color: yellow;
  }
  .buy{
    flex: 1;
    text-align: center;
    line-height: 49px;
    color: #fff;
    background-color: var(--color-tint);
  }
</style>