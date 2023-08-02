<template>
  <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <!-- <div class="drawer-content flex flex-col items-center justify-center">
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
     
  
    
    </div> -->

    <div class="drawer-content">
      <div class="navbar bg-base-100">
        <div class="flex-1">

          <a class="btn btn-ghost normal-case text-xl"> <label for="my-drawer-2"
              class="btn btn-primary drawer-button lg:hidden"> <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg></label></a>
          <!-- <div class="form-control">
              <input type="text" placeholder="Search" class="input input-bordered" />
              
            </div> -->

          <div class="form-control">
            <div class="hidden md:input-group">
              <input type="text" placeholder="Search…" class="input input-bordered" />
              <button class="btn btn-square btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="flex-none gap-2">

          <div class="xs:hidden dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a class="justify-between">
                  Theme
                  <span class="badge">Light</span>
                </a>
              </li>
              <li>
                <a class="justify-between">
                  Node
                  <span class="badge">public</span>
                </a>
              </li>
              <li><a href="/" @click.prevent="reset()">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>




      <div class="container p-4">
        <slot />



      </div>




    </div>


    <div class="drawer-side ">
      <label for="my-drawer-2" class="drawer-overlay">LOGO</label>

      <ul class="menu p-4 w-40 bg-primary text-primary-content">
        <!-- <div class=" mx-4 w-10 rounded-full">
            LOGO
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div> -->

        <!-- Sidebar content here -->
        <li class="px-4 py-2">
          <a href="#" class="text-white hover:text-gray-300">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </a>
        </li>


        <li>
          <NuxtLink to="/">Dashboard</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/nfts">NFTs</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/tokens">Tokens</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/nfts">Notifications</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/nfts">Transactions</NuxtLink>
        </li>

        <li>
          <NuxtLink to="/nfts">Settings</NuxtLink>
        </li>





      </ul>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {

  methods: {
    async loadWalletMethod(wallet) {
      console.log('walletname2: ', wallet);

      let data = JSON.stringify({
        "filename": wallet
      });

      const url = 'https://cyto.azurewebsites.net/api/Wallet/load-wallet';

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.post(url, data, config);

      return res;

    },
    reset(){

      //remove wallet data 
      localStorage.clear('wallet');
      localStorage.clear('OWA');
      this.$router.push('/onboard');


    },

    async walletBootstrap() {
      let wallet = localStorage.getItem('wallet');
      let walletAddress = localStorage.getItem('OWA');

      console.log('address', walletAddress);
      console.log('address', walletAddress);


      if (wallet == 'null' || wallet == '' || wallet == null || wallet === null) {
        // this.$router.push('/onboard');
        // Get the current host domain URL
        var currentURL = window.location.protocol + "//" + window.location.host;

        // Redirect to another page using the current host domain URL
        window.location.href = currentURL + "/onboard";



      }

      if (walletAddress == 'null' || walletAddress == '' || walletAddress == null || walletAddress === null) {

        var deserializedObject = JSON.parse(wallet);

        const walletNameDecrypt = deserializedObject.wallet;


        const walletName = this.decryptMessage(walletNameDecrypt);

        console.log('walletname1: ', walletName);
        const res = await this.loadWalletMethod(walletName);
        console.log('response: ', res)

      }
    },



    initFn() {
      this.walletBootstrap();

    }
  },


  mounted() {

    this.walletBootstrap();
  },
  setup() {
    const decryptMessage = useNuxtApp().$decryptMessage;
    return {
      decryptMessage
    }
  }
}
</script>