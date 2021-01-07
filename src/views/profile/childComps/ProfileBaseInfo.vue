<template>
  <div class="profile-base-info">
    <base-info v-for="(item,index) in baseInfo" :key="index.item" :message="item"/>
  </div>
</template>

<script>
  import BaseInfo from 'components/content/baseInfo/BaseInfo.vue'

  export default {
    components:{
      BaseInfo
    },
    props:{
      baseInfo:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  
</style>