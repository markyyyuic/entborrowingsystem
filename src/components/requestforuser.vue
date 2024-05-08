<template>
   <sidebar />
   <div class="background">
 
  <div class="request-approval">
    <h1>Request Approval</h1>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Item</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests" :key="request.request_id">
            <td>{{ request.name }}</td>
            <td>{{ request.date }}</td>
            <td>{{ request.item_name }}</td>
            <td>{{ request.status }}</td>
            <td>
              <button class="approve-button" @click="approveRequest(request.request_id)">Approve</button>
              <button class="decline-button" @click="declineRequest(request.request_id)">Decline</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
</div>


</template>



<script>
import sidebar from './sidebar.vue';
import axios from 'axios';

export default {
  components: {
    sidebar
  },
  data() {
    return {
      requests: [] // Populate this array with requests fetched from the server
    };
  },
  methods: {
    async fetchRequests() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/request/requests');
        console.log('Fetched requests:', response.data); 
        this.requests = response.data;
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    },
    async approveRequest(request_id) {
  try {
  
    // Send a request to the backend to approve the selected request
    await axios.post(`http://127.0.0.1:8000/history/history/approve_requests/${request_id}`);

    // Remove the approved request from the UI table
    this.requests = this.requests.filter(req => req.request_id !== request_id);
  } catch (error) {
    console.error('Error approving request:', error);
  }
},
async declineRequest(request_id) {
  try {
    // Send a request to the backend to decline the selected request
    await axios.post(`http://127.0.0.1:8000/history/history/decline_requests/${request_id}`);

    // Remove the declined request from the UI table
    this.requests = this.requests.filter(req => req.request_id !== request_id);
  } catch (error) {
    console.error('Error declining request:', error);
  }
}
  },
  mounted() {
    this.fetchRequests(); // Fetch requests when component is mounted
  }
};
</script>



<style scoped>

.background {
  position: fixed;
  background: linear-gradient(#efbfcd, #E81652);
  top: 15%;
  left: 25%;
  width: 70%;
  height: 80%;
  z-index: -1; /* Ensure the background is behind other content */
  border-radius: 25px;
}


.request-approval {
  text-align: center;
  position: relative; /* Ensure content stays above the background */
  z-index: 1; /* Ensure content is above the background */
}

.request-approval h1 {
  font-size: 26px;
  position: fixed;
  top: 8%;
  left: 25%;
}

.table-container {
  position: fixed;
  margin-left: 2.5%;
  margin-top: 5%;
  width: 65%; /* Adjusted width */
  border: 3px solid #e4007f; /* Fuchsia pink border */
  border-radius: 10px;
  /* Enable horizontal scrolling */
  max-height: 60%; 
  overflow-x: auto; 
  z-index: 1;
  font-family: 'Roboto', sans-serif;
 
 

  

}

table {
  width: 100%;
  border-collapse: collapse;

}

th, td {
  border: 1px solid #e4007f; /* Fuchsia pink border */
  padding: 8px;
  text-align: center;
  background-color: white;
  
}

th {
  background-color: #f2f2f2;
  font-weight: bold; /* Bold header text */
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.approve-button {
  background-color: #6ACC62; /* Green for approve */
  color: #fff;
}

.decline-button {
  background-color: #ff0000; /* Red for decline */
  color: #fff;
}

button:hover {
  filter: brightness(90%); /* Reduce brightness on hover */
}
</style>
