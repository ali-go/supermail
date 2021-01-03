<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!-- <div slot="center">购物车({{cartLength}})</div> -->
      <!-- <div slot="center">购物车({{$store.getters.cartLength}})</div> -->
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
  // 1、导入其他方法
  // 导入mapGetters 用来实现组件内的computed和此处getters内方法的互通
  import {mapGetters} from 'vuex'

  // 2、导入公共组件
  import NavBar from 'components/common/navbar/NavBar.vue'
  
  export default {
    components:{
      NavBar
    },
    computed:{
      // cartLength(){
      //   return this.$store.getters.cartLength
      // }
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .nav-bar{
    color: #fff;
    background-color: var(--color-tint);
  }
</style>