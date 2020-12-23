<template>
  <div id="app">
    <router-view></router-view>
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
