<template>
  <!-- v-if="topImages.length > 0"是为了防止数据加载过慢导致轮播图不能滚动，即数据加载完才显示轮播图 -->
  <swiper class="detail-swiper" v-if="topImages.length > 0">
    <swiper-item v-for="(item,index) in topImages" 
                :key="index.item">
      <img :src="item" alt="" v-show="true">
    </swiper-item>
  </swiper>


</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 250px;
    overflow: hidden;
  }
  
</style>