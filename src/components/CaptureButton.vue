<template>
    <div>
        <b-row>
            <b-col>
                <b-form-file
                    v-model="uploadedFile" 
                    placeholder='Capture an image'
                    :state="Boolean(uploadedFile)"
                    accept="image/jpeg, image/png"
                    capture>
                    CAPTURE
                </b-form-file> 
            </b-col>
            <b-col cols="1">
                <b-btn @click="beginEncode">SUBMIT</b-btn>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'capture-button',
    data() {
        return {
            uploadedFile: null,
            base64File: null,
        }
    }, 
    methods: {
        onFileChange({ target }) {
            this.uploadedFile = target.files[0];
        },
        beginEncode() {
            if (this.uploadedFile) {
                let fr = new FileReader();
                fr.onload = this.encodeFile;
                fr.readAsBinaryString(this.uploadedFile);
            }
        },
        encodeFile({ target }) {
            // console.log(e)
            
            console.log(target);
            this.base64File = btoa(target.result);
            this.$root.$emit('image-upload', this.base64File);
        }
    }
}
</script>

<style>

</style>
