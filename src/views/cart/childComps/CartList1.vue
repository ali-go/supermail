<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index.item" :listItem="item"/>
    </scroll>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex';
  import CartListItem from './CartListItem';
  import Scroll from 'components/common/scroll/Scroll.vue';

  export default {
    name:"CartList",
    components:{
      CartListItem,
      Scroll,
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    /* 注意减号两边必须留空格，否则无效 */
    height:calc(100% - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>