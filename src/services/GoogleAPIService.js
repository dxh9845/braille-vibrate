import axios from 'axios';

export default {
  /**
     * Call Google's ML Vision API and retrieve text from the image.
     * @param {Object} The parameters to send to the API. See Google spec for details.
     */
  async retrieveText(postBody) {
    const res = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.VUE_APP_GAPI_KEY}`,
      postBody,
    );

    return res;
  },
};
