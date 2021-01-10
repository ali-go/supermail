<template>
  <div class="goods-list" >
    <goods-list-item v-for="(item,index) in goods" :key="index.item" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    components:{
      GoodsListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 2px;
    margin-top: 5px;
  }
</style>>

</style>