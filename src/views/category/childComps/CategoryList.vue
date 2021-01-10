<template>
  <div class="category-list" v-if="categoryLists.length !== 0">
    <scroll class="content">
      <ul>
        <li v-for="(item,index) in categoryLists" :key="index.item" class="list-item"
           :class="{active:currentActive === index}" @click="listClick(index,item.maitKey,item.miniWallkey)">
          {{item.title}}
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    components:{
      Scroll
    },
    data(){
      return {
        currentActive:0,
      }
    },
    props:{
      categoryLists:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      listClick(index,maitKey,miniWallkey){
        this.currentActive = index;
        this.$emit('postMaitKey',maitKey,miniWallkey)
        // console.log(maitKey);
      }
    },
    computed:{
    }
  }
</script>

<style scoped>
  .category-list{
    height: calc(100% - 44px - 49px);
    width: 25%;
    /* background-color: pink; */
    position: absolute;
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
  .category-list ul{
    width: 100%;
    background-color: #eee;
  }
  .list-item{
    padding: 15px 0;
    text-align: center;
  }
  .active{
    background-color: #fff;
    color: red;
    border-left: 3px solid red;
  }
</style>