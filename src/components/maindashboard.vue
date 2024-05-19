<template>
  <div class="content-container">
    <sidebar />
    <h1>Dashboard</h1>
    <h2>Recently Borrowed:</h2>
    
    <div class="backdrop">
      
      <a href="/request" class="indicator pending-request-indicator">
        <div class="text">Pending Request</div>
        <div class="count">{{ pendingRequestCount }}</div>
      </a>
      <a href="/borrowlist" class="indicator active-borrowed-indicator">
        <div class="text">Active Borrowed</div>
        <div class="count">{{ activeBorrowedCount }}</div>
      </a>
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
      requestTable: [],
      borrowedItems: []
    };
  },
  computed: {
    pendingRequestCount() {
      return this.requestTable.filter(request => request.status === 'pending').length;
    },
    activeBorrowedCount() {
      // Count items where return_date is null (active borrowed)
      return this.borrowedItems.filter(item => item.return_date === null).length;
    }
  },
  created() {
    this.fetchRequestData();
    this.fetchBorrowedData();
    setInterval(this.fetchRequestData, 5000);
    setInterval(this.fetchBorrowedData, 5000);
  },
  methods: {
    fetchRequestData() {
      axios.get('http://127.0.0.1:8000/request/requests')
        .then(response => {
          this.requestTable = response.data;
        })
        .catch(error => {
          console.error('Error fetching request data:', error);
        });
    },
    fetchBorrowedData() {
      axios.get('http://127.0.0.1:8000/api/borrowed_list')
        .then(response => {
          this.borrowedItems = response.data;
        })
        .catch(error => {
          console.error('Error fetching borrowed items data:', error);
        });
    }
  }
}
</script>


<style scoped>
.backdrop {
  background-color: #FF728F; 
  width: 70%;
  height: 70%;
  position: fixed;
  top: 18%;
  left: 25%;
  z-index: 0;
  border-radius: 6px;
}

h1 {
  position: fixed;
  font-size: 25px;
  left: 25%;
  top: 11%;
}

.indicator {
  position: fixed;
  background-color: white;
  border: 2px solid black;
  border-radius: 15px;
  padding: 20px;
  width: 200px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pending-request-indicator {
  top: 23%;
  left: 28%;
  text-decoration: none;
  color: black;
}

.active-borrowed-indicator {
  top: 23%;
  left: 45%;
  text-decoration: none;
  color: black;
}

.text {
  font-size: 20px;
}

.count {
  font-size: 36px;
  font-weight: bold;
}
</style>
