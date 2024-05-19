<template>
  <div class="pending-request-indicator">
    <div class="indicator" :class="{ 'active': pendingRequestCount > 0 }">{{ pendingRequestCount }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Sample data for demonstration
      requestTable: [
        { id: 1, status: 'pending' },
        { id: 2, status: 'approved' },
        { id: 3, status: 'pending' },
        { id: 4, status: 'rejected' },
        { id: 5, status: 'pending' }
        // Add more request objects as needed
      ]
    };
  },
  computed: {
    pendingRequestCount() {
      // Count the number of requests with status 'pending'
      return this.requestTable.filter(request => request.status === 'pending').length;
    }
  }
};
</script>

<style scoped>
.pending-request-indicator {
  position: relative;
}

.indicator {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: red; /* Default color for the indicator */
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.indicator.active {
  background-color: green; /* Change color when there are pending requests */
}
</style>
