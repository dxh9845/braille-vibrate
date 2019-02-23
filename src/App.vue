<template>
  <div id="app">
    <swipe-block></swipe-block>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import SwipeBlock from './components/SwipeBlock.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    SwipeBlock
  },
};
</script>

<style>
#app {
/*   
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
