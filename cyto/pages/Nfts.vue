<template>
    <NuxtLayout name="dashboardlayout">
        <div class="container mx-auto">
            <!-- <h2 class="text-2xl font-bold mb-4">Crypto Assets</h2> -->
            <ul class="grid lg:grid-cols-4 gap-4">


                <li class="bg-white shadow-md p-4 rounded-lg" v-for="(item, index) in assets" :key="item.propertyid">
                    <div>
                        <div>

                            <div class="card w-full bg-base-100 shadow-xl p-2">
                                <figure><img :src="assetDetails[index].image" alt="Shoes" />
                                </figure>

                                <!-- <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> -->
                                <div class="card-body">
                                    <h2 class="card-title">{{ assetDetails[index].name }} ({{item.tokens[0].amount}})</h2>
                                    <p>{{ assetDetails[index].description }}</p>
                                    <div class="card-actions justify-start">
                                        <label class="btn btn-active btn-secondary" @click="currrentItem(index)"
                                            for="send-modal">send</label>
                                    </div>
                                </div>
                            </div>


                            <!-- <div class="card w-full bg-primary text-primary-content p-2">
                                <div class="card-body">
                                    <h2 class="card-title">{{ assetDetails[index].name }}</h2>
                                    <p> balance: <b>{{ item.tokens[0].amount }} </b></p>
                                    <p> token standard: KL-88 {{ index }}</p>

                                    <div class="card-actions justify-end p-2">
                                        <label class="btn btn-active btn-secondary" @click="currrentItem(item.propertyid)"
                                            for="send-modal">send</label>
                                    </div>
                                </div>
                            </div> -->


                        </div>
                    </div>
                </li>

            </ul>
        </div>


        <!-- send send modal -->
        <input type="checkbox" id="send-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">
                <div class="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
                    <div class="px-4 py-4">
                        <div class="font-bold text-xl mb-2">Send </div>
                        <p class="text-gray-700 text-base">
                            enter token amount you want to send!
                        </p>
                        <div class="p-2">

                        </div>
                        <div v-if="alert.error == true" class="alert alert-error">
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg> -->
                            <span class="justify-center">{{ alert.msg }}</span>

                            <!-- <span class="m-0">there is an error somewhere try checking out other things so we can be sure.</span> -->
                        </div>
                        <div class="alert alert-success" v-if="alert.successful == true">
                            <span>funds successfully sent!</span>
                        </div>

                        <!-- view 1 -->
                    </div>
                    <div v-if="view.sendView == 1" class="px-3 py-2">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Enter amount</span>
                            </label>
                            <label class="input-group">
                                <input type="text" placeholder="0.01" v-model="sendingAmount"
                                    class="input input-bordered" />
                                <span>units</span>

                            </label>
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Enter address</span>
                            </label>
                            <label class="input-group">
                                <input type="text" v-model="recipientAddress" class="input input-bordered" />
                                <span @click.prevent="pasteAddress()">paste</span>
                            </label>
                        </div>
                        <div class="modal-action justify-center">
                            <div>
                                <label ref="toggleModalBtn" for="receive-modal" @click.prevent="sendNextView()"
                                    class="btn btn-primary">Next</label>

                            </div>





                            <div>
                                <label for="send-modal" class="btn w-full">Close</label>
                            </div>




                        </div>


                    </div>

                    <!-- view 2 -->
                    <div v-if="view.sendView == 2" class="px-3 py-2">

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Enter your passkey</span>
                            </label>
                            <label class="input-group">
                                <input :type="showPasskey ? 'text' : 'password'" v-model="passkey"
                                    class="input input-bordered" />
                                <span>
                                    <div>
                                        <label class="swap swap-rotate">

                                            <!-- this hidden checkbox controls the state -->
                                            <input type="checkbox" />


                                            <!-- show icon -->
                                            <svg @click="showVisibility('showPasskey')" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                class="swap-on w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

                                            <!-- hide icon -->
                                            <svg @click="hideVisibility('showPasskey')" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                class="swap-off w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>


                                        </label>
                                    </div>

                                </span>
                            </label>
                        </div>
                        <div class="modal-action justify-center">
                            <div>
                                <button for="receive-modal" @click.prevent="sendNextView()" class="btn btn-primary"
                                    :class="loading">Send
                                </button>

                            </div>

                            <div>
                                <label for="receive-modal" @click.prevent="sendPreviousView()"
                                    class="btn btn-secondary">back</label>

                            </div>


                            <div>
                                <label for="send-modal" class="btn w-full">Close</label>
                            </div>


                        </div>
                    </div>


                </div>







            </div>
        </div>

    </NuxtLayout>
