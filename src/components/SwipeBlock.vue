<template>
  <div 
    v-on:touchmove="debouncedTouchMove" 
    v-on:touchstart="touchStart" 
    v-on:touchend="touchEnd">
    <div class='braille-grid'>
      <b-row class='braille-row my-4' v-bind:key="index" v-for="(row, index) in brailleArray[currentIndex]">
          <b-col :data-row="index" :data-col="0" class='border border-dark p-4 d-flex justify-content-center align-items-center'>
              <div  :data-row="index" :data-col="0" :class="row[0] != 0 ? 'dot' : '' "></div>
          </b-col>
          <b-col style='background-color: white;'></b-col>
          <b-col :data-row="index" :data-col="1"  class='border border-dark p-4 d-flex justify-content-center align-items-center'>
              <div :data-row="index" :data-col="1" :class="row[1] != 0 ? 'dot' : '' "></div>
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
      swipedDirection: null,
      gamma: 0,
      beta: 0,
      pageX: null,
      pageY: null,
      xValue: null,
      yValue: null
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
    this.debouncedTouchMove = _.debounce(this.getCurrentTouch, 100, {
      leading: true, trailing: false
    });
    if ( window.DeviceMotionEvent ) {
      window.ondeviceorientation = _.throttle(this.rotateDevice, 1000)
    }
  },
  methods: {
    rotateDevice({ beta, gamma }) {
      this.gamma += (gamma - this.gamma) / 5;
      // let changeX = (beta - this.beta) / 5;
      if (gamma >= 25) {
        this.changeIndex(1);
      } else if (gamma <= -25) {
        this.changeIndex(-1);
      }
    },
    /** 
     * Change the letter we are looking at by pressing a button
     */
    changeIndex(changeVal) {
      let changeIndex = this.currentIndex + changeVal;
      if (changeIndex >= 0 && changeIndex <= (this.word.length - 1)) {
        var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
        snd.play();
        this.currentIndex = changeIndex;
      }
    },
    /**
     * Get the user's position on the page
     */
    getCurrentTouch({ touches }) {
      try {
        console.log(touches)
        this.pageX = touches[0].pageX;
        this.pageY = touches[0].pageY;
        console.log(this.pageX, this.pageY)

        let el = document.elementFromPoint(this.pageX, this.pageY);
        console.log(el)

        var { row, col } = el.dataset;

        row = parseInt(row);
        col = parseInt(col);

        if (this.brailleArray[this.currentIndex][row][col] == 1) {
          window.navigator.vibrate(200);
        }
      } catch (e) { console.log(e)}
    },
    touchStart({ touches }) {
      this.xValue = touches[0].clientX;
      this.yValue = touches[0].clientY;
    },
    /**
     * At the end, identify the swipe direction
     */
    touchEnd({ changedTouches }) {
      if (!this.xValue || !this.yValue) {
        return;
      }

      const touches = changedTouches;
      let currentX = touches[0].clientX;
      let currentY = touches[0].clientY;

      let diffX = this.xValue - currentX;
      let diffY = this.yValue - currentY;

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

      this.xValue = null;
      this.yValue = null;
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
