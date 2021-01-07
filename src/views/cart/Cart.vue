<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list1/>
    <cart-button-bar class="cart-button-bar"/>
    <!-- <toast/> -->
  </div>
</template>

<script>
  // 1、导入其他方法
  // 导入mapGetters 用来实现组件内的computed和此处getters内方法的互通
  import {mapGetters} from 'vuex'

  // 2、导入公共组件
  import NavBar from 'components/common/navbar/NavBar.vue'
  // import Toast from '../../components/common/toast/Toast.vue'

  // 3、导入子组件
  import  CartList1 from './childComps/CartList1'
  import CartButtonBar from './childComps/CartButtonBar.vue'

  export default {
    components:{
      NavBar,
      CartList1,
      CartButtonBar,
      // Toast
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
  .cart{
    height: 100vh;
  }
  .nav-bar{
    color: #fff;
    background-color: var(--color-tint);
  }
  .cart-button-bar{
    width: 100%;
    position: fixed;
    bottom: 49px;
    background-color: #eee;
  }
</style>