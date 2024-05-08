<template>
  <div class="item-selections">
    <h1>SELECT AN ITEM</h1>
    <div class="item-list">
      <div class="item" v-for="item in items" :key="item.item_id">
        <h3>{{ item.item_name }}</h3>
        <p class="qty">Quantity: {{ item.quantity }}</p>
        <p :class="item.status.toLowerCase() === 'available' ? 'green-text' : 'red-text'">Status: {{ item.status }}</p>
        <img src="public\tools\crimping.png" alt="">
        <button :class="{ 'available': item.status.toLowerCase() === 'available', 'unavailable': item.status.toLowerCase() !== 'available' }" @click="item.status.toLowerCase() === 'available' ? showQuantityDialog(item) : showUnavailablePrompt()">Select</button>
        <!-- Quantity Dialog -->
        <div class="quantity-dialog" :class="{ 'show': showDialog && selectedTool === item }">
          <h2>How many {{ item.item_name }} do you want to borrow?</h2>
          <input type="number" v-model="quantity" min="1">
          <button @click.stop="saveSelectedItem">Save</button>
          <button @click.stop="closeDialog">Cancel</button>
        </div>
      </div>
    </div>
    <!-- Unavailable Prompt -->
    <div class="unavailable-prompt" :class="{ 'show': showUnavailable }">
      <p>Item is not available.</p>
      <button @click="closeUnavailablePrompt">OK</button>
    </div>

    <button class="nextButton" @click="showConfirmation">NEXT</button>
    <button class="backButton">BACK</button>

     <!-- Confirmation Component -->
     <Confirmation v-if="isConfirmationVisible" :selectedItems="selectedItems" />

      
  
  </div>

</template>

<script>
import Confirmation from './confirmation.vue';
import axios from 'axios';

export default {
  components: { 
    Confirmation,
  },
  data() {
    return {
      items: [],
      showDialog: false,
      selectedTool: null,
      quantity: 1,
      showUnavailable: false,
      isConfirmationVisible: false,// Define showConfirmation as a data property
      selectedItems: []
    };
  },
  methods: {
    async fetchItemList() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/equipments/equipment_list');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching item list:', error);
      }
    },
    showQuantityDialog(tool) {
      this.selectedTool = tool;
      this.showDialog = true;
    },
    saveSelectedItem() {
      console.log('Before saving:', this.$store.getters.getSelectedItems);

       const newItem = { item: this.selectedTool, quantity: this.quantity };
      this.$store.commit('addItemToSelectedItems', newItem);
      console.log('After saving:', this.$store.getters.getSelectedItems); // Add this line for debugging

      console.log('Selected Item:', this.selectedTool);
      console.log('Selected Quantity:', this.quantity);
      // Close the dialog after saving
      this.showDialog = false;
    },
    closeDialog() {
      // Close the dialog without saving
      this.showDialog = false;
    },
    showUnavailablePrompt() {
      // Show the prompt when the item is not available
      this.showUnavailable = true;
    },
    closeUnavailablePrompt() {
      // Close the prompt
      this.showUnavailable = false;
    },
    // Integrate the selectItem method here if needed
    selectItem(item) {
      this.selectedTool = item;
      this.showQuantityDialog(item);
    },
    showConfirmation() {
      // Set showConfirmation to true to display the Confirmation component
      this.isConfirmationVisible = true;
    }
  },
  mounted() {
    this.fetchItemList(); // Fetch item list when the component is mounted
  }
};
</script>

<style scoped>




.item-selections .nextButton {
 position: relative;
 background: #FF6C8B;
 top: 90%;
 height: 6%;
 left: 43%;
 color: white;
 font-family: 'Poppins', sans-serif;
 font-weight: bold;
}


.item-selections .backButton {
  position: relative;
 background: #FF6C8B;
 top: 90%;
 height: 6%;
 right: 43%;
 color: white;
 font-family: 'Poppins', sans-serif;
 font-weight: bold;
}


/* Unavailable Prompt */
.unavailable-prompt {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  opacity: 0; /* Start with opacity 0 */
  transition: opacity 0.3s ease-in; /* Add transition effect */
}

.unavailable-prompt.show {
  opacity: 1; /* Show the prompt with opacity 1 */
}

.unavailable-prompt p {
  margin: 0;
}

.unavailable-prompt button {
  margin-top: 10px;
  background-color: #e81652;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.available {
  background-color: #4ac656;
  color: #fff;
}

.unavailable {
  background-color: #e81652;
  color: #fff;
}

/*  */



.item {
  position: relative;
  display: inline-block; /* Ensure items are displayed in a row */
  margin: 10px; /* Adjust margin as needed */
}

.quantity-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  display: none;
  transition: opacity 0.3s ease-in;
}


.quantity-dialog h2 {
  font-size: 20px;
}

.quantity-dialog.show {
  display: block; 
  opacity: 1;
}


.green-text {
  color: rgb(46, 174, 46);
}

.red-text {
  color: red;
}

.item-selections {
  text-align: center;
  background-image: linear-gradient(#FF728F, #E81652);
  position: fixed;
  width: 100%;
  height: 100%;
}

.item-selections h1 {
  text-align: center;
  color: #8C0F3D;
  left: 40%;
  position: fixed;
  top: 2%;
  font-family: 'Poppins', sans-serif;
  font-weight: 200;
  
}


/* ITEM */

.item-list {
  top: 10%;
  position: fixed;
  display: flex;
  flex-wrap: wrap; /* Wrap items to the next line */
  border-radius: 25px;
  width: 100%;
  left: -1.8%;
  height: 79%; /* Fixed height for scrollable container */
  overflow-y: auto;
}

.item {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 20%;
  margin-right: 50px;
  height: 45%;
  box-shadow: 2px 2px 10px black;
  left: 5%;
  transition: width 0.2s, height 0.2s, transform 1s;
}

.item:hover {
  height: 4px;
  width: 21%;
  height: 46%;
}

.item img {
  width: 50%;
  height: 100px;
  display: grid;
  left: 25%;
  position: relative;
  background-color: grey;
}

.item h3 {
  margin-top: 0;
  color: #141313;
  font-size: 24px;
  font-weight: bold;
}

.item p {
  margin: 5px 0;
  font-size: 12px;
  font-weight: bold;
 
}

.item .qty {
  color: #E81652;
  font-size: 14px;
  font-weight: bold;
}

.item button {
  background-color: #4ac656;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button {
  margin-top: 5px;
  background-color: #ff728f;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #e81652;
}


</style>