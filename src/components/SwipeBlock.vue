<template>
  <div v-on:touchmove="debouncedTouchMove" v-on:touchstart="touchStart" v-on:touchend="touchEnd">
    <div class='braille-grid'>
      <b-row class='braille-row my-4' v-bind:key="index" v-for="(row, index) in brailleArray[currentIndex]">
          <b-col :data-row="index" :data-col="0" class='border border-dark p-4 d-flex justify-content-center align-items-center'>
              <div :class="row[0] != 0 ? 'dot' : '' "></div>
          </b-col>
          <b-col :data-row="index" :data-col="1"  class='border border-dark p-4 d-flex justify-content-center align-items-center'>
              <div :class="row[1] != 0 ? 'dot' : '' "></div>
          </b-col>
      </b-row>

    </div>
    <b-row class="my-4 text-center">
      <b-col>
        <b-btn @click="changeIndex(-1)" :disabled="currentIndex == 0">Previous</b-btn>
      </b-col>
      <b-col>
        <h1> {{ currentLetter }} </h1>
      </b-col>
      <b-col>
        <b-btn @click="changeIndex(1)" :disabled="currentIndex == (word.length - 1)">Next</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _ from "lodash";
import BrailleService from '../services/BrailleConverter';

export default {
  name: "swipe-block",
  props: {
    word: {
      type: String,
      required: true,
      default: ''
    },
  },
  data() {
    return {
      currentIndex: 0,
      matrix: null,
      text: null, 
      swiped_direction: null,
      page_x: null,
      page_y: null,
      x_value: null,
      y_value: null
    };
  },
  computed: {
    brailleArray: function() {
      return BrailleService.wordToBraile(this.word);
    },
    currentLetter: function() {
      return this.word[this.currentIndex]
    }
  },
  created() {
    this.debouncedTouchMove = _.debounce(this.getCurrentTouch, 50);
  },
  methods: {
    /** 
     * Change the letter we are looking at by pressing a button
     */
    changeIndex(changeVal) {
      let changeIndex = this.currentIndex + changeVal;
      if (changeIndex >= 0 && changeIndex <= (this.word.length - 1)) {
        this.currentIndex = changeIndex;
      }
    },
    /**
     * Get the user's position on the page
     */
    getCurrentTouch({ touches }) {
      try {
        this.page_x = touches[0].pageX;
        this.page_y = touches[0].pageY;

        let el = document.elementFromPoint(this.page_x, this.page_y);
 
        var { row, col } = el.dataset;

        row = parseInt(row);
        col = parseInt(col);

        if (this.brailleArray[this.currentIndex][row][col] == 1) {
          window.navigator.vibrate(200);
        }
      } catch (e) {}
    },
    touchStart({ touches }) {
      this.x_value = touches[0].clientX;
      this.y_value = touches[0].clientY;
    },
    touchEnd({ changedTouches }) {
      if (!this.x_value || !this.y_value) {
        return;
      }

      const touches = changedTouches;
      let currentX = touches[0].clientX;
      let currentY = touches[0].clientY;

      let diffX = this.x_value - currentX;
      let diffY = this.y_value - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Sliding horizontally
        if (diffX > 0) {
          this.text = "Left";
        } else {
          this.text = "Right";
        }
      } else {
        if (diffY > 0) {
          this.text = "Up";
        } else {
          this.text = "Down";
        }
      }

      this.x_value = null;
      this.y_value = null;
    }
  }
};
</script>

<style lang="scss">
.braille-grid {
  border: 2px solid black;

  .braille-row {
    min-height: 100px;
    background-color: #ececec;
  }
}

.dot {
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50px;
}
</style>
