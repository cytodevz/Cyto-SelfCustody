<template>
  <NuxtLayout name="dashboardlayout">
    <div class="flex flex-col lg:flex-row">
      <div class=" lg:w-1/2 p-4">
        <!-- Content for the left section -->
        <div class="stats shadow w-full">

          <div class="stat">
            <div class="stat-figure text-primary">

              <!-- 3D image -->
              <div>
                <img src="~/assets/images/launch-icon.08731588.png" alt="">
              </div>




            </div>
            <div class="stat-title">LTC Balance</div>
            <div class="stat-value text-primary">

              {{ displayedBal }}
            </div>
            <div class="stat-desc">
              <div>
                <label class="swap swap-rotate">

                  <!-- this hidden checkbox controls the state -->
                  <input type="checkbox" />


                  <!-- show icon -->
                  <svg @click="showVisibility()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="swap-on w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <!-- hide icon -->
                  <svg @click="hideVisibility()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="swap-off w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>


                </label>




                <span class="p-1">

                </span>


                <button @click.prevent="refreshWalletBalance()" class="btn btn-circle btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>

                </button>
              </div>
            </div>
          </div>



        </div>

      </div>
      <div class=" lg:w-1/2 p-4">
        <!-- Content for the right section -->
        <div class="card w-full h-full bg-primary text-neutral-content">
          <div class="card-body items-center text-center">
            <h2 class="card-title">Actions</h2>
            <p>you can receive and LTC / LTC assets through your wallet.You can also fund from your bank</p>
            <div class="card-actions justify-center">
              <div>
                <!--open a modal that retives the address and display the qrcode sharing-->
                <label class="btn btn-primary" for="receive-modal">Receive</label>
                <label class="btn btn-primary" for="send-modal"> Send </label>

              </div>

              <div>
                <a class="btn btn-primary" href="https://buy.moonpay.com">Fund</a>
                <button class="btn btn-primary">Swap</button>

              </div>



            </div>
          </div>
        </div>



      </div>
    </div>
  </NuxtLayout>




  <!-- MODALS -->


  <!-- Put this part before </body> tag -->

  <!-- receive modal -->
  <input type="checkbox" id="receive-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <!-- <h3 class="font-bold text-lg">Receiving Address details</h3> -->
      <div class="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
        <div class="px-4 py-4">
          <div class="font-bold text-xl mb-2">Receive </div>
          <p class="text-gray-700 text-base">
            <input id="addressId" v-model="address" hidden />
            {{ address }} this is your default LTC adddress for receiving funds!
          </p>

        </div>
        <div class="px-3 py-2">
          <img class="w-full h-auto mx-auto" :src="addressQrCodeBlobPPT" />
          <div class="modal-action justify-center">
            <div>
              <label for="receive-modal" @click.prevent="copy()" class="btn btn-primary">Copy</label>

            </div>

            <div>
              <label for="receive-modal" @click.prevent="shareContent()" class="btn btn-secondary">Share</label>

            </div>

            <div>
              <label for="receive-modal" class="btn w-full">Close</label>
            </div>

            <input type="text" id="addressCopied" v-model="address" class="hidden">


          </div>
        </div>
      </div>







    </div>
  </div>


  <!-- send send modal -->
  <input type="checkbox" id="send-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <div class="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
        <div class="px-4 py-4">
          <div class="font-bold text-xl mb-2">Send </div>
          <p class="text-gray-700 text-base">
            enter LTC amount you want to send!
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
              <input type="text" placeholder="0.01" v-model="sendingAmount" class="input input-bordered" />
              <span>LTC</span>

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
              <label for="receive-modal" @click.prevent="sendNextView()" class="btn btn-primary">Next</label>

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
              <input :type="showPasskey ? 'text' : 'password'" v-model="passkey" class="input input-bordered" />
              <span>
                <div>
                  <label class="swap swap-rotate">

                    <!-- this hidden checkbox controls the state -->
                    <input type="checkbox" />


                    <!-- show icon -->
                    <svg @click="showVisibility('showPasskey')" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="swap-on w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    <!-- hide icon -->
                    <svg @click="hideVisibility('showPasskey')" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="swap-off w-6 h-6">
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
              <button for="receive-modal" @click.prevent="sendNextView()" class="btn btn-primary" :class="loading">Send
              </button>

            </div>

            <div>
              <label for="receive-modal" @click.prevent="sendPreviousView()" class="btn btn-secondary">back</label>

            </div>


            <div>
              <label for="send-modal" class="btn w-full">Close</label>
            </div>


          </div>
        </div>


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
    //  runtimeconfig: useRuntimeConfig(),
      runtimeconfig: '',
      ltcBal: '****',
      walletName: '',
      address: '',
      showBalance: false,
      receiveAmount: 0,
      addressQrCodeBlobPPT: '',
      recipientAddress: '',
      sendingAmount: '',
      comment: 'a test sending transaction from cyto self custody wallet',
      passkey: '',
      showPasskey: false,
      passPhrase: '',
      alert: {
        msg: '',
        successful: false,
        error: false
      },
      view: {
        sendView: 1,
        max: 2
      }
    }
  },
  computed: {



    displayedBal() {
      if (this.showBalance == false) {
        return '******'

      } else {
        return this.ltcBal;
      }

    },



    ltcProtocolURL() {
      const ltcAddress = localStorage.getItem('OWA');
      //var ltcAddress = this.address




      const amount = this.receiveAmount;

      //if the anount you want to receive is less than zero or it is equual to zero or it is null
      //let the query string be ignored
      if (amount == null || amount <= 0) {
    //    const uri = `litecoin:${ltcAddress}?label=cyto%20wallet%20receive`;
        const uri = `litecoin:${ltcAddress}`;


        return uri;

      } else {
      //  const uri = `litecoin:${ltcAddress}?amount=${amount}&label=cyto%20wallet%20receive`;
        const uri = `litecoin:${ltcAddress}?amount=${amount}`;

        return uri;


      }

    },


  },
  methods: {

    showLoading() {
      this.loading = 'loading';

    },
    hideLoading() {
      this.loading = '';


    },

    async pasteAddress() {
      try {
        const clipboardText = await navigator.clipboard.readText();
        this.recipientAddress = clipboardText;
      } catch (error) {
        console.error('Failed to read clipboard:', error);
      }
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

    async encryptionMethod(message) {

      let data = JSON.stringify({
        "message": message
      });

     const  runtimeconfig = useRuntimeConfig();
      const baseurl = runtimeconfig.public.apiBase;
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



    async sendFundsMethod(passphrase) {

      this.showLoading();
      console.log('plaintext passphrase to use: ', passphrase);




      const encryptedResponse = await this.encryptionMethod(passphrase);
      const cipheredPassPhrase = encryptedResponse.data;

      console.log('encryptedResponse: ', encryptedResponse);


      console.log('cipher passphrase to use: ', cipheredPassPhrase);
      let data = JSON.stringify({
        "toAddress": this.recipientAddress,
        "amount": this.sendingAmount,
        "comment": this.comment
      });

      const  runtimeconfig = useRuntimeConfig();
      const baseurl = runtimeconfig.public.apiBase;

      const uri = baseurl + '/api/Litecoin/Send-from-wallet';

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: uri,
        headers: {
          'passphrase': cipheredPassPhrase,
          'wallet': this.walletName,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
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

        const walletNameDecrypt = deserializedObject.wallet;
        const walletPassphraseCipherText = deserializedObject.passKey;





        //decrypt the passphrase usinfg the passkey
        //  var actualPassphrase = this.decryptMessageII(walletPassphraseCipherText, this.passkey);

        this.passPhrase = this.decryptMessageII(walletPassphraseCipherText, this.passkey);





        console.log('pasphrase1: ', this.passPhrase);


        //encrypt the passkey

        let passPhrase = this.passPhrase;

        this.sendFundsMethod(passPhrase);

      } catch (error) {
        this.displayErrorAlert(error);

      }


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

    async getWalletDetails() {



      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://cyto.azurewebsites.net/api/Wallet/wallet-details',
        headers: {
          'wallet': this.walletName
        }
      };

      return await axios.request(config)
        .then((response) => {

          console.log('wallet: ', response.data);
          return response.data;
        })
        .catch((error) => {
          alert(error);
        });



    },

    async getWalletBalance() {

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://cyto.azurewebsites.net/api/Wallet/get-wallet-balance',
        headers: {
          'wallet': this.walletName
        }
      };

      return await axios.request(config)
        .then((response) => {

          this.ltcBal = response.data.data;
          return response.data;
        })
        .catch((error) => {
          alert(error);
        });

    },

    copyAddr() {
      const ltcAddress = localStorage.getItem('OWA');

      // Get the text field
      var copyText = document.getElementById("addressCopied");


      // Select the text field
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices

      const copiedVal = copyText.value;

      // Copy the text inside the text field
      navigator.clipboard.writeText(copiedVal);

      // Alert the copied text
      alert("Copied the text: " + copyText.value);
    },

    copy() {
      var dummy = document.createElement("textarea");
      const ltcAddress = localStorage.getItem('OWA');


      document.body.appendChild(dummy);

      dummy.value = ltcAddress;

      if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

        dummy.contentEditable = true;

        dummy.readOnly = true;

        var range = document.createRange();

        range.selectNodeContents(dummy);

        var selection = window.getSelection();

        selection.removeAllRanges();

        selection.addRange(range);

        el.setSelectionRange(0, 999999);

      }

      else {

        dummy.select();

      }

      document.execCommand("copy");

      document.body.removeChild(dummy);

      // Alert the copied text
      alert("Copied the text: " + ltcAddress);
    },

    refreshWalletBalance() {

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://cyto.azurewebsites.net/api/Wallet/get-wallet-balance',
        headers: {
          'wallet': this.walletName
        }
      };

      axios.request(config)
        .then((response) => {
          console.log('wallet balance: ', response.data);

          this.ltcBal = response.data.data;

        })
        .catch((error) => {
          alert(error);
        });

    },

    async addressQrCodeBlob() {

      const message = this.ltcProtocolURL;
      let data = JSON.stringify({
        "message": message
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://cyto.azurewebsites.net/api/Utilities/GenerateQR',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data
      };

      await axios.request(config)
        .then((response) => {


          this.addressQrCodeBlobPPT = response.data.data;
          return response.data.data;
        })
        .catch((error) => {
          alert(error);
        });


      //return qrcode from request


    },



    async loadWallet() {
      let data = JSON.stringify({
        "filename": this.walletName
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://cyto.azurewebsites.net/api/Wallet/load-wallet',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data
      };

      return await axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

    },

    shareContent() {

      const titleContent = `My public address to receive LTC ${this.address}`;
      const textContent = `pay me via cyto wallet: https://www.cyto.com/sendaddress=${this.address}`;
      const addressBlob = this.addressQrCodeBlobPPT;

      if (navigator.share) {
        navigator.share({
          title: titleContent,
          text: textContent,
          url: addressBlob
        })
          .then(() => {
            console.log('Shared successfully');
          })
          .catch((error) => {
            console.log('Error sharing:', error);
          });
      } else {
        console.log('Web Share API not supported');
      }
    },
    async getAddress() {
      let data = JSON.stringify({
        "label": "sample address",
        "addressType": "0"
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://cyto.azurewebsites.net/api/Address/createAddress',
        headers: {
          'wallet': this.walletName,
          'Content-Type': 'application/json',
        },
        data: data
      };

      await axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));

          this.address = response.data.data.address;


          console.log('address before: ', response.data.data.address);

          localStorage.setItem('OWA', response.data.data.address);
        })
        .catch((error) => {
          console.log(error);
        });


    },

    async getOfficialAddress() {


      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://cyto.azurewebsites.net/api/Wallet/get-official-address',
        headers: {
          'wallet': this.walletName
        }
      };

      await axios.request(config)
        .then((response) => {

          this.address = response.data.data;



          localStorage.setItem('OWA', response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });

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


    initFn() {





      //decode the wallet cipher texts 
      let wallet = localStorage.getItem('wallet');


      var deserializedObject = JSON.parse(wallet);

      //log wallet

      if (wallet == null || wallet == '') {
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

      this.getWalletBalance()
        .then((res) => {

          if (res.successful != true) {

            throw res.message;
          }
          else {
            this.ltcBal = res.data;

          }
        })
        .catch((err) => {

          if (err == "Requested wallet does not exist or is not loaded") {
            //run the load wallet function

            this.loadWallet()
              .then(function (res) {

                if (res.successful == false) {
                  throw res.message;
                }

              })
              .catch(function (err) {

                if (err == "Wallet file verification failed: Error loading wallet megawallet_sad_84. Duplicate -wallet filename specified.") {
                  alert("all ood you are now in");
                }


              });

            //then run the et wallet details one more time
          }


        });

      //  this.getAddress();

      this.getOfficialAddress();
      this.addressQrCodeBlob();

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