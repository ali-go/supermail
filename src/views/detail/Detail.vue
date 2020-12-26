<template>
  <div class="detail">
    <detail-nav-bar/>
    <scroll class="content">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
    </scroll>
  </div>
</template>

<script>
  // 组件事件的调用
  // 1、公共组件
  import Scroll from 'components/common/scroll/Scroll.vue';
  // 2、子组件
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
  import DetailShopInfo from './childComps/DetailShopInfo.vue';

  // import DetailBaseInfo from
  // 网络模块的调用
  import {getDetail,Goods,Shop} from 'network/detail';

  export default {
    name:'Detail',//此句话必须写，因为keep-alive用exclude是按这个索引的
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll
    },
    data(){
      return {
        id:null,
        topImages:[],
        goods:{},
        shop:{}
      }
    },
    created(){
      // 1、把动态id的数据从goodlistitem获取来
      this.id = this.$route.params.id
      // console.log(this.id);
      // 2、获取后后台的数据
      getDetail(this.id).then(res => {
        console.log(res);
        const data = res.result;
        // (1)、轮播图数据
        this.topImages = data.itemInfo.topImages
        // console.log(this.topImages);
        //（2）、商品基础数据
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // console.log(this.goods.columns[0]);
        // (3)、获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // console.log(this.shop);
      })
    },
  } 
</script>

<style scoped>
  .detail{
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>