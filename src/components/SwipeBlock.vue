<template>
    <div>
        <span class='square' 
            v-on:touchmove="test"
            v-on:touchstart="touchStart"
            v-on:touchend="touchEnd">

            <div class='b-row'>
                <span v-on:click="test">1</span>
                <span v-on:click="test">2</span>
            </div>
            <div class='b-row'>
                <span v-on:click="test">3</span>
                <span v-on:click="test">4</span>
            </div>
            <div class='b-row'>
                <span v-on:click="test">5</span>
                <span v-on:click="test">6</span>
            </div>
        </span>

        <div>
            You swiped {{ text }} and are over {{ current_over }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'swipe-block',
    data() {
        return {
            text: null,

            swiped_direction: null,
            page_x: null,
            page_y: null,
            x_value: null,
            y_value: null
        }
    },
    computed: {
        current_over: function () {
            return document.elementFromPoint(this.page_x, this.page_y).innerText;
        }
    },
    methods: {
        test({ touches }) {
            this.page_x = touches[0].pageX;
            this.page_y = touches[0].pageY;
            console.log(this.page_x)
            // console.log(target)
            // console.log(`Touched ${target.innerText}`)
        },
        touchStart({ touches }) {
            this.x_value = touches[0].clientX;
            this.y_value = touches[0].clientY;
        },
        touchEnd(e) {
            if (!this.x_value || !this.y_value) {
                return 
            }

            const touches = e.changedTouches;
            // console.log(e)

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
            // this.page_x = null;
            // this.page_y = null;
        }
    }
}
</script>

<style>
.square {
    display: block;
    background-color: whitesmoke;
    color: #FFF;
    /* width: 450px; */
    /* height: 600px; */
}

.square .b-row {
    width: 100%;
    height: 250px;
}

.square .b-row span {
    display: inline-block;
    border: 2px solid blue;
    height: 75%;
    width: 220px;
    margin: 20px;
    color: black;
}
</style>
