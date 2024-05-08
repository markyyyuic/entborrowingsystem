<template>
  <div class="confirmation-container">
    <div class="confirmation">
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
    </div>
    <button class="submit" @click="submitData">Submit</button>
    <SubmitPrompt v-if="showPrompt" :loading="isLoading" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import SubmitPrompt from './SubmitPrompt.vue'; 
export default {
  components: {
    SubmitPrompt
  },
  data() {
    return {
      showPrompt: false, // Controls the visibility of the submission prompt
      isLoading: false // Controls the visibility of the loading spinner in the submission prompt
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
        quantity: 1 // Default quantity, you can modify this as needed
      }));
    },
  },
  methods: {
    async submitData() {
      try {
        this.isLoading = true; // Show loading spinner
        // Your axios request code goes here
        const url = `http://127.0.0.1:8000/api/equipment/request?user_id=${this.formData.user_id}&item_id=${this.selectedItems[0].item.item_id}&user_type=${this.formData.user_type}&user_name=${this.formData.user_name}&quantity=${this.selectedItems[0].quantity}&year_section=${this.formData.year_section}`;
        const { data } = await axios.post(url, {});
        console.log(data);
        // Show the submission prompt
        this.showPrompt = true;
        // Redirect to the home page after 2000 milliseconds
        setTimeout(() => {
          this.$router.push('/'); // Replace '/' with your home page route
        }, 2000);
      } catch (error) {
        console.error('Error submitting equipment request:', error);
      } finally {
        this.isLoading = false; // Hide loading spinner
      }
    }
  }
};
</script>



<style scoped>
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
  bottom: 20%;
  position: relative;
}

.confirmation h2{
  color: #FF728F;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
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
  font-size: 15px;
  font-weight: bold;
  margin-right: 100px; /* Add some spacing between h3 and h4 */
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
  border-top: 2px  solid #CCCCCC;
  

}

table {
  width: 100%;
  max-width: 600px;
  margin-top: 10px ;
  border-collapse: collapse;
 
}

table, th, td {

}

th, td {
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

button {
  position: relative;
  top: 10%;
  color: #FFF;
  background: #FB4570;
  font-family: 'Poppin', sans-serif;
  height: 6%;
  border: none;
  border-radius: 6px;
  width: 8%;
  box-shadow: 1px 1px 6px rgb(93, 92, 92);
}
</style>
