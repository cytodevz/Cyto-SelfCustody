<template>
    <!--Create wallet addrress section-->
    <div class="container w-full">

        <div class="col-1">
            <div class="flex justify-center p-10">
                <div class="card w-96 bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="/images/logo1.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">unlock wallet!</h2>
                        <p>Enter passkey here</p>
                        <div class="card-actions flex justify-center">
                            <form action="#" id="PassKeyFormId">
                                <div class="p-2">

                                    <!-- <input required type="password" minlength="15" maxlength="30" v-model="passKey"
                                        placeholder="passKey"
                                        class="input input-bordered input-primary w-full max-w-xs" /> -->

                                    <div class="form-control">
                                        <div class="input-group">
                                            <input required :type="showPassphrase ? 'text' : 'password'" minlength="8"
                                                placeholder="passKey" v-model="passKey" class="input input-bordered" />
                                            <button class="btn btn-square btn-primary"
                                                @click.prevent="togglePasswordVisibility()">
                                                <!-- Eye icon for revealing/hiding password -->
                                                {{ toggleText }}
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <div class="p-2">
                                    <button class="btn btn-wide btn-primary" :class="loading"
                                        @click.prevent="unlockWallet()">Unlock
                                    </button>
                                </div>

                                <!-- <div class="p-2">
                                    <NuxtLink class="btn btn-wide  btn-ghost" to="/">cancel </NuxtLink>

                                </div> -->

                                <alert-display :msg="msg" :errordisplay="error.errordisplay"
                                    :successdisplay="success.successDisplay" />


                                <!-- <div class="p-2" v-show="error.errordisplay">
                            <div class="alert alert-error shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" @click="closeError()"
                                        class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{{ error.msg }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="p-2" v-show="success.successDisplay">
                            <div class="alert alert-success shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" @click="closeSuccess()"
                                        class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{{ success.msg }}</span>
                                </div>
                            </div>
                        </div> -->

                            </form>


                        </div>
                    </div>
                </div>

            </div>



            <!--steps-->
            <div class="flex justify-center p-10">
                <ul class="steps steps-horizontal ">
                    <li class="step step-primary"></li>
                    <li class="step step-primary"></li>
                    <li class="step step-primary"></li>
                    <li class="step step-primary"></li>
                </ul>


            </div>
        </div>





    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loading: '',
            error: {
                errordisplay: false,
            },
            success: {
                successDisplay: false,
            },
            passKey: '',
            showPassphrase: false,
            toggleText: 'show',
            msg: '',
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassphrase = !this.showPassphrase
            if (this.showPassphrase == true) {
                this.toggleText = 'hide'
            } else {
                this.toggleText = 'show'

            }
        },

        toggleConfirmPasswordVisibility() {
            this.showConfirmPassphrase = !this.showConfirmPassphrase
            if (this.showConfirmPassphrase == true) {
                this.confirmPasswordToggleText = 'hide'
            } else {
                this.confirmPasswordToggleText = 'show'

            }
        },


        showLoading() {
            this.loading = 'loading';

        },
        hideLoading() {
            this.loading = '';


        },

        validation() {
            //init
            const aResponse = {
                successful: false,
                message: ''
            }
            try {
                const submitFormDOM = document.getElementById("PassKeyFormId");

                if (this.passKey == null) {
                    throw ("passKey cannot be empty");
                }








                // if (!submitFormDOM.checkValidity()) {
                //     console.log("errormsg", submitFormDOM.validationMessage);
                //     throw ("one or more input validation occurred");
                // }
                //if it ets this far then it was valid
                aResponse.successful = true;
                aResponse.message = "all looks good";
            } catch (err) {
                aResponse.message = err;
                aResponse.successful = false;
            }
            //return the validation object
            return aResponse;
            //log the obj
            console.log('validationRes', aResponse);
        },



       
    displayErrorMessage(msg) {
      this.error.errordisplay = true;
      this.success.successDisplay = false;

      this.msg = msg;
     this.hideLoading();


    },
    displaySuccessMessage(msg) {
      this.error.errordisplay = false;
      this.success.successDisplay = true;
      this.msg = msg;
      this.hideLoading();


    },


        unlockWallet() {

            try {


                var res = this.validation();

                if (!res.successful) {

                    throw (res.message);
                }

                this.showLoading();

                //get wallet data
                const walletData = localStorage.getItem('walletData');

                //decrypt data
                const decryptedSerialisedWallet = this.decryptMessageII(walletData, this.passKey);

                //store as wallet
                localStorage.setItem('wallet', decryptedSerialisedWallet);
                this.displaySuccessMessage('passkey correct');

                this.$router.push('/');


            } catch (error) {
                this.displayErrorMessage("wrong passkey!!");


            }

        }

    },
    mounted() {
        //get wallet data
        const walletData = localStorage.getItem('walletData');

        if (walletData == null) {
            //redirect to next level
            this.$router.push('/import');
        }

        //decrypt usin pass key entered


    },

    setup() {

        const decryptMessageII = useNuxtApp().$decryptMessageWithCustomKey;

        return {
            decryptMessageII


        }


    }
}
</script>

<style></style>