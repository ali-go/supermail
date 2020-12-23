<template>
  <div class="goods-list-item">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div class="goods-list-item-text">
      <p class="title">{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      // 1、发送事件总线，当图片每加载一次就发送一次
      imageLoad(){
      this.$bus.$emit('itemImageLoad')
      }
    }
  }
</script>

<style scoped>
  .goods-list-item{
    position: relative;
    width: 48%;
    padding-bottom: 45px;
    
  }
  .goods-list-item-text{
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    font-size: 12px;
    text-align: center;
  }
  .goods-list-item img{
    /* width: 45%; */
    width: 100%;
  }
  .title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price,.collect{
    margin: 0 10px;
  }
  .price{
    color: red;
  }
  .collect{
    position: relative;
  }
  .collect::before{
    position: absolute;
    top: 0;
    left: -14px;
    content:'';
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/favor.png');
    background-size: 14px;
  }
</style>