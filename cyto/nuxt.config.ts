// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
      '@nuxtjs/tailwindcss'
        ], 
    runtimeConfig: {
        apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
        public: {
          apiBase: 'https://cyto.azurewebsites.net'// can be overridden by NUXT_PUBLIC_API_BASE environment variable

        //  apiBase: 'https://localhost:7177', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
        }
      },
      devServer:{
        port:3137
      }
      
      
  

})
