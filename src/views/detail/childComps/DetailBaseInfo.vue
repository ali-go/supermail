<template>
  <div class="detail-base-info" v-if="Object.keys(goods).length !== 0">
    <div class="title">{{goods.title}}</div>
    <div class="base-price" >
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.oldPrice" class="discountDesc" :style="descColor">{{goods.discountDesc}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class="info-package">
      <!-- <span v-for="(item,index) in goods.services" :key="index.item">
        <img v-if="item.icon" :src="item.icon" alt="" >
        {{item.name}}
      </span> -->
      <span v-for="index in goods.services.length - 1" :key="index">
        <img v-if="goods.services[index-1].icon" :src="goods.services[index-1].icon" alt="" >
        {{goods.services[index-1].name}}
      </span>
      <!-- <span>
        <img :src="goods.services[goods.services.length - 3].icon" alt="">
        {{goods.services[goods.services.length - 3].name}}
      </span>
      <span>
        <img :src="goods.services[goods.services.length - 2].icon" alt="">
        {{goods.services[goods.services.length - 2].name}}
      </span> -->
    </div>
    <div class="border-bottom"></div>
  </div>

</template>

<script>
  export default {
    data(){
      return{
      
      }
    },
    methods:{
    
    },
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      descColor(){
        return {backgroundColor:this.goods.descColor}
      }
    },
    
  }
</script>

<style scoped>
  .detail-base-info{
    margin: 10px 10px 5px;
  }
  .title{
    font-size: 16px;
    font-weight: 700;
  }
  .base-price{
    margin: 10px 0;
  }
  .newPrice{ 
    font-size: 26px;
    color: var(--color-high-text);
    margin-right: 3px;
  }
  .oldPrice{
    position: relative;
    font-size: 14px;
    text-decoration:line-through;
  }
  .discountDesc{
    margin-left: 5px;
    padding:3px;
    vertical-align: top;
    font-size: 14px;
    border: 1px solid transparent;
    color: #fff;
    border-radius: 14px;
  }
  .info-other{
    display: flex;
    padding: 10px 0;
    border-bottom:1px solid #eee;
    font-size: 14px;
    color: #aaa;
  }
  .info-other span {
    flex: 1;
    text-align: center;
  }
  .info-other span:first-child{
    text-align: left;
  }
  .info-other span:last-child{
    text-align: right;
  }
  .info-package{
    /* display: flex; */
    /* flex-wrap: wrap; */
    margin: 25px 0;
    font-size: 14px;
  }
  .info-package span{
    /* flex: 1; */
    /* text-align: center; */
    margin-right: 5px;
  }
  /* .info-package span:first-child{
    text-align: left;
  }
  .info-package span:last-child{
    text-align: right;
  } */
  .info-package img{
    width: 12px;
    height: 12px;
  }
  .border-bottom{
    height: 4px;
    margin: 0 -8px;
    background-color: #eee;
  }
</style>