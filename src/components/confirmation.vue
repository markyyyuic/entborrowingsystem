<template>
  <div class="confirmation-container">
    <!-- Show confirmation section if showPrompt is false -->
    <div v-if="!showPrompt" class="confirmation">
      <h1>Confirmation</h1>
      <h2>Name: {{ formData.user_name }}</h2>
      <div class="id-role">
        <span class="id">ID: {{ formData.user_id }}</span>
        <span class="role">Role: {{ formData.user_type }}</span>
      </div>
      <div class="item-details">
        <table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in selectedItems" :key="index">
              <td>{{ item.item.item_name }}</td>
              <td>{{ item.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Display tracking ID if available -->
      <div v-if="trackingId" class="tracking-id">
        <span>Tracking ID: {{ trackingId }}</span>
      </div class="button-container">
      <!-- Show submit button -->
      <button class="submit" @click="submitData">Submit</button>
    </div>
    <!-- Show submit prompt if showPrompt is true -->
    <submitprompt v-else :loading="isLoading" :trackingId="trackingId" />
  </div>
</template>


<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import submitprompt from './submitprompt.vue'; 

export default {
  components: {
    submitprompt
  },
  data() {
    return {
      showPrompt: false,
      isLoading: false,
      showConfirmation: true ,
      trackingId: '' 
    };
  },
  computed: {
    ...mapGetters(['getFormData', 'getSelectedItems']),
    formData() {
      return this.getFormData;
    },
    selectedItems() {
      return this.getSelectedItems.map(item => ({
        ...item,
        quantity: item.quantity 
      }));
    },
  },
  methods: {
    async submitData() {
  try {
    this.isLoading = true;

    const requestData = {
      user_id: parseInt(this.formData.user_id),
      user_name: this.formData.user_name,
      user_type: this.formData.user_type,
      year_section: this.formData.year_section || '',
      item_requests: this.selectedItems.map(item => ({
        item_id: parseInt(item.item.item_id),
        quantity: parseInt(item.quantity)
      }))
    };

    console.log('Request Data:', requestData);
    // Check if any required field is missing
    if (!requestData.user_id || !requestData.user_name || !requestData.user_type) {
      throw new Error('Missing required fields in the request');
    }

    const response = await axios.post('http://127.0.0.1:8000/api/equipment/request', requestData);
    console.log('Response:', response); 
    console.log('Request submitted successfully:', response.data);

    // Assuming the response contains the tracking ID
    const trackingId = response.data.tracking_id;

    this.showPrompt = true;
    this.trackingId = trackingId; // Set the tracking ID
    this.$store.dispatch('resetFormData');
    this.$store.dispatch('clearSelectedItems');
  } catch (error) {
    // Handle error
    console.error('Error submitting request:', error);
  } finally {
    this.isLoading = false;
  }
},

    resetFormData() {
      this.$store.dispatch('resetFormData');
    }
  }
};
</script>

<style scoped>

.submit-prompt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.confirmation-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-image: linear-gradient(#FFCBD5, #E81652);
  text-align: center;
}

.confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 55%;
  background: #fff;
  width: 30%;
  top: 22%;
  left: 35%;
  position: relative;
  border-radius: 16px;
  box-shadow: 1px 1px 6px rgb(93, 92, 92);
}

.confirmation h1 {
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
  font-family: 'Poppin', sans-serif;
  bottom: 18%;
  position: relative;
}

.confirmation h2 {
  color: #FF728F;
  font-family: 'Poppins', sans-serif;
  font-size: 17px;
  font-weight: bold;
  display: inline;
  margin-right: 42%;
  bottom: 22%;
  position: relative;
}

.confirmation .id-role span {
  display: inline;
  color: #FF728F;
  font-family: 'Poppins', sans-serif;
  font-size: 17px;
  font-weight: bold;
  margin-right: 100px;
  /* Add some spacing between h3 and h4 */
  margin-left: 10px;
}

.confirmation .id {
  position: relative;
  color: #FF728F;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: bold;
  bottom: 100px;
}

.confirmation .role {
  color: #FF728F;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: bold;
  bottom: 100px;
  position: relative;
}

.item-details {
  margin-top: 20px;
  height: 25%;
  bottom: 25%;
  position: relative;
  width: 92%;
  border-top: 2px solid #CCCCCC;
}

table {
  width: 100%;
  max-width: 600px;
  margin-top: 10px;
  border-collapse: collapse;
}

table,
th,
td {}

th,
td {
  padding: 10px;
}

th {
  margin-left: 50px;
  color: #CCCCCC;
  font-weight: bold;
}

td {
  font-weight: bold;
}

.submit {
  position: relative;
  top: 10%;
  color: #FFF;
  background: #FB4570;
  font-family: 'Poppin', sans-serif;
  height: 10%;
  border: none;
  border-radius: 6px;
  width: 25%;
  box-shadow: 1px 1px 6px rgb(93, 92, 92);
}

/* Adjusting styles for Name, ID, and Role */
.confirmation h2,
.confirmation .id-role span {
  visibility: visible; /* Ensure they are visible */
}

</style>
