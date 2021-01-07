<template>
  <div class="money-bag">
    <div class="surplus">
      <p>
        <span>{{remainSurplus}}</span>
        <span>元</span>
      </p>
      <p>我的余额</p>
    </div>
    <div class="coupon">
      <p>
        <span>{{remainCoupon}}</span>
        <span>个</span>
      </p>
      <p>我的优惠</p>
    </div>
    <div class="integral">
      <p>
        <span>{{remainIntegral}}</span>
        <span>分</span>
      </p>
      <p>我的积分</p>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      remainSurplus:{
        type:String,
        default:'0.00'
      },
      remainCoupon:{
        type:String,
        default:'0'
      },
      remainIntegral:{
        type:String,
        default:'0'
      },
    }
  }
</script>

<style scoped>
  .money-bag{
    display: flex;
    justify-content: center;
    padding: 0 25px;
    font-size: 14px;
    /* border-bottom: 1px solid #ccc; */
  }
  .surplus,
  .coupon,
  .integral{
    flex: 1;
    padding: 10px 0;
    text-align: center;
  }
  .coupon{
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
  .surplus p span:first-child,
  .coupon p span:first-child,
  .integral p span:first-child{
    font-size: 16px;
    color: red;
  }

</style>