<template>
  <div class="main-key-info" v-if="Object.keys(maitKeyInfo).length !== 0">
    <div v-for="(item,index) in maitKeyInfo" :key="index.item">
      <a :href="item.link" >
      <img :src="item.image" alt="" @load="imageLoad">
      <p >{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        count:0
      }
    },
    props:{
      maitKeyInfo:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      imageLoad(){
        this.count++
        if(this.count === this.maitKeyInfo.length){
          this.$emit('imageLoad')
          this.count = 0
        }
      },
    }
  }
</script>

<style scoped>
  .main-key-info{
    padding-top: 10px;
    padding-right: 30%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .main-key-info div{
    width: 50%;
    text-align: center;
  }

  .main-key-info div a img{
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
</style>