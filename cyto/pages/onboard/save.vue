<template>
    <div class="container w-full">

        <div class="col-1">
            <div class="flex justify-center p-10">
                <div class="card w-96 bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="/images/logo1.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title"> save wallet seed!</h2>
                        <p> we recommend you write this somewhere safe</p>
                        <div class="card-actions flex justify-center">

                            <b class="text-primary">
                                {{ menmonics }}
                            </b>


                        </div>
                        <div class="p-2">
                            <button class="btn btn-wide btn-primary" :class="loading" @click.prevent="next()">proceed
                            </button>

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
                    <li class="step"></li>
                </ul>


            </div>
        </div>





    </div>
</template>
<script>
export default {
    data() {

        return {
            menmonics: ''
        }
    },
    setup() {
        const decryptMessage = useNuxtApp().$decryptMessage;

        return {
            decryptMessage
        }

    },
    methods: {
        next() {

            //delete the mnemonics 
            localStorage.removeItem('encryptedMnemonics');

            //redirect to next level
            this.$router.push('verify');

        }
    },

    mounted() {
        //get the cipher text of the wallet 

        const encryptedMnemonics = localStorage.getItem('encryptedMnemonics');
        const mnemonicsToDisplay = this.decryptMessage(encryptedMnemonics);
        this.menmonics = mnemonicsToDisplay;
        console.log('menmonics', mnemonicsToDisplay);

        //if  this is empty redirect to create



        //now we have to decrypt this so we can display this

    }

}
</script>

