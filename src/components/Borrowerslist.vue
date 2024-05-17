<template>
  <div class="content-container-borrow">
    <sidebar />
    <h1>Dashboard</h1>
    <h2>Equipment Tracker:</h2>
    
    <div class="backdrop4">
      <div class="table-container2">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>ITEMS</th>
              <th>Quantity</th>
              <th>DATE</th>
              <th>RETURN DATE</th>
              <th>REMARKS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in borrowedItems" :key="item.borrow_id">
              <td>{{ item.borrow_id }}</td>
              <td>{{ item.borrowers_name }}</td>
              <td>{{ item.item_name }}</td>
              <td>{{ item.quantity_borrowed }}</td>
              <td>{{ item.borrow_date }}</td>
              <td>{{ item.return_date }}</td>
              <td>{{ item.remarks }}</td>
              <td>
                <button class="return-button return-button-green" @click="setAction(item, 'Returned')" :class="{ 'green-bg': item.remarks === 'Returned' }">Returned</button>
                <button class="return-button return-button-orange" @click="setAction(item, 'Partially Returned')" :class="{ 'yelloworange-bg': item.remarks !== 'Returned' }">Partially Returned</button>
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
      borrowedItems: []
    };
  },
  mounted() {
    this.fetchBorrowedItems();
  },
  methods: {
    async fetchBorrowedItems() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/borrowed_list');
        this.borrowedItems = response.data;
      } catch (error) {
        console.error('Error fetching borrowed items:', error);
      }
    },
    async setAction(item, action) {
  try {
    console.log('Action:', action);

    const payload = {
      return_date: null,
      status: null,
      remarks: action
    };

    // Set the return_date and status based on the action
    if (action === 'Returned' || action === 'Partially Returned') {
      payload.return_date = new Date().toISOString().split('T')[0];
    }

    console.log('Payload:', payload);

    if (action === 'Returned') {
      payload.status = 'Returned';
    } else if (action === 'Partially Returned') {
      payload.status = 'Partially Returned';
    } else {
      payload.status = 'Not Returned';
    }

    console.log('Payload after status update:', payload);

    // Send the update request to the backend
    const response = await axios.put(`http://127.0.0.1:8000/api/borrowed_items/return/${item.borrow_id}`, payload);
    
    console.log('Response:', response);

    // Update the item in the borrowedItems array with the response data
    const updatedItem = response.data;
    const index = this.borrowedItems.findIndex(i => i.borrow_id === item.borrow_id);
    if (index !== -1) {
      this.borrowedItems.splice(index, 1, updatedItem);
    }
  } catch (error) {
    console.error('Error updating action:', error);
  }
}

  }
};
</script>

<style scoped>
.content-container-borrow {
  /* Adjust styles if necessary */
}
.backdrop4 {
  background-color: #FF728F; /* Pink background color with opacity */
  width: 70%;
  height: 70%;
  position: fixed;
  top: 18%;
  left: 25%;
  z-index: 0;
  border-radius: 6px;
}
.table-container2 {
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
h1 {
  position: fixed;
  font-size: 30px;
  left: 25%;
  top: 8%;
}
h2 {
  position: fixed;
  font-size: 20px;
  left: 30%;
  top: 20%;
  font-family: 'Poppins', sans-serif;
  z-index: 1;
  color: black;
}
.return-button {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.return-button-green {
  background-color: green;
}
.return-button-orange {
  background-color: orange;
}
.green-bg {
  background-color: green !important;
}
.yelloworange-bg {
  background-color: orange !important;
}
</style>