</template>
    
<script>
import axios from 'axios';


export default {
    data() {
        return {
            assets: [],
            assetDetails: [],
            passkey: '',
            recipientAddress: '',
            sendingAmount: '',
            runtimeconfig: useRuntimeConfig(),
            alert: {
                msg: '',
                successful: false,
                error: false
            },
            view: {
                sendView: 1,
                max: 2
            },
            showPasskey: false,
            propertyId: '',
            sendNftModel: {
                propertyId: '',
                tokenStart: '',
                tokenEnd: '',
                amountToSend: '',
                receiver: ''
            },
            walletName:''

        }
    },
    methods: {
        currrentItem(index) {
            //set the NFT to send param right here



            //console log the asset
            //  console.log('asset: ', this.assets);
            const propertyid = this.assets[index].propertyid;
            const tokenstart = this.assets[index].tokens[0].tokenstart;
            const tokenend = this.assets[index].tokens[0].tokenend;

            this.sendNftModel.propertyId = propertyid;
            this.sendNftModel.tokenStart = tokenstart;
            this.sendNftModel.tokenEnd = tokenend;






            //dynamically clicks the next button after getting the currently clicked item
            this.$refs.toggleModalBtn.click();


        },
        async pasteAddress() {
            try {
                const clipboardText = await navigator.clipboard.readText();
                this.recipientAddress = clipboardText;
            } catch (error) {
                console.error('Failed to read clipboard:', error);
            }
        },
        showLoading() {
            this.loading = 'loading';

        },
        hideLoading() {
            this.loading = '';


        },
        displayErrorAlert(msg) {
            this.alert.successful = false;
            this.alert.error = true;
            this.alert.msg = msg;

        },
        displaySuccessfulAlert(msg) {
            this.alert.successful = true;
            this.alert.error = false;
            this.alert.msg = msg;

        },
        noAlert() {
            this.alert.successful = false;
            this.alert.error = false;
            this.alert.msg = '';

        },
        hideVisibility(selection = 'showBalance') {

            switch (selection) {
                case 'showBalance':
                    this.showBalance = false;
                    break;

                case 'showPasskey':
                    this.showPasskey = false;
                    break;

            }



        },
        showVisibility(selection = 'showBalance') {

            switch (selection) {
                case 'showBalance':
                    this.showBalance = true;
                    break;

                case 'showPasskey':
                    this.showPasskey = true;
                    break;

            }

        },
        sendModalView1Validation() {
            //init
            const objRes = {
                successful: false,
                message: ''
            }
            try {

                if (this.sendingAmount == null || this.sendingAmount < 0.00001) {
                    throw ("invalid sending amount entry");

                }

                if (this.recipientAddress == null || this.recipientAddress == '') {
                    throw ("invalid address entry");
                }


                //if it ets this far then it was valid
                objRes.successful = true;
                objRes.message = "all looks good";
            } catch (err) {
                objRes.message = err;
                objRes.successful = false;

            }
            //return the validation object
            return objRes;
            //log the obj
            console.log('validationRes', objRes);
        },
        sendModalView2Validation() {
            //init
            const objRes = {
                successful: false,
                message: ''
            }
            try {


                if (this.passkey == null || this.passkey == '') {
                    throw ("passkey cannot be null");
                }


                //if it ets this far then it was valid
                objRes.successful = true;
                objRes.message = "all looks good";
            } catch (err) {
                objRes.message = err;
                objRes.successful = false;

            }
            //return the validation object
            return objRes;
            //log the obj
            console.log('validationRes', objRes);
        },
        cacheNftItems() {
            //store assets

            //stroe asset details

        },

        async encryptionMethod(message) {

            let data = JSON.stringify({
                "message": message
            });

            const baseurl = this.runtimeconfig.public.apiBase;
            const uri = baseurl + '/api/Utilities/Encrypt';





            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: uri,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.post(uri, data, config);
            return response.data





        },

        sendNextView() {
            this.displaySuccessfulAlert('sample successful message');

            //check the validation to determine whic validation should go

            let validationObj = {};
            switch (this.view.sendView) {

                case 1:
                    validationObj = this.sendModalView1Validation();
                    break;
                case 2:
                    validationObj = this.sendModalView2Validation();

                    break;
                // default:
                // validationObj = this.sendModalView1Validation();

                //   break;

            }

            if (validationObj.successful == false) {

                const msg = validationObj.message;
                this.displayErrorAlert(msg);
            } else {

                //clear all error or success alerts
                this.noAlert();

                //if the max view has been attained send the funds
                if (this.view.sendView == this.view.max) {


                    this.sendFunds();
                } else {
                    this.view.sendView = this.view.sendView + 1;


                }


            }

        },


        sendPreviousView() {
            this.view.sendView = this.view.sendView - 1;

        },

        async nftDetailsAsync(pptId, tokenstart, tokenend) {

            const baseurl = this.runtimeconfig.public.apiBase;
            const uri = baseurl + `/api/Explorer/UniqueNFTdetails`;

            let data = JSON.stringify({
                "tokenidstart": tokenstart,
                "tokenidend": tokenend,
                "propertyid": pptId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const res = await axios.post(uri, data, config);

            return res.data;

            //  console.log(JSON.stringify(response.data));




        },
        async sendNftMethodAsync(passphrase) {

            const baseurl = this.runtimeconfig.public.apiBase;
            const uri = baseurl + '/api/NonFungibleTokens/SendNFT';


            let data = JSON.stringify({
                "propertyId": propertyId,
                "tokenStart": tokenStart,
                "tokenEnd": tokenEnd,
                "amountToSend": amountToSend,
                "sender": sender,
                "receiver": receiver
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: uri,
                headers: {
                    'encryptedpassphrase': '<string>',
                    'wallet': '<string>',
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



        async sendFundsMethod(passphrase) {

            this.showLoading();
            console.log('plaintext passphrase to use: ', passphrase);




            const encryptedResponse = await this.encryptionMethod(passphrase);
            const cipheredPassPhrase = encryptedResponse.data;

            console.log('encryptedResponse: ', encryptedResponse);


            console.log('cipher passphrase to use: ', cipheredPassPhrase);

            //retrieve current user address
            const walletAddress = localStorage.getItem('OWA');
            let data = JSON.stringify({
                "propertyId": this.sendNftModel.propertyId,
                "tokenStart": this.sendNftModel.tokenStart,
                "tokenEnd": this.sendNftModel.tokenEnd,
                "amountToSend": this.sendingAmount,
                "sender": walletAddress,
                "receiver": this.recipientAddress
            });


             const baseurl = this.runtimeconfig.public.apiBase;

            //for testing and debugging
           // const baseurl = 'https://localhost:7177';


            const uri = baseurl + '/api/NonFungibleTokens/SendNFT';

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: uri,
                headers: {
                    'encryptedpassphrase': cipheredPassPhrase,
                    'wallet': this.walletName,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            //log data
            console.log('data: ', data);
            console.log('walletname: ', this.walletName);
            console.log('ciphertext: ', cipheredPassPhrase);

            axios.post(uri, data, config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));

                    const msg = response.data.message

                    if (response.data.successful == false) {
                        
                        throw msg;
                    } else {
                        this.displaySuccessfulAlert(msg);
                        this.passkey = '';

                    }

                    this.hideLoading();
                })
                .catch((error) => {
                    this.displayErrorAlert(error);
                    console.log(error);
                    this.hideLoading();
                });

        },

        sendFunds() {


            try {
                //get the wallet passphrase
                //decode the wallet cipher texts 
                var wallet = localStorage.getItem('wallet');

                var deserializedObject = JSON.parse(wallet);

                //const walletNameDecrypt = deserializedObject.wallet;
                const walletPassphraseCipherText = deserializedObject.passKey;





                //decrypt the passphrase usinfg the passkey
                //  var actualPassphrase = this.decryptMessageII(walletPassphraseCipherText, this.passkey);

                //we usae the passkey to decrypt the passphrase
                this.passPhrase = this.decryptMessageII(walletPassphraseCipherText, this.passkey);





                console.log('pasphrase1: ', this.passPhrase);


                //encrypt the passkey

                let passPhrase = this.passPhrase;

                this.sendFundsMethod(passPhrase);

            } catch (error) {
                this.displayErrorAlert(error);

            }


        },

        async getAddressNfts() {
            //since we used a layout that checks for this during bootstrap, we can call this
            const ltcAddress = localStorage.getItem('OWA');
            // const ltcAddress = 'MH6ceMtr63iLSd7iAw9h12Vub4VGkW9UCq';
            // const url = `https://cyto.azurewebsites.net/api/Address/NFTs?Address=${ltcAddress}`;

            const baseurl = this.runtimeconfig.public.apiBase;
            const url = baseurl + `/api/Address/NFTs?Address=${ltcAddress}`;



            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: url,

            };

            var nftDetails = await axios.get(url);

            console.log(JSON.stringify(nftDetails.data));
            this.assets = nftDetails.data.data;

            // //load initial checksum from localhost
            // const initialChecksum = localStorage.getItem('assetCheckSum');


            // //run a checksum of the assets for comparisn purpose.
            // const currentChecksum = hashData(this.assets);

            // //  run an integrity check 
            // const integrity = this.$integrity(currentChecksum, initialChecksum);

            // if (integrity == true) {
            //     //use cache
            // } else {

            //     for (let index = 0; index < this.assets.length; index++) {

            //         //var
            //         let nftresObj = this.assets[index];

            //         //get the propertyid
            //         let pptId = nftresObj.propertyid;

            //         let tokens = nftresObj.tokens[0];

            //         //get the token start
            //         let tokenstart = tokens.tokenstart;


            //         //get the token end
            //         let tokenend = tokens.tokenend;

            //         console.log('pptid: ', pptId);
            //         console.log('token start: ', tokens.tokenstart);
            //         console.log('token end: ', tokens.tokenend);

            //         //retrives from the blockchain or use a cache at this point, if the digest or the checksum has changed
            //         let detailedNFTResponseObj = await this.nftDetailsAsync(pptId, tokenstart, tokenend);



            //         console.log('detailedNFTResponseObj: ', detailedNFTResponseObj);
            //         console.log(`grantdata ${index}: `, detailedNFTResponseObj.data[0].grantdata);

            //         //deserialise the object grantdata
            //         let grantData = detailedNFTResponseObj.data[0].grantdata;


            //         //deserialise this
            //         var data = JSON.parse(grantData);
            //         this.assetDetails.push(data);

            //         console.log('deserialise data: ', data);
            //         console.log('asset details: ', this.assetDetails);




            //     }



            //     //cache this afterwards
            //     localStorage.setItem('assetCheckSum', this.assets);
            // }



            for (let index = 0; index < this.assets.length; index++) {

                //var
                let nftresObj = this.assets[index];

                //get the propertyid
                let pptId = nftresObj.propertyid;

                let tokens = nftresObj.tokens[0];

                //get the token start
                let tokenstart = tokens.tokenstart;


                //get the token end
                let tokenend = tokens.tokenend;

                console.log('pptid: ', pptId);
                console.log('token start: ', tokens.tokenstart);
                console.log('token end: ', tokens.tokenend);

                //retrives from the blockchain or use a cache at this point, if the digest or the checksum has changed
                let detailedNFTResponseObj = await this.nftDetailsAsync(pptId, tokenstart, tokenend);



                console.log('detailedNFTResponseObj: ', detailedNFTResponseObj);
                console.log(`grantdata ${index}: `, detailedNFTResponseObj.data[0].grantdata);

                //deserialise the object grantdata
                let grantData = detailedNFTResponseObj.data[0].grantdata;


                //deserialise this
                var data = JSON.parse(grantData);
                this.assetDetails.push(data);

                console.log('deserialise data: ', data);
                console.log('asset details: ', this.assetDetails);




            }

        },


        initFn() {


            //decode the wallet cipher texts 
            var wallet = localStorage.getItem('wallet');

            var deserializedObject = JSON.parse(wallet);

            //log wallet

            if (wallet == null) {
                this.$router.push('/onboard');


            } else {
                const walletNameDecrypt = deserializedObject.wallet;
                const walletPassphrase = deserializedObject.passKey;


                const walletName = this.decryptMessage(walletNameDecrypt);




                //initialise the walletname
                this.walletName = walletName;

                //remember to encrypt data
                localStorage.setItem('OWN', walletName);

            }


            this.getAddressNfts();


        },

    },
    mounted() {
        this.initFn();
    },
    setup() {

        const encryptMessageII = useNuxtApp().$encryptMessageWithCustomKey;
        const decryptMessageII = useNuxtApp().$decryptMessageWithCustomKey;
        const encryptMessage = useNuxtApp().$encryptMessage;
        const decryptMessage = useNuxtApp().$decryptMessage;
        const hashData = useNuxtApp().$hashData;
        const integrity = useNuxtApp().$integrity;



        return {

            encryptMessageII,
            decryptMessageII,
            encryptMessage,
            decryptMessage


        }
    }


}
</script>
    
<style></style>