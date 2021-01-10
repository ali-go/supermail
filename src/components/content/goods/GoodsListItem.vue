<template>
<!-- 图片懒加载的地方:src改成v-lazy -->
  <div class="goods-list-item" @click="listItem">
    <img v-lazy="showImg" alt="" @load="imageLoad">
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
    computed:{
      showImg(){
        return  this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img 
      }
    },
    methods:{
      // 1、发送事件总线，当图片每加载一次就发送一次
      imageLoad(){
      this.$bus.$emit('itemImageLoad')
      // console.log('----');
      },
      // 2、点击跳转详情页
      listItem(){
        this.$router.push('/detail/' + (this.goodsItem.iid || this.goodsItem.item_id))
        //this.goodsItem.item_id为detail页面的推荐图的id获取，但是那些图目前还没数据，因此无法跳转渲染页面
        // console.log(this.goodsItem);
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