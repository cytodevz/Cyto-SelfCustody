<template>
    <div>
        <div class="p-2" v-show="errordisplay">
            <div class="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" @click="closeError()"
                        class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ msg }}</span>
                </div>
            </div>
        </div>

        <div class="p-2" v-show="successdisplay">
            <!-- <div class="alert alert-success shadow-lg">
                <div class="flex justify-center">
                  
                    <span >{{ msg }}</span>
                </div>
            </div> -->

            <div class="alert alert-success shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ msg }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        msg: String,
        errordisplay: Boolean,
        successdisplay: Boolean
    },



    methods: {
        displayError() {
            this.errordisplay = true;

        },
        displaySuccess() {
            this.successDisplay = true;

        },
        displayErrorMessage(msg) {
            this.errordisplay = true;
            this.msg = msg

        },
        displaySuccessMessage(msg) {
            this.successDisplay = true;
            this.msg = msg


        },

        closeError() {
            this.errordisplay = false;
        },
        closeSuccess() {
            this.errordisplay = false;

        },
    }
}
</script>
  