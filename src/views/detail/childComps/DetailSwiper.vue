<template>
  <!-- v-if="topImages.length > 0"是为了防止数据加载过慢导致轮播图不能滚动，即数据加载完才显示轮播图 -->
  <swiper class="detail-swiper" v-if="topImages.length > 0">
    <swiper-item v-for="(item,index) in topImages" 
                :key="index.item">
      <img :src="item" alt="" @load="imageSwiper">
    </swiper-item>
  </swiper>


</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    data(){
      return {
        count:0,
        imageLoadNum:0
      }
    },
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
    },
    mounted(){
      
    },
    methods:{
      // 1、轮播图图片加载之后进行scroll高度刷新
      imageSwiper(){
        this.count++;
        if(this.count === this.topImages.length){
        this.$emit('imageSwiper')
        // console.log(111);
        }
      },
      
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 250px;
    overflow: hidden;
  }
  
</style>