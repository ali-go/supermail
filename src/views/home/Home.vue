<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 此处用自己封装的better-scroll第三方插件即scroll来接管滚动事件，注意调用时要给高度 -->
    <scroll class="content" 
            :probe-type="3" 
            :pull-up-load="true" 
            @pullingUp="loadMore" 
            ref="scroll" @scroll="contentScroll">
      <!-- 轮播图：由于HomeSwiper组件的banners数据从父组件获取，因此此处需要动态绑定传给子组件，中间没内容可以单标签 -->
      <home-swiper :banners="banners"/>
      <!-- 推荐信息 -->
      <recommend-view :recommends="recommends"/>
      <!-- 特色图 -->
      <feature-view/>
      <!-- 选项卡 -->
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @itemClick="itemClick"/>
      <!-- 列表图 -->
      <goods-list :goods="listShow"></goods-list>
    </scroll>
    <!-- 返回顶部：组件本身默认不支持原生事件，加native才可绑定原生事件 -->
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 按顺序：组件导入模块（下面注册组件也按该顺序）
// 1、此为直接从childComps子组件导入
  import HomeSwiper from './childComps/HomeSwiper' //导入home专有的轮播图组件
  import RecommendView from './childComps/RecommendView'//导入推荐信息RecommendView
  import FeatureView from './childComps/FeatureView'
  // 2、此为从公共的组件导入
  import NavBar from 'components/common/navbar/NavBar';//获取NavBar导航栏组件
  import TabControl from 'components/content/tabControl/TabControl'//导入TabControl组件
  import GoodsList from 'components/content/goods/GoodsList' //导入GoodsList组件
  import Scroll from 'components/common/scroll/Scroll'//导入封装第三方插件better-scroll封装后的Scroll组件
  import BackTop from 'components/content/backtop/BackTop'//导入返回顶部组件
    // 3、此为导入的其他方法
  import {getHomeMultidata,getHomeGoods} from 'network/home';//获取home二次封装的各种网络请求


  export default {
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{//存储列表的请求的数据，里面包括三种类型，每种包含page页码以及存储相应的图片列表数据list
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType: 'pop',
        isShowBackTop:false
      }
    },
    computed:{
      // 用计算属性接收长式子，该为给goods-list循环遍历生成元素的
      listShow(){
        return this.goods[this.currentType].list
      }
    },
    created(){//home组件创建时就获取数据,一般created生命周期函数只写网络请求，内部的处理放在methods中，这样结构清晰
      // 1、请求多个数据
     this.getHomeMultidata()//此处调用methods的getHomeMultidata方法，该方法内部有网络请求处理
     
    //  2、请求商品数据
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
    },
    methods:{
      // BackTop返回顶部事件
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      // 设置什么位置显示返回顶部组件
      contentScroll(position){
        this.isShowBackTop = (-position.y) > 1000
      },
      // 从scroll组件中接收下拉加载事件
      loadMore(){//接收scroll传过来的上拉加载事件
        // console.log('下拉加载');
        this.getHomeGoods(this.currentType)
        // console.log(this.currentType);
        // this.$refs.scroll.scroll.refresh()//修复better-scroll的bug，图片吗没加载完自动确认滚动高度的bug
      },
      // 用topcontrol点击的index来筛选为相应的pop、new、sell
      itemClick(index){
        switch(index){
          case 0:
            this.currentType ='pop'
            // console.log(this.currentType);
            break
          case 1:
            this.currentType ='new'
            // console.log(this.currentType);
            break
          case 2:
            this.currentType ='sell'
            // console.log(this.currentType);
            break
        }
      },
      // 网络模块请求的方法-----------------
      // 1、轮播图和推荐栏数据获取
      getHomeMultidata(){
        getHomeMultidata().then(res=>{//此为轮播图具体的网络请求内容
          this.banners = res.data.banner.list;//把获取的轮播图数据赋值到data中的banners
          this.recommends = res.data.recommend.list;//把推荐栏数据赋值给data中的recommends
      })
     },
    //  2、列表图的多种数据的获取
      getHomeGoods(type){
        const page = this.goods[type].page +1;//初始化page为0，此处因为直接获取第一页数据
        getHomeGoods(type,page).then(res=>{//此为处理详情列表的网络请求
          this.goods[type].list.push(...res.data.list)//把每次获取的list数据追加到原来的list数组中
          this.goods[type].page += 1//数据获取来之后要更新相应的页码信息
         
          this.$refs.scroll.finishPullUp()
          // console.log(type);
          
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    position: relative;
    height: 100vh;
    /* padding-top: 44px; */
  }
  .home-nav{
    background-color: var(--color-tint);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }

  /* 达到top值是转为固定定位 */
  /* .tab-control{
    position: sticky;
    top: 44px;
  } */
  /* 此处为调用scroll时给高度 */
  /* 目前发现一个bug，只要刷新过就必须先关闭调试页面重新再开调试页面滚动才有效 */
  /* 设置高度有两种方法： */
  /* 第一种直接整体定位，上下距离设置为导航栏和tabbar的高度，中间就默认为滚动页面高度 */
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  /* 第二种设置高度，不采用定位，直接home高度为可视高度100vh减去上下固定高度 */
  /* 
  .content{
    height:calc(100% - 49px - 44px);
    overflow: hidden;
  } */

  .back-top{
    position: fixed;
    bottom: 55px;
    right: 5px;
    z-index: 10;
  }
</style>