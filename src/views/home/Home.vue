<template>
  <div id="home">
    <!-- 导航栏 -->
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <!-- 轮播图：由于HomeSwiper组件的banners数据从父组件获取，因此此处需要动态绑定传给子组件，中间没内容可以单标签 -->
    <HomeSwiper :banners="banners"/>
    <!-- 推荐信息 -->
    <RecommendView :recommends="recommends"/>
    <!-- 特色图 -->
    <FeatureView/>
    <!-- 选项卡 -->
    <TabControl :title="['流行','新款','精选']" class="tab-control"/>

    <ul>
      <li>1哈哈</li>
      <li>2哈哈</li>
      <li>3哈哈</li>
      <li>4哈哈</li>
      <li>5哈哈</li>
      <li>6哈哈</li>
      <li>7哈哈</li>
      <li>8哈哈</li>
      <li>9哈哈</li>
      <li>10哈哈</li>
      <li>11哈哈</li>
      <li>12哈哈</li>
      <li>13哈哈</li>
      <li>14哈哈</li>
      <li>15哈哈</li>
      <li>16哈哈</li>
      <li>17哈哈</li>
      <li>18哈哈</li>
      <li>19哈哈</li>
      <li>20哈哈</li>
      <li>21哈哈</li>
      <li>22哈哈</li>
      <li>23哈哈</li>
      <li>24哈哈</li>
      <li>25哈哈</li>
      <li>26哈哈</li>
      <li>27哈哈</li>
      <li>28哈哈</li>
      <li>29哈哈</li>
      <li>30哈哈</li>
    </ul>
      
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
    // 3、此为导入的其他方法
  import {getHomeMultidata} from 'network/home';//获取二次封装的后home专用的aixos

  export default {
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl
    },
    data(){
      return{
        banners:[],
        recommends:[]
      }
    },
    created(){//home组件创建时就获取数据
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list;//把获取的轮播图数据赋值到data中的banners
        this.recommends = res.data.recommend.list;//把推荐栏数据赋值给data中的recommends
      })
    },

  }
    // })
</script>

<style>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }
  .tab-control{
    /* 达到top值是转为固定定位 */
    position: sticky;
    top: 44px;
  }
</style>