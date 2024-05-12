<template>
    <div class="sub-prompt">
      <!-- Show the success message when not loading and not showing the "Please wait..." message -->
      <div v-if="!loading && !showPleaseWait" class="success-check">
        <!-- Display checkmark and success message -->
        <div class="checkmark"></div>
        <h1>Request Submitted Successfully</h1>
      </div>
      
      <!-- Show the "Please wait..." message when loading or after a brief delay -->
      <div v-if="loading || showPleaseWait" class="loading-spinner">
        <p>Please wait...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showPleaseWait: false
      };
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      loading(newVal) {
        if (newVal) {
          // When loading starts, show the "Please wait..." message after a brief delay
          setTimeout(() => {
            this.showPleaseWait = true;
          }, 1000); // Adjust delay as needed
          
          // Hide the "Please wait..." message after a short delay
          setTimeout(() => {
            this.showPleaseWait = false;
          }, 3000); // Adjust delay as needed
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .sub-prompt {
    position: fixed;
    height: 25%;
    width: 30%;
    background: rgb(213, 208, 208);
    top: 35%;
    left: 35%;
    text-align: center;
    border-radius: 6px;
  }
  
  .success-check {
    position: relative;
  }
  
  h1 {
    font-size: 26px;
    text-align: center;
    position: relative;
    top: 145px; /* Adjust as needed */
  }
  
  .checkmark {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid #ffffff;
    border-right: 3px solid #14f41b;
    animation: spin 1s ease infinite;
    position: absolute;
    top: 45%;
    left: calc(50% - 40px);
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-spinner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  
  .loading-spinner p {
    font-size: 26px; /* Adjust font size as needed */
    position: relative;
    top: 145px; /* Same position as h1 */
  }
  
  /* Other styles */
  </style>
  