<template>
  <div :class="{active:isChecked}" class="check-button">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    props:{
      isChecked:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style scoped>
  .check-button{
    width: 16px;
    height: 16px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 50%;
  }

    /* --------勾活跃状态属性------ */
  .active{
    border-color: red;
    background-color: red;
  }

</style>