<template>
  <div class="content-container">
    <sidebar />
    <h1>Dashboard</h1>
    <h2>Recently Borrowed:</h2>
    
    <div class="backdrop">
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>DATE</th>
            <th>ITEMS</th>
          </tr>
        </thead>
        <tbody>
          
        
            <tr v-for="(item, index) in borrowedItems" :key="index">
              <td>{{ item.history_id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.item_name }}</td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
import sidebar from './sidebar.vue';
import axios from 'axios'; // Import Axios for making HTTP requests


export default {
  components: {
    sidebar
  },
  data() {
    return {
      borrowedItems: []
    };
  },
  mounted() {
    // Call the function to fetch history data when the component is mounted
    this.fetchHistoryData();
  },
  methods: {
          async fetchHistoryData() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/history/history');
          console.log('Fetched history data:', response.data); // Log the fetched data
          this.borrowedItems = response.data;
        } catch (error) {
          console.error('Error fetching history data:', error);
        }
      }

  }
};
</script>


<style scoped>

.backdrop {
 
  background-color: #FF728F; /* Pink background color with opacity */
  width: 70%;
  height: 70%;
  position: fixed;
  top: 18%;
  left: 25%;
  z-index: 0;
  border-radius: 6px;
}

.table-container {
  width: 60%;
  left: 30%;
  position: fixed;
  top: 25%;
  max-height: 55vh;
  overflow-y: auto; 
  
  
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  
}

th, td {
  border: 2px solid #070707;
  text-align: center;
  padding: 8px;
}

th {
  background-color: white;
  position: sticky; /* Make the header sticky */
  top: 0; /* Stick the header to the top */
  z-index: 1; /* Ensure the header stays above the content */
}

h1{
  position: fixed;
  font-size: 30px;
  left: 25%;
  top: 8%;
}

h2{
  position: fixed;
  font-size: 20px;
  left: 30%;
  top: 20%;
  font-family: 'Poppins', sans-serif;
  z-index: 1;
  color: black;
}
</style>
