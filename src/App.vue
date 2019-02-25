<template>
  <div id="app">
    <b-container fluid class='m-4'>
      <b-row class='mb-4'>
        <b-col>
          <CaptureButton></CaptureButton>
        </b-col>
      </b-row>
      <swipe-block :sentence="sentence" :word='returnedText'></swipe-block>
    </b-container>
  </div>
</template>

<script>
import SwipeBlock from './components/SwipeBlock.vue';
import CaptureButton from './components/CaptureButton.vue';

export default {
  data() {
    return {
      returnedText: 'Dog',
      sentence: ["I ", "am ", "dog"],
    }
  },
  name: 'app',
  components: {
    SwipeBlock,
    CaptureButton
  },
  methods: {
    feedBraille({ text }) {
      // Perform a regex on the string to make it clean
      let cleanText = text.replace(/^([a-zA-Z0-9 _-]+)$/, '').replace(/\r?\n|\r/g, ' ')
      this.sentence = cleanText.trim().split(/([' '])/g);
      console.log(this.sentence)
    }
  },
  mounted() {
    this.$root.$on('image-decoded', this.feedBraille);
  }
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
