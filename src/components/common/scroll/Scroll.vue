<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 此为对第三方插件better-scroll进行封装，注意调用时要给调用处高度，否则不起作用
  import BScroll from 'better-scroll' //导入better-scroll
  export default {
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        scroll:null//注意要用一个data来接收mounted封装的scroll，因为如果没有接收，mounted运行完就会销毁
      }
    },
    mounted(){//用mounted来封装scroll
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,//此次必须设置true不然点击事件无效
        probeType:this.probeType,//设置可以获得滚动位置,由用户决定
        pullUpLoad:this.pullUpLoad//设置允许下拉加载，由用户决定
      })//此处用给元素加ref属性的方式来通过this.$refs来获取元素唯一

      this.scroll.on('scroll',(position) => {
        // console.log(position);
        this.$emit('scroll',position)//把滚动位置传给父组件，用来设置返回顶部事件
      })

      this.scroll.on('pullingUp',() => {
        // console.log('下拉加载');
        this.$emit('pullingUp')//把上拉加载事件传给父组件
     })
    },
    methods:{
      // 把回到顶部的方法设置在哎scroll内，外面调用
      scrollTo(x, y, time=300){
        this.scroll.scrollTo( x, y, time)
      },
      // 继续下次下拉加载
      finishPullUp(){
        this.scroll.finishPullUp()//设置下一次也能够上拉加载,要放在方法中，然后等home加载完一页再调用该方法启动下一次下拉加载
      }                 

    }

  }
</script>

<style scoped>

</style>>

