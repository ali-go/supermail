<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index.item" class="tab-control-item" 
      :class="{active:currentActive===index}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentActive:0
      }
    },
    methods:{
      itemClick(index){
        this.currentActive = index
        this.$emit('itemClick',index)
      }
    }
  }
</script>

<style>
  .tab-control{
    z-index: 1;
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 3px 5px;
  }
  .active span{
    color:var(--color-high-text);
    border-bottom: 2px solid var(--color-high-text);
  }
</style>