<template>
      <TabBar>
        <TabBarItem path="/home" stylecolor="red">
          <!-- 如果是动态跳转的路径用v-bind，此处我们先设置静态的 -->
          <!-- <img src="./../../assets/img/home.webp" slot="icon-img" alt="">
          <img src="./../../assets/img/active-home.webp" slot="icon-img-active" alt=""> -->
           <img src="~assets/img/tabbar/home.webp" slot="icon-img" alt="">
          <img src="~assets/img/tabbar/active-home.webp" slot="icon-img-active" alt="">
          <div slot="icon-text">首页</div>
        </TabBarItem>
        <TabBarItem path="/category" stylecolor="red">
          <!-- <img src="./../../assets/img/category.webp" slot="icon-img" alt="">
          <img src="./../../assets/img/active-category.webp" slot="icon-img-active" alt=""> -->
          <img src="~assets/img/tabbar/category.webp" slot="icon-img" alt="">
          <img src="~assets/img/tabbar/active-category.webp" slot="icon-img-active" alt="">
          <div slot="icon-text">分类</div>
        </TabBarItem>
        <TabBarItem path="/cart" stylecolor="red">
          <!-- <img src="./../../assets/img/cart.webp" slot="icon-img" alt="">
          <img src="./../../assets/img/active-cart.webp" slot="icon-img-active" alt=""> -->
           <img src="~assets/img/tabbar/cart.webp" slot="icon-img" alt="">
          <img src="~assets/img/tabbar/active-cart.webp" slot="icon-img-active" alt="">
          <div slot="icon-text">购物车</div>
        </TabBarItem>
        <TabBarItem path="/profile" stylecolor="red">
          <!-- <img src="./../../assets/img/profile.webp" slot="icon-img" alt="">
          <img src="./../../assets/img/active-profile.webp" slot="icon-img-active" alt=""> -->
           <img src="~assets/img/tabbar/profile.webp" slot="icon-img" alt="">
          <img src="~assets/img/tabbar/active-profile.webp" slot="icon-img-active" alt="">
          <div slot="icon-text">我的</div>
      </TabBarItem>
     
    </TabBar>

</template>

<script>
// 原路径
  // import TabBar from './TabBar'
  // import TabBarItem from './TabBarItem'
  // 用路径别名后的路径
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    components:{
          TabBar,
          TabBarItem
        }
  }
</script>

<style>

</style>