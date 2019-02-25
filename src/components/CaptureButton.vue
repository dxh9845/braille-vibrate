<template>
  <div>
    <b-row class="mt-4 d-flex text-center">
      <b-col>
        <b-form-file
          v-model="uploadedFile"
          v-on:change="onFileChange"
          placeholder="Capture an image"
          :state="Boolean(uploadedFile)"
          accept="image/jpeg, image/png"
          capture
        ></b-form-file>
      </b-col>
    </b-row>
    <b-row class="mt-4 text-center">
      <b-col>
        <b-btn class="w-100" @click="imageUpload">Submit</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import GoogleService from "../services/GoogleAPIService";

export default {
  name: "capture-button",
  data() {
    return {
      uploadedFile: null,
      base64File: null
    };
  },
  methods: {
    onFileChange({ target }) {
      this.uploadedFile = target.files[0];
      this.beginEncode();
    },
    beginEncode() {
      let fr = new FileReader();
      fr.onload = this.encodeFile;
      fr.readAsBinaryString(this.uploadedFile);
    },
    encodeFile({ target }) {
      this.base64File = btoa(target.result);
      console.log("Encoding finished");
      // We've uploaded a new file, reset the state of the board
      this.$root.$emit("reset-index");
    },
    async imageUpload() {
      let postBody = {
        requests: [
          {
            image: {
              content: this.base64File
            },
            features: [
              {
                type: "TEXT_DETECTION",
                maxResults: 1
              }
            ]
          }
        ]
      };
      // Pass our base64 image to the Google API
      let res = await GoogleService.retrieveText(postBody);
      // Let other components know that the image has been decoded
      this.$root.$emit(
        "image-decoded",
        res.data.responses[0].fullTextAnnotation
      );
    }
  }
};
</script>

<style>
div {
  overflow: hidden;
}
</style>
