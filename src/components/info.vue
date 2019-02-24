<template>
  <div>{{ info }}</div>
</template>

<script>
import axios from "axios";
export default {
  name: "info-api",
  data() {
    return {
      info: null,
      postBody:
        "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
      body: {
        requests: [
          {
            image: {
              content: null
              // source: {
              //   imageUri: "https://i.imgur.com/4QkhPlg.jpg" //image URL
              // }
            },
            features: [
              {
                type: "TEXT_DETECTION",
                maxResults: 1
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.$root.$on('image-upload', this.imageUpload);
  },
  methods: {
    imageUpload(base64File) {
      this.body.requests[0].image.content = base64File;
      this.getLabels();
    },
    getLabels() {
      axios
        .post(
          "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAbJTL_p1nIQISD1ky0S6V8d-aEq-axceU",
          this.body
        )
        .then(response => {
            this.$root.$emit('image-decoded', response.data.responses[0].fullTextAnnotation)
        });
    }
  },

};
</script>
