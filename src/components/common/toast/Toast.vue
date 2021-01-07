<template>
  <div class="toast" v-show="show">
    {{message}}
  </div>
</template>

<script>
  export default {
// 补充说明一下，为了方便使用，我们把toast.vue封装到vue的插件中，后续直接调用就行
    props:{
      message:{
        type:String,
        default:''
      },
      // during:{
      //   type:Number,
      // }
    },
    data(){
      return {
        show:false
      }
    },
    methods:{
      isShow(mgs,dur = 2000){
        this.show = true
        this.message = mgs
        setTimeout(() => {
          this.show = false
          this.message = ''
        },dur)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 7px 10px;
    color: #fff;
    background-color: rgba(0, 0, 0, .7);
    z-index: 9;
  }
</style>
