<template>
  <div class="category">
    <nav-bar class="category-navbar"><div slot="center">商品分类</div></nav-bar>
      <category-list :category-lists="categoryLists" @postMaitKey="postMaitKey"/>
    <scroll class="content" ref="scroll">
      <mait-key-info :mait-key-info="maitKeyInfo" @imageLoad="imageLoad"/>
      <goods-list :goods="miniWallkeyInfo"/>
    </scroll>
  </div>
</template>

<script>
  // 1、导入子组件
  import CategoryList from './childComps/CategoryList'
  import MaitKeyInfo from './childComps/MaitKeyInfo'
  // 2、导入公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // 3、导入其他方法
  import {getCategory,getCategoryItem,getCategoryImage} from 'network/category'
  import {itemLinstnerMinxin} from 'common/mixin'

  export default {
    components:{
      CategoryList,
      MaitKeyInfo,
      NavBar,
      Scroll,
      GoodsList
    },
    mixins:[itemLinstnerMinxin],
    data(){
      return {
        categoryLists:[],//左侧的数据
        maitKey:'',//列表图的maitKey值
        maitKeyInfo:[],//maitKey列表图对应的数据
        miniWallkey:'',//推荐图的miniWallkey值
        miniWallkeyInfo:[],//miniWallkey推荐图对应的数据
        saveY:0,//用于获取离开时的页面位置
      }
    },
    methods:{
      // -------获取的数据的函数封装成函数，并在created内调用
      // 1、获取左侧数据
      getCategory(){
        getCategory().then(res => {
          this.categoryLists = res.data.category.list;//左侧文字
          // console.log(this.categoryLists);
          this.maitKey = this.categoryLists[0].maitKey; //初始化maitKey的值
          this.miniWallkey = this.categoryLists[0].miniWallkey; //初始化miniWallkey的值
          this.getCategoryItem(this.maitKey);//调用初始的maitKey对应的数据
          this.getCategoryImage(this.miniWallkey);//调用初始的miniWallkey对应的数据
        })
      },

      // 2、获取右侧列表图片数据(注意分别是上面数据加载完获取第一次和每次点击时再获取)
      getCategoryItem(maitKey){
        getCategoryItem(this.maitKey).then(res => {
          this.maitKeyInfo = res.data.list
            // console.log(this.maitKeyInfo);
        })
      },

      // 3、获取右侧下面的推荐图数据（同样需要等（1）中的数据获取完才可以获取到miniWallkey值）
      getCategoryImage(miniWallkey){
        getCategoryImage(this.miniWallkey).then(res => {
          this.miniWallkeyInfo = res
          // console.log(res);
        })
      },

      // 4、点击左侧栏时更新相应的maitKey和miniWallkey值
      postMaitKey(maitKey,miniWallkey){
        this.maitKey = maitKey;//设置子组件点击后相应的maitKey更新值
        this.miniWallkey = miniWallkey;//设置子组件点击后相应的miniWallkey更新值
        this.getCategoryItem(this.maitKey)//点击时更新获取左侧列表图片数据
        this.getCategoryImage(this.miniWallkey);//点击时更新获取左侧推荐图片数据
        // console.log(this.maitKeyInfo);
        this.$refs.scroll.scrollTo(0,0,0)

      },

      // 5、接收处理列表图加载事件
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    },
    created(){
      // 1、调用获取左侧数据的方法（总数据）
      this.getCategory()
      // console.log('save');
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScorllY()
      // console.log(this.saveY);
    },
    activated(){
      // console.log(this.saveY);
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      // console.log(this.$refs.scroll.scrollTo(0,this.saveY));
    }
  }
</script>

<style scoped>
  .category{
    height: 100vh;
    /* 该属性等下删除 */
  }
  .category-navbar{
    background-color: var(--color-tint);
    color: #fff;
  }
  /* .content1{
    height: calc(100% - 44px - 49px);
    width: 25%;
    background-color: pink;
    position: absolute;
    overflow: hidden;
  } */
  .content{
    margin-left: 30%;
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>