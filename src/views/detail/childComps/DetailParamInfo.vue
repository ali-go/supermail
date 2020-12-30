<template>
  <div class="detail-param-info" v-if="Object.keys(paramInfo).length !== 0">
    <div  class="param-sizes" >
      <table>
        <tr v-for="(item,index) in paramInfo.sizes[0]" :key="index.item" class="sizes-tr">
          <td v-for="(item2,index2) in item"  :key="index2.item2">{{item2}}</td>
        </tr>
      </table>
    </div>
    <div  class="param-other">
      <table>
        <tr v-for="(item3,index3) in paramInfo.info" :key="index3.item3">
          <td>{{item3.key}}</td>
          <td class="param-other-call">{{item3.value}}</td>
        </tr>
      </table>
    </div>
    <div v-if="paramInfo.images" class="param-img">
      <img :src="item4" alt="" v-for="(item4,index4) in paramInfo.images" 
            :key="index4.item4" @load="imageParam">
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      paramInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        count:0,
      }
    },
    methods:{
      imageParam(){
        this.count ++;
        if(this.count === this.paramInfo.images.length){
          this.$emit('imageParam')
        }
      }
    }
  }
</script>

<style scoped>
  .detail-param-info{
    margin: 30px 0 10px;
    border-top: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
  }
  table{
    width: 100%;
    font-size: 14px;
  }
  tr{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ccc;
  }
  td{
    width: 30px;
  }
  .param-sizes,
  .param-other{
    margin: 0 10px;
  }
  .param-img{
    margin: 10px 0;
  }
  .param-img img{
    width: 100%;
  }
  .param-other-call{
    color: var(--color-high-text);
  }
</style>