<template>
    <!--Create wallet addrress section-->
    <div>
        sign message page

        <div>
           plaintext: 'i am a boy'
           
         

        </div>
        <div>
            cipher text: {{ encryptMessage('i am a boy') }}

        </div>
        <div>
           decrypted cipher text:  {{ decryptMessage('U2FsdGVkX19AvqM6q7JgFBCPbmxWnx3HAFBa8uhDQ2I=') }}
        </div>

        <div>
            hash:  {{ hashMessage('U2FsdGVkX19AvqM6q7JgFBCPbmxWnx3HAFBa8uhDQ2I=') }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    setup() {

        //import the appsettings
        const config = useRuntimeConfig();

        const encryptMessage = useNuxtApp().$encryptMessage;
        const decryptMessage = useNuxtApp().$decryptMessage;
        const hashMessage = useNuxtApp().$hashData;


        return {
            config,
            encryptMessage,
            decryptMessage,
            hashMessage

        }

    },
    data() {
        return {
            loading: '',
            error: {
                errordisplay: false,
            },
            success: {
                successDisplay: false,
            },
            msg: '',
            agreementMessage: `by signing this message you agreee to our terms and conditions`,
            passPhrase: ''
            


        }
    },
    methods: {
       

        showLoading() {
            this.loading = 'loading';

        },
        hideLoading() {
            this.loading = '';


        },

        validation() {
            //init
            const objRes = {
                isValid: false,
                message: ''
            }
            try {
                const submitFormDOM = document.getElementById("FormId");

                if (this.passphrase == null) {
                    throw ("passphrase cannot be empty");
                }
                if (this.confirmPassphrase == null) {
                    throw ("confirm passphrase cannot be empty");
                }

                this.PassPhraseValidation();

                this.confirmPassPhraseValidation();


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

        signMessageMethod() {

            const address = localStorage.getItem('addr');
            const message = this.agreementMessage;
            const baseUrl = this.config.public.apiBase;
            const wallet = localStorage.getItem('username');
            let data = JSON.stringify({
                "address": address,
                "message": message
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${baseUrl}/api/Wallet/sign-message`,
                headers: {
                    'wallet': wallet,
                    'passPhrase': this.passPhrase,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
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

        signMessage() {

            try {

                console.log('encrypt wallet init');

                var res = this.validation();
                console.log('hellowworld');

                if (!res.isValid) {

                    throw (res.message);
                }

                this.showLoading();

                this.signMessageMethod();


            } catch (error) {
                this.displayErrorMessage(error);


            }

        },

        createAddress(wallet) {
            let data = JSON.stringify({
                "label": ` ${wallet} main address`
            });

            const baseUrl = this.config.public.apiBase;

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${baseUrl}/api/Address/createAddress`,
                headers: {
                    'wallet': wallet,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    //set next onoarding level
                    localStorage.setItem('addr', response.data.data.address);
                    
                })
                .catch((error) => {
                    console.log(error);
                });


        }

    },
    mounted() {

        //console log config

        console.log('baseUrl: ', this.config.public.apiBase);
        //  create an addrress or this wallet
        const wallet = localStorage.getItem('username');

        this.createAddress(wallet);


    }

}
</script>

<style></style>