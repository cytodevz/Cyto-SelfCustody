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
            <h2 class="card-title">import wallet!</h2>
            <p>Upload PIK here</p>
            <div class="card-actions flex justify-center">
              <form action="#" id="PassKeyFormId">
                <div class="p-2">

                  <!-- <input required type="password" minlength="15" maxlength="30" v-model="passphrase"
                                      placeholder="passphrase"
                                      class="input input-bordered input-primary w-full max-w-xs" /> -->

                  <div class="form-control">
                    <input type="file" ref="picfile"
                      class="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                  </div>
                </div>




                <div class="p-2">
                  <button class="btn btn-wide btn-primary" :class="loading" @click.prevent="importWallet()">Upload
                  </button>
                </div>

                <div class="p-2">
                                  <NuxtLink class="btn btn-wide  btn-secondary" to="/import/scan">Scan </NuxtLink>

                              </div>

                <alert-display :msg="msg" :errordisplay="error.errordisplay" :successdisplay="success.successDisplay" />




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
          <li class="step"></li>
        </ul>


      </div>
    </div>





  </div>
</template>

<script>
import axios from 'axios';
import QrScanner from 'qr-scanner';


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
      msg: '',
      imgBlob: '',
      walletData: ''
    }
  },
  methods: {

    scanPICFromFile() {

      const file = this.$refs.picfile.files[0];
      let aResponse = {
            successful: false,
            message: 'no entry found',
            data: null
          }





      if (!file) {
       
        this.displayErrorMessage(aResponse.message);

        return aResponse;
      }

      QrScanner.scanImage(file, { returnDetailedScanResult: true })
        .then(result => {
         

          //play around
          console.log('actual PIC: ', result.data);
          aResponse.data = result.data
          aResponse.message = 'successfully retrieved data';
          aResponse.successful = true;
             this.walletData = result.data;
          // this.verifyPIC();
          console.log('aresponse: ', aResponse);

          //store this as walletdata to de decrypted in passkey page
          localStorage.setItem('walletData',result.data);



          this.$router.push('/import/passkey');

          

        })
        .catch(e => {

         
          aResponse.message = 'No QR code found';
          aResponse.successful = false;

          console.log('aresponse: ', aResponse);
          this.displayErrorMessage(aResponse.message);


        });


       



    },

    showLoading() {
      this.loading = 'loading';

    },
    hideLoading() {
      this.loading = '';
    },

    validation() {
      const objRes = {
        isValid: false,
        message: ''
      }

      try {

        if (this.walletData == "") {
          throw ("picData is Required!");
        }

        //if it ets this far t,hen it was valid
        objRes.isValid = true;
        objRes.message = "all looks good";

      } catch (err) {
        objRes.message = err;
        objRes.isValid = false;
      }

      //log the obj
      console.log('validationRes', objRes);

      //return the validation object
      return objRes;
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

    importWallet() {

      try {

        this.showLoading();

       this.scanPICFromFile();

     
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

    function generatePassPhrase() {
      const cipherText = encryptMessage(generatedPassPhrase);
      console.log('encrypted text: ', cipherText);


      return cipherText


    }





    return {
      generatePassPhrase,
      decryptCipherText,
      encryptMessageII,
      decryptMessage


    }


  }
}
</script>



