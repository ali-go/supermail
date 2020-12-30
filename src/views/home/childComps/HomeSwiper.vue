<template>
   <Swiper>
      <!-- 用v-for遍历轮播图数量来动态创建组件数 -->
      <SwiperItem v-for="(item,index) in banners" :key="index.item" >
        <!-- 轮播图数据获取来其实是一个跳转链接，地址是获取的数据中link的地址,注意动态绑定 -->
        <a :href="item.link">
          <!-- 具体的图片为获取的轮播图的image中的图片地址,注意动态绑定-->
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </SwiperItem>
    </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index'//导入轮播图的组件

export default {
  components:{
    Swiper,
    SwiperItem
  },
  props:{//由于该组件没有服务器获取的数据，因此用props从父组件获取数据
    banners:{
      type:Array,
      default(){//给一个默认值，因为当从父元素获取的类型是数组和对象时，默认值default必须是函数
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>