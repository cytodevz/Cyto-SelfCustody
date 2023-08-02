<template>
    <div>
      <h1>Scan QR Code</h1>
      <qr-scanner/>
    </div>
  </template>
  
  <script>
import QrScanner from '~~/components/QrScanner.vue';
  
  export default {
    components: {
        QrScanner,
    },
  };
  </script>
  