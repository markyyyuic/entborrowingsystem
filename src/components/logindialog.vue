<template>
  <div v-if="show" class="dialog-overlay">
    <div class="dialog">
      <p>{{ message }}</p>
      <div v-if="loading" class="loading-spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent background */
  display: flex;
  justify-content: center; /* center horizontally */
  align-items: center; /* center vertically */
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: fit-content;
  max-width: 80%; /* Adjust as needed */
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #E81652;
  border-radius: 50%;
  width: 20px; /* Adjust size as needed */
  height: 20px; /* Adjust size as needed */
  animation: spin 1s linear infinite;
  margin: auto; /* Center the spinner */
  margin-top: 20px; /* Adjust margin as needed */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
