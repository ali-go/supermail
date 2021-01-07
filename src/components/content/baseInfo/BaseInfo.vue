<template>
  <div class="base-info" :style="{borderTop:isStyle}">
    <img :src="message.img" alt="">
    <p>{{message.text}}</p>
  </div>
</template>

<script>
  export default {
    props:{
      message:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      isStyle(){
        return this.message.border
      }
    },
    mounted(){
      // console.log(this.message);
    }
    // methods:{
    //   baseClick(){

    //   }
    // }
  }
</script>

<style scoped>
  .base-info{
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  .base-info img{
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .base-info p{
    flex:1;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
</style>