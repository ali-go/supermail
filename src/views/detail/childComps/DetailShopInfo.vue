<template>
  <div class="detail-shop-info" >
    <div class="shop-name">
      <img :src="shop.logo" alt=""> 
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-other">
      <div class="amount">
        <div class="amount-sells">
          <p>{{fixSellAmount}}</p>
          <p>总销量</p>
        </div>
        <div class="amount-goods">
          <p>{{shop.goods}}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="describe">
        <p v-for="(item,index) in shop.score" :key="index.item">
          <span>{{item.name}}</span>
          <span class="score" :style="scoreColor(index)">{{item.score}}</span>
          <span>
            <span class="isBetter" :style="isBetterBg(index)">{{item.isBetter ? '高' : '低'}}</span>
          </span>
        </p>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      shop:{
        type:Object,
        default(){
          return {}
        }
      },
    },
    data(){
      return {
        sells:0
      }
    },
    mounted(){
      // console.log(this.shop);
    },
    methods:{
      scoreColor(index){
        if(this.shop.score[index].isBetter){
          return {color:'red'}
        } else {
          return {color:'green'}
        }
      },
      isBetterBg(index){
        if(this.shop.score[index].isBetter){
          return {backgroundColor:'red'}
        } else {
          return {backgroundColor:'green'}
        }
      }
    },
    computed:{
      fixSellAmount(){
        return this.shop.sells>10000 ? ((this.shop.sells)/10000).toFixed(1) + '万':this.shop.sells
      }
    }
  }
</script>

<style scoped>
  .detail-shop-info{
    padding: 30px 10px;
    border-top: 4px solid #eee;
    border-bottom: 4px solid #eee;
  }
  .shop-name{
    margin: 30px 0;
    font-size: 20px;
    color: var(--color-text);
  }
  .shop-name img{
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 20px;
  }
  .shop-other{
    display: flex;
    text-align: center;
  }
  .amount{
    flex: 1;
    display: flex;
    font-size: 18px;
    align-items: center;
    padding: 10px 0;

  }
  .amount-sells{
    flex: 1;
    padding-left: 20px;
  }
  .amount-sells p:last-child{
    font-size: 14px;
    margin: 10px 0;

  }
  .amount-goods{
    flex: 1;
    padding-right: 20px;
    border-right: 1px solid #eee;

  }
  .amount-goods p:last-child{
    font-size: 14px;
    margin: 10px 0;
  }


  .describe{
    flex: 1;
    font-size: 14px;
    align-items: center;
    margin-left: 30px;
    box-sizing: border-box;
  }
  .describe p{
    display: flex;
    text-align: left;
    box-sizing:border-box;
  }
  .describe p:nth-child(2){
    margin: 10px 0;
  }
  
  .describe p>span{
    flex: 1;
  }
  .describe p>span:first-child{
    flex: 2.2;
  }
  .describe p span{
    margin: 0 5px;
  }

  .describe .isBetter{
    color: #fff;
  }
  
  .shop-bottom{
    margin-top:25px;
    text-align: center;
  }
  .enter-shop{
    width: 40%;
    margin: 0 auto;
    padding: 3px 0;
    border-radius: 10px;
    background-color: #eee;
    font-size: 14px;
  }

</style>