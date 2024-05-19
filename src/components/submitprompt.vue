<template>
  <div class="sub-prompt">
    <!-- Show the success message when not loading and not showing the "Please wait..." message -->
    <div v-if="!loading && !showPleaseWait" class="success-check">
      <!-- Display checkmark and success message -->
      <div class="checkmark"></div>
      <h1>Request Submitted Successfully</h1>
      <!-- Show the tracking ID if available -->
      <div v-if="trackingId" class="tracking-id">
        <p>Tracking ID:</p>
        <p>{{ trackingId }}</p>
      </div>
      <button @click="goToHomePage">Done</button>
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
    },
    trackingId: {
      type: Number,
      default: '' // Default value for tracking ID
    }
  },
  methods: {
    goToHomePage() {
      // Redirect user to home page
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.sub-prompt {
  position: fixed;
  height: 45%;
  width: 30%;
  background: #FFF;
  top: 25%;
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
  position: fixed;
  top: 30%; /* Adjust as needed */
  left: 40%;
}

.tracking-id {
  top: 40%;
  left: 40%;
  position: fixed;
  margin-top: 5px;
  background-color: #e45e84;
  width: 20%;
  border-radius: 10px;
}

.tracking-id p {
  font-size: 25px;
  font-weight: bold;
}

button {
  position: relative;
  top: 300px;
  color: #FFF;
  background: #34e454;
  font-family: 'Poppin', sans-serif;
  height: 40px;
  border: none;
  border-radius: 6px;
  width: 80px;
}
</style>
