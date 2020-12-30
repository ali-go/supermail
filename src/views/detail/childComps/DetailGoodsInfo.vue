<template>
  <div class="detail-goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc">
      <div class="start">▪———————</div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end">———————▪</div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index.item" 
          :src="item" alt="" @load="imageDetail">
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      detailInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        count:0,
        imageLoadNum:0
      }
    },
    methods:{
      // 此为方法一：通过内部判别是否已经加载到最后一张图再emit出去，这样只会传送一次出去，
      // 下面调用watch事件其实本质上可以省略，watch无非是每次有数据获取来就更新该事件，其实可以等全部加载再判断
    //   imageDetail(){
    //     this.count++;
    //     if(this.count === this.imageLoadNum){
    //       this.$emit('imageDetail')
    //     }
    //   }
    // },
    // watch:{
    //   detailInfo(){
    //     this.imageLoadNum = this.detailInfo.detailImage[0].list.length
    //   }
    // }

    // 方法二：直接把图片加载事件发送出去，然后外面调用防抖动
      imageDetail(){
        this.$emit('imageDetail')
      }
    }
  }
</script>

<style scoped>
  .detail-goods-info{
    margin: 20px 0;
  }
  .info-desc,
  .info-key{
    margin: 5px 10px;
  }
  .end{
    text-align: right;
  }
  .info-list img{
    width: 100%;
  }
</style>