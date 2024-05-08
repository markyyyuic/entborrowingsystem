<template>
    
  <div class="confirmation-container">
    <div class="confirmation-box">
      <h1>Confirmation</h1>
      <div class="form">
        <div class="form-group">
          <h2>Selected Items:</h2>
          <ul>
            <li v-for="item in selectedItems" :key="item.item_id">
              {{ item.item_name }} - Quantity: {{ item.quantity }} - Status: {{ item.status }}
            </li>
          </ul>
        </div>
        <div class="form-group">
          <h2>User Information:</h2>
          <!-- Display user information here (from about.vue) -->
        </div>
        <button class="submit-button" @click="submitRequest">Submit Request</button>
      </div>
    </div>
  </div>
</template>

<script>
  import sidebar from './sidebar.vue';
  import axios from 'axios';

export default {
  data() {
    return {
      selectedItems: [] // Populate this array with selected items from itemselection.vue
    };
  },
  methods: {
    submitRequest() {
      // Implement logic to submit request to server
    }
  }
};
</script>

<style scoped>
.confirmation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.confirmation-box {
  width: 50%;
  background-color: #f6a6bd;
  border-radius: 10px;
  padding: 20px;
}

.confirmation-box h1 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4ac656;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #3fa445;
}
</style>
