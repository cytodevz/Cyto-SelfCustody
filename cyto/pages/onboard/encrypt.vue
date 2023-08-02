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
                        <h2 class="card-title">encrypt wallet!</h2>
                        <p>Enter passkey here</p>
                        <div class="card-actions flex justify-center">
                            <form action="#" id="PassKeyFormId">
                                <div class="p-2">

                                    <!-- <input required type="password" minlength="15" maxlength="30" v-model="passphrase"
                                        placeholder="passphrase"
                                        class="input input-bordered input-primary w-full max-w-xs" /> -->

                                    <div class="form-control">
                                        <div class="input-group">
                                            <input required :type="showPassphrase ? 'text' : 'password'" minlength="8"
                                                placeholder="passphrase" v-model="passphrase"
                                                class="input input-bordered" />
                                            <button class="btn btn-square btn-primary" @click.prevent="togglePasswordVisibility()">
                                                <!-- Eye icon for revealing/hiding password -->
                                                {{ toggleText }}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="p-2">
                                    <div class="form-control">
                                        <div class="input-group">
                                            <input required :type="showConfirmPassphrase ? 'text' : 'password'"
                                                minlength="15" placeholder="confirm passphrase" v-model="confirmPassphrase"
                                                class="input input-bordered" />
                                            <button class="btn btn-square"
                                                @click.prevent="toggleConfirmPasswordVisibility()">
                                                <!-- Eye icon for revealing/hiding password -->
                                                {{ confirmPasswordToggleText }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-2">
                                    <button class="btn btn-wide btn-primary" :class="loading"
                                        @click.prevent="encryptWallet()">Create
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
            },
            success: {
                successDisplay: false,
            },
            passphrase: '',
            confirmPassphrase: '',
            responseFromChain: '',
            showPassphrase: false,
            showConfirmPassphrase: false,
            toggleText: 'show',
            confirmPasswordToggleText: 'show',
            msg: '',
            imgBlob: ''
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



        // validatePassword(password) {
        //     let isValid = false;
        //     // Check if password is at least 8 characters long
        //     if (password.length < 8) {
        //         throw "weak password!! Check if password is at least 8 characters long"
        //     }

        //     // Check if password contains at least one lowercase letter, one uppercase letter, and one digit
        //     var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        //     if (!regex.test(password)) {
        //         throw "weak password!! Check if password contains at least one lowercase letter, one uppercase letter, and one digit"
        //     }

        //     // Check if password contains at least one special character
        //     var specialChars = "!@#$%^&*()_+[]{}|;':\"<>,.?/";
        //     for (var i = 0; i < specialChars.length; i++) {
        //         if (password.indexOf(specialChars[i]) > -1) {
        //             isValid = true;
        //         }
        //     }

        //     //  isValid = false;

        //     if (isValid == false) {
        //         throw "weak password, please use a stronger password "
        //     }
        // },
        validatePassword(password) {
            if (password.length < 8) {
                throw "Password must be at least 8 characters long.";
            } else if (!/\d/.test(password)) {
                throw "Password must contain at least one digit.";
            } else if (!/[a-z]/.test(password)) {
                throw "Password must contain at least one lowercase letter.";
            } else if (!/[A-Z]/.test(password)) {
                throw "Password must contain at least one uppercase letter.";
            } else if (!/[!@#$%^&*()\-_=+{};:,<.>/?[\]\\|`~]/.test(password)) {
                throw "Password must contain at least one special character.";
            } else if (/\s/.test(password)) {
                throw "Password must not contain whitespace.";
            } else {
                console.log("Password is strong.");
            }
        },



       
        confirmPassPhraseValidation() {

            if (this.passphrase != this.confirmPassphrase) {
                throw "passphrase and confirm passphrase doesn't match";
            }

        },
        showLoading() {
            this.loading = 'loading';

        },
        hideLoading() {
            this.loading = '';


        },

        validation() {
            console.log('hello 1');

            //init
            let objRes = {
                isValid: false,
                message: ''
            };

            try {
                // const submitFormDOM = document.getElementById("PassKeyFormId");

                console.log('hello 2');

                console.log('passphrase to validate: ', this.passphrase)

                if (this.passphrase == null ) {
                    throw ("passphrase cannot be empty");
                }
                if (this.confirmPassphrase == null) {
                    throw ("confirm passphrase cannot be empty");
                }


                this.confirmPassPhraseValidation();

                console.log('passphrase before validation: ', this.passphrase);


                this.validatePassword(this.passphrase);



                // if (!submitFormDOM.checkValidity()) {
                //     console.log("errormsg", submitFormDOM.validationMessage);
                //     throw ("one or more input validation occurred");
                // }
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

        generateQR(msg) {
            let data = JSON.stringify({
                "message": msg
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://cyto.azurewebsites.net/api/Utilities/GenerateQR',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));

                    const blob = response.data.data;

                    //download the qrcode
                    this.downloadPIC(blob);
                })
                .catch((error) => {
                    console.log(error);
                });


        },
        downloadPIC(myBlob) {
            // const myBlob = this.imgBlob;

        //    console.log('img blob: ',this.imgBlob);

            fetch(myBlob).then(res => res.blob())
                .then(blobRes => {
                    console.log('final Blob', blobRes);

                    // Create a temporary URL for the blob
                    const url = URL.createObjectURL(blobRes);

                    console.log('url: ', url);


                    // Create a new image element
                    const img = new Image();

                    // Set the image source to the temporary URL
                    img.src = url;

                    // Wait for the image to load
                    img.onload = function () {
                        // Create a temporary canvas element
                        const canvas = document.createElement('canvas');

                        // Set the canvas dimensions to match the image
                        canvas.width = img.width;
                        canvas.height = img.height;

                        // Draw the image onto the canvas
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);

                        // Convert the canvas to a data URL
                        const dataURL = canvas.toDataURL('image/png');

                        // Create a new link element to download the image
                        const link = document.createElement('a');
                        link.download = 'Cyto_PIK.png'; // Set the filename
                        link.href = dataURL; // Set the data URL as the link's href
                        document.body.appendChild(link); // Add the link to the document
                        link.click(); // Click the link to download the image
                        document.body.removeChild(link); // Remove the link from the document

                    };


                });


        },

        encryptWalletMethod() {

            //retrieve wallet name cipher text
            const walletNameCipherText = localStorage.getItem('walletName');

            //decrypt the walletname
            const wallet = this.decryptCipherText(walletNameCipherText);


            const passKey = this.passphrase;
                        console.log('passKey', this.passphrase);


            //encrypt using the user passkey
            const passphraseCipherText = this.generatePassPhrase(passKey);

            //create a wwallet object to be encrypted
            const walletObjPlainText = {
                wallet: walletNameCipherText,
                passKey: passphraseCipherText

            };

            const wallet_serialised = JSON.stringify(walletObjPlainText);

            console.log('serialisedWallet',wallet_serialised);
            console.log('actualPassPhrase: ', this.decryptMessageII(passphraseCipherText,this.passphrase));


            const encryptedWallet = this.encryptMessageII(wallet_serialised, this.passphrase);

            const passPhraseGenerated = this.decryptMessageII(passphraseCipherText,this.passphrase);



            let data = JSON.stringify({
                "passphrase": passPhraseGenerated
            });

            console.log('wallet name before call', wallet);
            console.log('passPhraseGenerated name before call', passPhraseGenerated);



            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://cyto.azurewebsites.net/api/Wallet/encryptwallet',
                headers: {
                    'wallet': wallet,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));


                    if (response.data.successful != true) {
                        throw response.data.message
                    } else {

                        //store the encrypted wallet
                        localStorage.setItem('onboardingLevel', '2');

                        localStorage.setItem('encryptedWallet', encryptedWallet);

                        //download the encrypted wallet

                        //enerate QR code for wallet
                         this.generateQR(encryptedWallet)

                        
                        this.downloadPIC();






                        //redirect to next level
                        this.$router.push('/import');

                    }



                })
                .catch((error) => {
                    console.log(error);
                });


        },
        displayErrorMessage(msg) {
            this.error.errordisplay = true;
            this.msg = msg

        },
        displaySuccessMessage(msg) {
            this.success.successDisplay = true;
            this.msg = msg


        },

        encryptWallet() {

            try {

                console.log('encrypt wallet init');

                var res = this.validation();

                console.log('response in encrypt wallet: ', res);
                if (!res.isValid) {

                    throw (res.message);
                }

                this.showLoading();

                this.encryptWalletMethod();


            } catch (error) {
                this.displayErrorMessage(error);


            }

        }

    },
    mounted() {
        //check the device storage to k now what leve this user is
        const state = localStorage.getItem('ws');
        const username = localStorage.getItem('username');


        console.log('wallet name: ', username);

        console.log('wallet onboardin level: ', state);
    },

    setup() {

        const encryptMessageII = useNuxtApp().$encryptMessageWithCustomKey;
        const decryptMessageII = useNuxtApp().$decryptMessageWithCustomKey;
        const encryptMessage = useNuxtApp().$encryptMessage;
        const decryptMessage = useNuxtApp().$decryptMessage;

        const randomNumber = useNuxtApp().$randomNumber;
        const generateWords = useNuxtApp().$generatePassPhrase;

        const generatedPassPhrase = generateWords(12);
        const generateNumber = randomNumber();




        function decryptCipherText(cipherText) {
            const plainText = decryptMessage(cipherText);

            //console
            console.log('decrypted text: ', plainText);

            return plainText
        }

        function generatePassPhrase(passKey) {
            const cipherText = encryptMessageII(generatedPassPhrase,passKey);
            console.log('encrypted text: ', cipherText);           


            return cipherText


        }





        return {
            generatePassPhrase,
            decryptCipherText,
            encryptMessageII,
            decryptMessage,
            decryptMessageII


        }


    }
}
</script>

<style></style>