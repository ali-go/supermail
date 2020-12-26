<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <Main></Main>
  </div>
</template>

<script>

import Main from 'components/content/main/Main.vue'

export default {
  name: 'App',
  components: {
   Main
  }
}
</script>
<style>
  @import 'assets/css/normalize.css';
  @import 'assets/css/base.css';

</style>
