<template>
  <div class="profile">
    <nav-bar class="profile-nav"><div slot="center">我的档案</div></nav-bar>
    <register/>
    <money-bag/>
    <profile-base-info :baseInfo="baseInfo"/>
  </div>
</template>

<script>
// 1、公共组件
import NavBar from 'components/common/navbar/NavBar.vue'
// 2、子组件
import Register from './childComps/Register'
import MoneyBag from './childComps/MoneyBag'
import ProfileBaseInfo from './childComps/ProfileBaseInfo'
// 3、导入其他方法
import {ProfileMgs} from 'network/profile.js'

export default {
  components:{
    NavBar,
    Register,
    MoneyBag,
    ProfileBaseInfo
  },
  data(){
    return {
      baseInfo:[]
    }
  },
  created(){
    // 1、创建baseinfo信息的实例对象
    const a = new ProfileMgs(require('assets/img/profile/message.png'),
      '我的消息','https://www.hao123.com/','10px solid #ddd')
    const b = new ProfileMgs(require('assets/img/profile/pointer.png'),'积分商城','https://www.hao123.com/')
    const c = new ProfileMgs(require('assets/img/profile/vip.png'),'会员卡','https://www.hao123.com/')
    const d = new ProfileMgs(require('assets/img/profile/cart.png'),
    '我的购物车','https://www.hao123.com/','10px solid #ddd')
    const e = new ProfileMgs(require('assets/img/profile/app.png'),'下载购物APP','https://www.hao123.com/')
    // 解释：由于webpack会分析src路径，引用到的图片才会打包，本地静态图片不会打包，
    // 第一种方法：用require把路径包进来当做模块。
    // 第二种方法：把图片复制到public中，系统会默认打包进去，然后引用该路径
    // const b = new ProfileMgs('/message.png','我的消息','https://www.hao123.com/')
    this.baseInfo.push(a,b,c,d,e)
    // console.log(this.baseInfo);
  }
}
</script>

<style>
  .profile-nav{
    background-color: var(--color-tint);
    color: #fff;
    box-shadow: 0 0 1px rgba(100,100,100,0) !important;

  }
</style>