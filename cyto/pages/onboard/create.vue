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
                        <h2 class="card-title">create wallet!</h2>
                        <p>You are few steps away from a new LTC wallet, provide a name for this wallet</p>
                        <div class="card-actions flex justify-center">
                            <form action="#" id="FormId">
                                <div class="p-2">

                                    <input required type="text" minlength="3" maxlength="30" v-model="walletName"
                                        placeholder="Type here"
                                        class="input input-bordered input-primary w-full max-w-xs" />


                                </div>
                                <div class="p-2">
                                    <button class="btn btn-wide btn-primary" :class="loading"
                                        @click.prevent="createWallet()">Create
                                    </button>
                                </div>

                                <div class="p-2">
                                    <NuxtLink class="btn btn-wide  btn-ghost" to="/">cancel </NuxtLink>

                                </div>

                                <div class="p-2" v-show="error.errordisplay">
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
                                            <svg class="stroke-current flex-shrink-0 h-6 w-6" viewBox="0 0 24 24" width="24"
                                                height="24">
                                                <path fill="#000000"
                                                    d="M8.71,15.71L7.29,14.29L11.59,10L7.29,5.71L8.71,4.29L13,8.59Z" />
                                            </svg>

                                            <span>{{ success.msg }}</span>
                                        </div>
                                    </div>
                                </div>

                            </form>


                        </div>
                    </div>
                </div>

            </div>

            <!--steps-->
            <div class="flex justify-center p-10">
                <ul class="steps steps-horizontal ">
                    <li class="step step-primary"></li>
                    <li class="step"></li>
                    <li class="step"></li>
                    <li class="step"></li>
                    <li class="step"></li>

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
                msg: 'error carring out operation!'
            },
            success: {
                successDisplay: false,
                msg: 'successful operation!'
            },
            walletName: '',
            responseFromChain: ''
        }
    },
    methods: {

        showLoading() {
            this.loading = 'loading';

        },
        hideLoading() {
            this.loading = '';


        },
        displayError() {
            this.error.errordisplay = true;

        },
        displaySuccess() {
            this.success.successDisplay = true;

        },
        displayErrorMessage(msg) {
            this.error.errordisplay = true;
            this.error.msg = msg

        },
        displaySuccessMessage(msg) {
            this.success.successDisplay = true;
            this.success.msg = msg


        },

        closeError() {
            this.error.errordisplay = false;
        },
        closeSuccess() {
            this.success.errordisplay = false;

        },

        validation() {
            //init
            const objRes = {
                isValid: false,
                message: ''
            }
            try {
                const submitFormDOM = document.getElementById("FormId");

                if (this.walletName == null) {
                    throw ("wallet name cannot be empty");
                }

                if (!submitFormDOM.checkValidity()) {
                    console.log("errormsg", submitFormDOM.validationMessage);
                    throw ("one or more input validation occurred");
                }
                //if it ets this far then it was valid
                objRes.isValid = true;
                objRes.message = "all looks good";
            } catch (err) {
                objRes.message = err;
                objRes.isValid = false;
            }
            //return the validation object
            return objRes;
            //log the obj
            console.log('validationRes', objRes);
        },

     
        createWallet() {

            try {

                console.log('create wallet init');

                var res = this.validation();
                if (!res.isValid) {
                    this.displayError();

                    throw (res.message);
                }

                this.showLoading();

                this.createWalletMethod();


            } catch (error) {

            }

        },

     
       
        createWalletMethod() {

            let data = JSON.stringify({
                "wallet_name": this.walletName
            });

        //    const baseurl = this.runtimeconfig.public.apiBase;
            const uri = 'https://cyto.azurewebsites.net' + '/api/Wallet/create-encrypted-wallet';

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url:uri,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            axios.request(config)
                .then((response) => {
                    console.log('inside method: ', JSON.stringify(response.data));

                    if (response.data.successful != true) {
                        throw response.data.message
                    } else {

                        //set next onoarding level
                        localStorage.setItem('onboardingLevel', '1');

                        //get the wallet name used by the blockchain
                        const walletName = response.data.data.name;
                        const encryptedPassphrase = response.data.data.encryptedPassphrase;
                        const mnemonics = response.data.data.mnemonics;


                        //encrypt it locally
                        const walletNameCipherText = this.encryptMessage(walletName);


                        //store the wallet name
                        localStorage.setItem('walletName', walletNameCipherText);
                        console.log('walletnamegenerated: ', walletNameCipherText);

                        //store the encrypted passphrase
                        localStorage.setItem('encryptedPassphrase', encryptedPassphrase);

                        const encryptedMnemonics = this.encryptMessage(mnemonics);

                        //to be removed much after
                        localStorage.setItem('encryptedMnemonics', encryptedMnemonics);


                        console.log('encryptedPassphrase generated: ', walletNameCipherText);



                        //redirect to next level
                        this.$router.push('/onboard/encrypt');

                    }



                })
                .catch((error) => {
                    this.displayErrorMessage(error);
                    this.hideLoading();
                    //console.log(error);
                });




        }
    },
    setup(){

const encryptMessage = useNuxtApp().$encryptMessage;
const decryptMessage = useNuxtApp().$decryptMessage;

const randomNumber = useNuxtApp().$randomNumber;
const generateWords = useNuxtApp().$generatePassPhrase;

const generateWord = generateWords(1);
const generateNumber = randomNumber();




function decryptCipherText(cipherText){
    const plainText = decryptMessage(cipherText);

    //console
    console.log('decrypted text: ', plainText);

    return plainText
}

function generateWalletName(walletEnteredName){
    const generatedWalletName = walletEnteredName +  '_' + generateWord + '_' + generateNumber;
    const cipherText = encryptMessage(generatedWalletName);
    console.log('encrypted text: ', cipherText);


    return cipherText


}





return{
    generateWalletName,
    decryptCipherText,
    encryptMessage
   
}
}

}
</script>

<style></style>