<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" class="logo">
    <Heroes />
  </div>
</template>

<script>
import Heroes from './components/Heroes.vue'

export default {
  name: 'app',
  components: {
    Heroes
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  width: 40px;
}
</style>
