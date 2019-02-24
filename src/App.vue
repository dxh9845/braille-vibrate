<template>
  <div id="app">
    <b-container fluid class='m-4'>
      <swipe-block word='Dog'></swipe-block>
    </b-container>
  </div>
</template>

<script>
import SwipeBlock from './components/SwipeBlock.vue';

export default {
  name: 'app',
  components: {
    SwipeBlock
  },
};
</script>

<style>

html, body {
  overscroll-behavior: none;
}

#app {
/*   
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  overscroll-behavior: none;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
