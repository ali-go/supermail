<template>
<!-- 设置点击事件用于路由跳转 -->
  <div class="tab-bar-item" @click="itemClick" >
    <div v-if="!isActive">
      <slot name="icon-img"></slot>
    </div>
    <div v-else>
      <slot name="icon-img-active"></slot>
    </div>
   <div :style="styleIsActive">
      <slot name="icon-text"></slot>
   </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // isActive:false
    }
  },
 props:{
    path:String,//我们希望从父组件处接收需要跳转的值
    stylecolor:{
      type:String,
      default:'red'
    }
 },
  methods:{
    itemClick(){
      if(this.$route.path !== this.path)
      this.$router.push(this.path)//这个跳转的路径我们希望从上层接收过来
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) != -1
    },
    styleIsActive(){
      return this.isActive ? {color:this.stylecolor} : {}
    }
  }
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
</style>