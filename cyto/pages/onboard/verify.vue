<template>
    <div class="container w-full">

        <div class="col-1">
            <div class="flex justify-center p-10">
                <div class="card w-96 bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="/images/logo1.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title"> enter wallet seed!</h2>
                        <p>enter the wallet seed to proceed</p>
                        <div class="card-actions flex justify-center">
                            <div> <input v-model="userEntry"> </div>

                            <div>
                                <div class="form-control">
                                        <div class="input-group">
                                            <input required :type=" showPassword ? 'text' : 'password' "
                                                  placeholder="enter seed phrase"
                                                v-model="userEntry" class="input input-bordered" />
                                            <button class="btn btn-square"
                                                @click.prevent="toggleVisibility()">
                                                <!-- Eye icon for revealing/hiding password -->
                                                {{ toggleText }}
                                            </button>
                                        </div>
                                    </div>
                           
                            </div>

                            <b class="text-primary">
                                {{ concatenatedMenmonics }}
                            </b>

                          
                           

                        </div>

                        <div class="p-2">
                                    <button class="btn btn-wide btn-primary" :class="loading"
                                        @click.prevent="addEntry()">Verify
                                    </button>

                                </div>

                                <!-- <div class="p-2">
                                    <NuxtLink class="btn btn-wide  btn-ghost" to="/">cancel </NuxtLink>

                                </div> -->

                                <!-- <alert-display :msg="msg" :errordisplay="error.errordisplay"
                                    :successdisplay="success.successDisplay" /> -->
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
                    <li class="step"></li>
                </ul>


            </div>
        </div>





    </div>
</template>
<script>
export default {
    data(){

        return {
            loading: '',
            concatenatedMenmonics: '',
            userEntry: '',
            showPassword : false,
            toggleText : 'show'         
          
            
        }
    },

    methods:{

        toggleVisibility() {
            //toggle
            this.showPassword = !this.showPassword;
            console.log('state: ', this.showPassword);

            //toggle text
            if (this.showPassword == true) {
                this.showPassword = 'hide';
            } else {
                this.showPassword = 'show';

            }
        },
        addEntry(entry){
            this.concatenatedMenmonics = this.concatenatedMenmonics  + ' ' + entry;

        }

    },
    setup(){
        const decryptMessage = useNuxtApp().$decryptMessage;

        return{
            decryptMessage
        }

    },

    mounted(){
        //get the cipher text of the wallet 
        
        const encryptedMnemonics =  localStorage.getItem('encryptedMnemonics');
        const mnemonicsToDisplay = this.decryptMessage(encryptedMnemonics);
        this.menmonics = mnemonicsToDisplay;
        console.log('menmonics', mnemonicsToDisplay);



        //now we have to decrypt this so we can display this

    }
    
}
</script>

