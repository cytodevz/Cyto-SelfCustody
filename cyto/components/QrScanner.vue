<template>
    <div>
      <video ref="videoElement" autoplay></video>
      <qrcode-stream ref="qrcodeStream" @decode="handleDecode"></qrcode-stream>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.startQRCodeScanner();
    },
    methods: {
      startQRCodeScanner() {
        const video = this.$refs.videoElement;
        const qrcodeStream = this.$refs.qrcodeStream;
  
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then(function (stream) {
              video.srcObject = stream;
              qrcodeStream.start();
            })
            .catch(function (error) {
              console.error("Error accessing camera", error);
            });
        }
      },
      handleDecode(result) {
        // Handle the scanned QR code result here
        console.log("Scanned QR Code:", result);
      },
    },
  };
  </script>
  