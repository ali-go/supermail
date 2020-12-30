<template>
  <div class="commend-info" v-if="Object.keys(commendInfo).length !== 0">
    <div class="commend-user">
      <span class="left">用户评价</span>
      <span class="right">更多</span>
    </div>
    <div class="commend-message">
      <div class="commend-message-icon">
        <img :src="commendInfo.user.avatar" alt="" class="avatar">
        <span class="uname">{{commendInfo.user.uname}}</span>
      </div>
      <div class="commend-message-info">
        <p>{{commendInfo.content}}</p>
        <div class="message-other">
          <span>{{commendInfo.created | showTime}}</span>
          <span>{{commendInfo.style}}</span>
        </div>
        <div v-if="commendInfo.images" class="img-info">
          <img v-for="(item,index) in commendInfo.images" :key="index.item" :src="item" alt="">
        </div>
        <div v-if="commendInfo.explain" class="explain">{{commendInfo.explain}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 调用把date格式转成时间的格式的方法
  import {formatTime} from 'common/utils'
  import Vue from 'vue'
  export default {
    props:{
      commendInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters:{
      showTime(value){
        // 1、把时间戳转成date格式
        const data = new Date(value * 1000)
        // 2、继续转成时间格式
        return  formatTime(data)
      }
    }
  }
</script>

<style scoped>
  .commend-info{
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
  }
  .commend-user{
    font-size: 16px;
    overflow: hidden;
    padding: 10px 0 20px;
    margin: 0 10px;
    border-bottom: 1px solid #ccc;
  }
  .commend-user .left{
    float: left;
  }
  .commend-user .right{
    float: right;
  }

  .commend-message{
    margin: 0 10px;
  }
  .commend-message-icon{
    margin: 20px 0;
  }
  .avatar{
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    vertical-align: middle;
  }


  .message-other{
    margin: 10px 0;
    color: #666;
  }
  .message-other span{
    margin-right: 10px;
  }
  .img-info img{
    width: 150px;
    height: 150px;
    margin-right: 5px;
  }

  .explain{
    padding: 10px 20px;
  }
</style>