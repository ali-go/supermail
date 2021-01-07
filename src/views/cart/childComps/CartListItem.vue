<template>
  <div class="cart-list-item">
    <div>
      <check-button :is-checked="listItem.checked" @click.native="checkClick"/>
    </div>
    <div class="icon">
      <img :src="listItem.image" alt="">
    </div>
    <div class="msg">
      <p class="title">{{listItem.title}}</p>
      <p class="desc">{{listItem.desc}}</p>
      <div class="other">
        <span class="other_price">{{'￥' + listItem.realPrice}}</span>
        <span class="other_count">{{'x' + listItem.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue';

  export default {
    props:{
      listItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    components:{
      CheckButton
    },
    methods:{
      checkClick(){
        this.listItem.checked = !this.listItem.checked
        // console.log(this.listItem);
      }
    }
  }
</script>

<style scoped>
  .cart-list-item{
    display: flex;
    align-items: center;
    padding: 10px 10px;
    border-bottom: 1px solid #ccc;
  }
  /* .check-button{
    width: 16px;
    height: 16px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 50%;
  } */
  .icon{
    width: 100px;
    height: 125px;
    margin-right: 10px;
  }
  .icon img{
    width: 100%;
    height: 100%;
    border-radius: 7px;
    vertical-align: middle;
  }
  .msg{
    flex: 1;
    min-width: 0;
    /* 由于flex:1和white-space:nowrap冲突，必须加这一句css代码 */
  }
  .title,
  .desc{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title{
    font-size: 20px;
    margin-bottom: 15px;
  }
  .desc{
    color:#666;
    margin-bottom: 30px;
  }
  .other{
    display: flex;
    justify-content: space-between;
  }
  .other_price{
    color: var(--color-high-text);
  }
  /* --------勾活跃状态属性------
  .active{
    border-color: red;
    background-color: red;
  } */
</style>