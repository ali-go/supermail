<template>
  <div class="cart-button-bar">
    <div class="select">
      <check-button class="check-button" :is-checked="isAllChecked" @click.native="isAllClick"/>
      <span>全选</span>
    </div>
    <div class="sum">
      <span>合计：</span>
      <span>{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="goCalculate">去计算({{totalLength}})</div>

  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'
  import { mapGetters } from 'vuex';  
  
  export default {
    components: { 
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((pre,cur) => {
          return  pre + cur.realPrice * cur.count
        },0).toFixed(2)
      },
      totalLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isAllChecked(){
        if(this.cartList.length === 0){
          return false
        } else{
            return !this.cartList.find(item => !item.checked
           )
        }
      }
    },
    methods:{
      isAllClick(){
        if(this.isAllChecked){
          this.cartList.forEach(item => item.checked = false)
        } else{
          this.cartList.forEach(item => item.checked = true)
        }
      },
      goCalculate(){
        if(!this.cartList.find(item => item.checked)){
          this.$toast.isShow('请选择要结算的商品')
        }
      }
    }
  }
</script>

<style scoped>
  .cart-button-bar{
    display: flex;
    height: 40px;
    align-items: center;
  }

  .select{
    display: flex;
    flex: 1;
    padding-left: 5px;
  }
  .check-button{
    margin-right: 5px;
  }
  .sum{
    flex:2;
  }
  .calculate{
    flex: 1;
    height: 100%;
    line-height: 40px;
    text-align: center;
    background-color: red;
    color: #fff;
  }
</style>