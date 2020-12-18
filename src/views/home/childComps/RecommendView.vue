<template>
  <div class="recommend">
    <div class="recommend-view" v-for="(item,index) in recommends" :key="index.item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style>
  .recommend{
    display: flex;
    padding: 10px 0 20px 0;
    text-align: center;
    border-bottom: 8px solid #eee;
  }
  .recommend-view{
    flex: 1;
  }
  .recommend img{
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>