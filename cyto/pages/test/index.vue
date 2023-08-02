<template>
  <div>

<div>
    generated username: 
    <b>{{ generatedUserName }}</b>


</div>

<div>
    encrypted generated username: <br>
    <b>{{ encryptedgeneratedUserName }}</b>

 
</div>

<div>
    decrypted : <br>
    <b>{{ decryptedgeneratedUserName }}</b>
</div>

passphrase
<div>
    generated passphrase: 
    <b>{{ passPhrase }}</b>


</div>

<div>
    encrypted generated passphrase: <br>
    <b>{{ encryptedgeneratedpassPhrase }}</b>

 
</div>

<div>
    decrypted : <br>
    <b>{{ decryptedgeneratedpassPhrase }}</b>
</div>



encryted wallet
<div>
    generated wallet_serialised: 
    <b>{{ wallet_serialised }}</b>


</div>

<div>
    encrypted generated wallet_serialised: <br>
    <b>{{ encryptedWallet }}</b>

 
</div>

<div>
    decrypted : <br>
    <b>{{ decryptedgeneratedencryptedWallet }}</b>
</div>




  </div>
</template>

<script>
export default {
    setup(){

        const encryptMessage = useNuxtApp().$encryptMessage;
        const decryptMessage = useNuxtApp().$decryptMessage;
        const encryptMessageII = useNuxtApp().$encryptMessageWithCustomKey;
        const decryptMessageII = useNuxtApp().$decryptMessageWithCustomKey;
        const randomNumber = useNuxtApp().$randomNumber;
        const generateWords = useNuxtApp().$generatePassPhrase;

        const generateWord = generateWords(1);
        const generateNumber = randomNumber();



        const generatedUserName = generateWord + '_' + generateNumber;
        const encryptedgeneratedUserName = encryptMessage(generatedUserName);
        const decryptedgeneratedUserName = decryptMessage(encryptedgeneratedUserName);

        //passphrase

        const passPhrase = generateWords(12);
        const encryptedgeneratedpassPhrase = encryptMessage(passPhrase);
        const decryptedgeneratedpassPhrase = decryptMessage(encryptedgeneratedpassPhrase);

        const wallet = {
            id:encryptedgeneratedUserName,
            pass:encryptedgeneratedpassPhrase
        }

        const wallet_serialised = JSON.stringify(wallet);

        //encrypt wallet with user password
        const encryptedWallet = encryptMessageII(wallet_serialised,'P@$$w0rd123');
        const decryptedgeneratedencryptedWallet= decryptMessageII(encryptedWallet, 'P@$$w0rd123');






       


        return{
            generatedUserName,
            encryptedgeneratedUserName,
            decryptedgeneratedUserName,
            passPhrase,
            encryptedgeneratedpassPhrase,
            decryptedgeneratedpassPhrase,
            wallet_serialised,
            encryptedWallet,
            decryptedgeneratedencryptedWallet
           
        }
    }

}
</script>

<style>

</style>