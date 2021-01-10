<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 此处用自己封装的better-scroll第三方插件即scroll来接管滚动事件，注意调用时要给高度 -->
    <!-- 选项卡 :该选项卡是为了下面滚动吸顶专门多复制的一份-->
    <tab-control :titles="['流行','新款','精选']" class="tab-control" v-show="istabControlShow"
                  @itemClick="itemClick" ref="tabControl1" />
    <!-- ------------------------------------------ -->
    <scroll class="content" 
            :probe-type="3" 
            :pull-up-load="true" 
            @pullingUp="loadMore" 
            ref="scroll" @scroll="contentScroll">
      <!-- 轮播图：由于HomeSwiper组件的banners数据从父组件获取，因此此处需要动态绑定传给子组件，中间没内容可以单标签 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" 
                    v-if="banners.length > 0"/> 
                    <!-- v-if="banners.length > 0"是为了防止数据加载过慢导致轮播图不能滚动 -->
      <!-- 推荐信息 -->
      <recommend-view :recommends="recommends"/>
      <!-- 特色图 -->
      <feature-view/>
      <!-- 选项卡 -->
      <tab-control :titles="['流行','新款','精选']" 
                   @itemClick="itemClick" ref="tabControl2" />
      <!-- 列表图 -->
      <goods-list :goods="listShow" ref="goodList"></goods-list>
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
  // import BackTop from 'components/content/backtop/BackTop'//导入返回顶部组件
  // 3、此为导入的其他方法
  import {getHomeMultidata,getHomeGoods} from 'network/home';//获取home二次封装的各种网络请求
  import {debounce} from 'common/utils'//导入防抖动函数debounce
  import {HIGH_BACK} from 'common/const' //导入返回顶部的显示时高度，固定常量
  import {backTopMinxin} from 'common/mixin' //导入混入的代码

  export default {
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop //放在混入注册了
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
        // isShowBackTop:false,//放在混入中了
        tabOffsetTop:0,
        istabControlShow:false,
        saveY:0
      }
    },
    mixins:[backTopMinxin],
    computed:{
      // 1、tab-control点击的切换传值
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
    mounted(){
      // 1、接收事件总线刷新高度（图片每加载一次接受一次）
      const refresh = debounce(this.$refs.scroll.refresh,200) //此为唯一一次执行debance函数
      this.$bus.$on('itemImageLoad',() =>{
        refresh()
      })
    },
    // deactivated(){
    //   this.$bus.$off('itemImageLoad')
    // },
    methods:{
    // 事件监听相关的方法-------------------
      // 1、BackTop返回顶部事件
      // backClick(){
      //   this.$refs.scroll.scrollTo(0,0) //放在混入中了
      // },

      //2、设置什么位置显示返回顶部组件
      contentScroll(position){
        // (1)判断back-top是否显示
        // this.isShowBackTop = (-position.y) > HIGH_BACK
        this.showBackTop(position) //调用刚才抽离的方法
        // （2）判断滚动距离和tabControl的距离顶部距离
        this.istabControlShow = -position.y > this.tabOffsetTop
      },

      // (补充)、关于回到顶部显示按钮（上面代码）,为了出来抽离再创建一个方法（该部分放在混入中）
      // showBackTop(position){
      //   this.isShowBackTop = (-position.y) > HIGH_BACK //放在混入中了
      // },

      //3、从scroll组件中接收下拉加载事件
      loadMore(){
        this.getHomeGoods(this.currentType)
      },

      //4、用topcontrol点击的index来筛选为相应的pop、new、sell
      itemClick(index){
        switch(index){
          case 0:
            this.currentType ='pop'
            break
          case 1:
            this.currentType ='new'
            break
          case 2:
            this.currentType ='sell'
            break
        }
        this.$refs.tabControl1.currentActive = index //此为设置两个tabcontrol在滚动过程的点击状态一致
        this.$refs.tabControl2.currentActive = index //此为设置两个tabcontrol在滚动过程的点击状态一致
        // console.log(this.$refs.goodList.$el.offsetTop);
        this.$refs.scroll.scrollTo(0,-this.$refs.goodList.$el.offsetTop,0)
      },

      // 5、封装防抖操作（图片每加载一次就刷新高度一次性能不好，此处优化）
      // (此处代码封装到utils.js中了，因为多地方会调用，复用性)
      // debounce(fn,delay){
      //   let timer = null;
      //   return function(...args){
      //     if(timer){
      //       clearTimeout(timer)
      //       }
      //     timer = setTimeout(() =>{
      //       fn.apply(this,args)
      //     },delay)
      //   }
      // },

      // 6、轮播图图片加载完:获取tab-control的 offsetTop
      swiperImageLoad(){
         this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;//轮播图加载出来再获取tabcontrol的offsetTop
         this.$refs.scroll.refresh();//轮播图加载出来再刷新一下scroll的滚动高度
      },

    // 网络模块请求的方法-----------------
      // 1、轮播图和推荐栏数据获取
      getHomeMultidata(){
        getHomeMultidata().then(res=>{//此为轮播图具体的网络请求内容
          this.banners = res.data.banner.list;//把获取的轮播图数据赋值到data中的banners
          this.recommends = res.data.recommend.list;//把推荐栏数据赋值给data中的recommends
          // console.log(res);
      })
     },
    //  2、列表图的多种数据的获取
      getHomeGoods(type){
        const page = this.goods[type].page +1;//初始化page为0，此处因为直接获取第一页数据
        getHomeGoods(type,page).then(res=>{//此为处理详情列表的网络请求
          this.goods[type].list.push(...res.data.list)//把每次获取的list数据追加到原来的list数组中
          this.goods[type].page += 1//数据获取来之后要更新相应的页码信息
          this.$refs.scroll.finishPullUp()//每次数据加载完成就调用允许继续下拉加载
          // console.log(this.goods);
        })
      }
    },
    // 回来时继续跳到原来的位置
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY)
      this.$refs.scroll.refresh() //最好跳回来后刷新一下高度
    },
    //离开前保存原有的位置
    deactivated(){
    this.saveY = this.$refs.scroll.getScorllY()
    // 离开首页后scroll停止根据图片加载刷新高度
    // （因为复用同样组件的goodlistitem,必须离开home时停止，否则在详情页加载也会刷新home页的高度不利于性能）
    this.$bus.$off('itemImageLoad')

    }
  }
</script>

<style scoped>
  #home{
    position: relative;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: var( --color-background);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }

  /* 达到top值是转为固定定位！因为用来better-scroll接管滚动，因此此设置strick失效 */
  /* 由于有 */
  .tab-control{
    position: relative;
    top: 44px;
  }
  /* 下面这个由于better-scroll自身的问题导致不能fixed吸顶 */
  .fixed{
    /* 其实由于该部分不参与滚动，其实不需要固定定位，这个fixed无效 */
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }

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