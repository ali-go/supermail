<template>
  <nav-bar class="nav-bar">
    <div slot="left" >
      <img src="~assets/img/common/back.svg" alt="" class="back-icon" @click="back">
    </div>
    <div slot="center" class="title">
      <div v-for="(item ,index) in title" :key="index.item" 
            class="title-item" :class="{active: currertIndex=== index}" 
            @click="titleClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    data(){
      return {
        title:['商品','参数','评论','推荐'],
        currertIndex:0,
      }
    },
    components:{
      NavBar
    },
    methods:{
      titleClick(index){
        this.currertIndex = index
        this.$emit('tabClick',index)
      },
      back(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  
  .title{
    display: flex;
    /* background-color: pink; */
    font-size: 15px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back-icon{
    vertical-align: middle;
  }
</style>