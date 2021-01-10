<template>
  <div class="detail">
    <detail-nav-bar @tabClick="tabClick" ref="navBar"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3" >
      <detail-swiper :top-images="topImages" @imageSwiper="imageSwiper" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageDetail="imageDetail"/>
      <detail-param-info :param-info="paramInfo" @imageParam="imageParam" ref="param"/>
      <detail-commend-info :commend-info="commendInfo" ref="commend"/>
      <goods-list :goods="recommendInfo" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" v-if="Object.keys(goods).length" />
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  // 组件事件的调用
  // 1、公共组件
  import Scroll from 'components/common/scroll/Scroll.vue';
  import GoodsList from 'components/content/goods/GoodsList.vue';
  import BackTop from 'components/content/backtop/BackTop'//导入返回顶部组件

 
  // 2、子组件
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
  import DetailShopInfo from './childComps/DetailShopInfo.vue';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
  import DetailParamInfo from './childComps/DetailParamInfo.vue';
  import DetailCommendInfo from './childComps/DetailCommendInfo.vue';
  import DetailBottomBar from './childComps/DetailBottomBar.vue';


  // 3、导入的其他方法
  import {getDetail,getRecommends,Goods,Shop,GoodsParam} from 'network/detail';
  import {debounce} from 'common/utils'//导入防抖动函数debounce
  import {itemLinstnerMinxin,backTopMinxin} from 'common/mixin'//导入混入的公共代码
  import {HIGH_BACK} from 'common/const' //导入返回顶部的显示时高度，固定常量

  export default {
    name:'Detail',//此句话必须写，因为keep-alive用exclude是按这个索引的
    components:{
      Scroll,
      GoodsList,
      // BackTop, //放在混入
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommendInfo,
      DetailBottomBar
    },
    data(){
      return {
        id:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commendInfo:{},
        recommendInfo:[],
        tabOffsetTop:[],
        getThemeTopY:null,
        currentIndex:0, //用来控制滚动页面时滚动到navbar第几个index
        // isShowBackTop:false //放在混入中
      }
    },
    mixins:[itemLinstnerMinxin,backTopMinxin],
    created(){
      // 1、把动态id的数据从goodlistitem获取来
      this.id = this.$route.params.id
      // console.log(this.id);
      // 2、获取后后台的数据
      getDetail(this.id).then(res => {
        // console.log(res);
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
        // (4)、获取详情页图片展示
        this.detailInfo = data.detailInfo
        // (5)、获取尺码等规格信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // (6)、获取评论信息
        if(data.rate.cRate !== 0 ){
          this.commendInfo = data.rate.list[0]
        }

      }),
      // 3、获取推荐信息
      getRecommends().then(res => {
        this.recommendInfo = res.data.list
        // console.log(this.recommendInfo);
      }).catch(err => {
        console.log(err);
      })

      // 4、对获取offsetTop值进行debounce防抖封装(然后再效果图加载完成处调用)
      this.getThemeTopY = debounce(() => {
        if((this.$refs.param && this.$refs.commend && this.$refs.recommend)){
          this.tabOffsetTop=[]
          this.tabOffsetTop.push(0);//把tabOffsetTop[]赋值为index对应的offsetTop
          this.tabOffsetTop.push(this.$refs.param.$el.offsetTop)
          this.tabOffsetTop.push(this.$refs.commend.$el.offsetTop)
          this.tabOffsetTop.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.tabOffsetTop);
        }
      })
    },
    
    methods:{
      // (1)、轮播图刷新高度
      imageSwiper(){
        this.$refs.scroll.refresh()
      },

      // （2）、效果图刷新高度
      // 此为方法一：对应相应组件内部代码（已注释）
      // imageDetail(){
      //   this.$refs.scroll.refresh()
      // },
      // 此为方法二：直接调用防抖动
      imageDetail(){
        this.newFresh()//该代码为混入代码中的防抖动代码
        this.getThemeTopY()//关于获取各栏的offsetTop在这里调用（即效果图加载完成处）
      },

      // （3）、参数带图的刷新高度
      imageParam(){
        this.$refs.scroll.refresh()
      },

      // （4）、防抖函数
      // (防抖函数从utils导入)
      // debounce(fn,delay){
      //   let timer = null; 
      //   return function (...args){
      //     if(timer){
      //       clearTimeout(timer)
      //     } 
      //     timer = setTimeout(() => {
      //       fn.apply(this,args)
      //     },delay)
      //   }
      // }

      // （5）、用于点击tabControl的index时跳转时选择相应的索引号元素进行跳转高度
      tabClick(index){
        this.$refs.scroll.scrollTo(0,-this.tabOffsetTop[index],500)
        // console.log(index);
      },
      // (6)接收scroll的滚动事件(调用时一定要记住probetype传值)
      contentScroll(position){
        const positionY = -position.y
        let length = this.tabOffsetTop.length
        // 遍历tabOffsetTop数组，获取相应navbar子组件的高度
        for(let i = 0;i < this.tabOffsetTop.length; i++){
          if(this.currentIndex !== i && (
            // this.currentIndex !== i该条件是为了只获取一次，而不是重复调用if内的操作
            // 分两种情况，第一i<length-1，第二种i===length-1
            (i < length - 1  && positionY >= this.tabOffsetTop[i] && positionY < this.tabOffsetTop[i + 1])
          || (i === length-1 && positionY >= this.tabOffsetTop[i]))){
            this.currentIndex = i 
            // console.log(i);
            this.$refs.navBar.currertIndex = this.currentIndex

            // 其实设置滚动到高度navbar相应切换还有第二种方法，即把ttabOffsetTop  push第五个元素
            // 设为number.MAX_VALUE,如此上面就无须分两种类型判断了，但注意for循环时i<length-1,具体操作略
          }
        }

        // 判断back-top是否显示(调用混入内的代码)
        this.showBackTop(position)
      },
      // （7）点击购物车(提取购物车要展示的数据，并发送到Vuex中)
      addToCart(){
        const product = {}
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.realPrice = this.goods.realPrice
        product.id = this.id
        product.image = this.goods.image
        // console.log(this.id);

        this.$store.dispatch('addCart',product).then(res => {
          // console.log(res);
          this.$toast.isShow(res)
        })
      },
      // 8、BackTop返回顶部事件
      // backClick(){
      //   this.$refs.scroll.scrollTo(0,0) //放在混入中
      // },
    }
  } 
</script>

<style scoped>
  .detail{
    height: 100vh;
  }
  .content{
    /* position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden; */
    position: relative;
    z-index: 2;
    background-color: #fff;
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  .back-top{
    position: fixed;
    bottom: 55px;
    right: 5px;
    z-index: 10;
  }
</style>