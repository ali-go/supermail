<template>
  <div class="register">
    <div class="photo">
      <img src="~assets/img/profile/avatar.png" alt="">
    </div>
    <div class="sign">
      <p>登录/注册</p>
      <p class="sign-phone">
        <img src="~assets/img/profile/phone.png" alt="">
        <span>暂无绑定手机号</span>
      </p>
    </div>
    <div class="right-icon">
      <img src="~assets/img/common/arrow-right.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .register{
    display: flex;
    margin-top: -0.4px;
    align-items: center;
    padding: 15px 20px;
    background-color: var(--color-tint);
  }
  .photo{
    /* flex: 1; */
    width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 50%;
    background-color: #eee;
  }
  .photo img{
    width: 100%;
    height: 100%;
  }
  .sign{
    flex: 2;
    color: #fff;
  }
  .sign p span{
    font-size: 14px;
  }
  .sign p img{
    width: 18px;
    height: 20px;
    vertical-align: middle;
  }
  .right-icon{
    flex: 1;
    text-align: right;
    height: 30px;
  }
  .right-icon img{
    height: 100%;
  }
</style>