      <template>
      <sidebar />
      <h1>Manage Tools</h1>

      <!-- AKONG MAIN WRAPPER SA ITEM -->
      <div class="item-container">

        <!-- Container Sa Button -->
        <div class="buttons">
          <button class="add1" @click="toggleAddUI">Add Item</button>
          <button class="edit2" @click="toggleEditUI">Edit Item</button>
          <button class="del3" @click="toggleDeleteUI">Delete Item</button>
        </div>

        <!-- Container Sa Items -->
        <div class="item-list">
        <div class="items" v-for="(items, index) in equipments" :key="index">
          <h4>{{ items.item_name }}</h4>
          <img :src="items.imgSrc" alt="Item Image">
          <div class="status">
            <h2>Quantity: {{ items.quantity }}</h2>
            <h2 class="stats">Status: {{ items.status }}</h2>
          </div>
        </div>
      </div>

        <!-- Add UI -->
        <div class="add-container" :class="{ 'show': showAddUI}">
            <h6>Add Equipment</h6>
            <div class="form">
              <label for="item_name">Item Name:</label>
            <input type="text" name="item_names" id="item_name">

            <label for="quantity">Quantity:</label>
            <input type="text" name="quantity-adds" id="quantity">

            <label for="itemstatus">Status:</label> <!-- Corrected the for attribute -->
            <select name="itemstatus" id="itemstatus"> <!-- Added id attribute -->
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>

              
              <button class="cancel" @click="closeAdd">Cancel</button>
              <button class="add" @click="addItem">Add</button> <!-- Add click event to call addItem method -->
            </div>
          </div>


          <!-- Edit UI -->
<div class="edit-container" :class="{ 'show': showEditUI}">
    <h6>Edit Equipment</h6>
    <div class="form">
        <label for="edit_item_name">Item Name:</label>
        <input type="text" name="item_names" id="edit_item_name">

        <label for="edit_quantity">Quantity:</label>
        <input type="text" name="quantitys" id="edit_quantity">

        <label for="editItemStatus">Status:</label> <!-- Corrected the for attribute -->
        <select name="editItemStatus" id="editItemStatus"> <!-- Added id attribute -->
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
        </select>

        <label for="edit_item_id">Equipment ID:</label>
        <input type="text" name="item_ids" id="edit_item_id">

        <button class="cancel" @click="closeEdit">Cancel</button>
        <button class="edit" @click="editItem">Edit</button> <!-- Add click event to call editItem method -->
    </div>
</div>



<!-- Delete UI -->
<div class="delete-container" :class="{ 'show': showDeleteUI}">
  <h6>Delete Equipment</h6>
  <div class="form">
    <label for="delete_item_id">Equipment ID:</label>
    <input type="text" name="delete_item_id" id="delete_item_id">

    <button class="cancel" @click="closeDelete">Cancel</button>
    <button class="delete" @click="deleteItem">Delete</button>
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
      showAddUI: false,
      showEditUI: false,
      showDeleteUI: false, // Added showDeleteUI data property
      equipments: []
    };
  },
  methods: {
    toggleAddUI() {
      this.showAddUI = !this.showAddUI;
    },
    closeAdd() {
      this.showAddUI = false;
    },
    async addItem() {
      try {
        const formData = new FormData();
        formData.append('item_name', document.getElementById('item_name').value);
        formData.append('quantity', document.getElementById('quantity').value);
        formData.append('status', document.getElementById('itemstatus').value);

        const response = await axios.post('http://127.0.0.1:8000/adminpanel/admin/equipment/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.message === "Equipment added successfully by administrator") {
          this.fetchItemList();

          const newItem = {
            item_name: formData.get('item_name'),
            imgSrc: "/public/tools/adapter.png",
            quantity: formData.get('quantity'),
            status: formData.get('status')
          };
          this.equipments.unshift(newItem);
        } else {
          console.error('Error adding item:', response.data.message);
        }
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },
    async fetchItemList() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/equipments/equipment_list');
        this.equipments = response.data;
      } catch (error) {
        console.error('Error fetching item list:', error);
      }
    },
    toggleEditUI() {
      this.showEditUI = !this.showEditUI;
    },
    closeEdit() {
      this.showEditUI = false;
    },
    async editItem() {
      try {
        const item_id = document.getElementById('edit_item_id').value; // Retrieve item_id from input field
        const formData = new FormData();
        formData.append('item_name', document.getElementById('edit_item_name').value);
        formData.append('quantity', document.getElementById('edit_quantity').value);
        formData.append('status', document.getElementById('editItemStatus').value);

        const response = await axios.put(`http://127.0.0.1:8000/adminpanel/admin/equipment/edit/${item_id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.message === "Equipment edited successfully by administrator") {
          this.fetchItemList();
        } else {
          console.error('Error editing item:', response.data.message);
        }
      } catch (error) {
        console.error('Error editing item:', error);
      }
    },
    toggleDeleteUI() {
      this.showDeleteUI = !this.showDeleteUI;
    },
    closeDelete() {
      this.showDeleteUI = false;
    },
    async deleteItem() {
      try {
        const item_id = document.getElementById('delete_item_id').value; // Retrieve item_id from input field

        const response = await axios.delete(`http://127.0.0.1:8000/adminpanel/admin/equipment/delete/${item_id}`);

        if (response.data.message === "Equipment deleted successfully by administrator") {
          this.fetchItemList();
        } else {
          console.error('Error deleting item:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  },
  created() {
    this.fetchItemList();
  }
}
</script>






<style scoped>
      .item-container{
        position: fixed;
        background-color: none;
        left: 22%;
        width: 77%;
        height: 88%;
        top: 10%;
        border-top: 1px solid #EAB2BE;
        

      }

      .buttons {
        position: relative; /* Change from fixed to relative */
        margin: 0;
        padding: 0;
        margin-top: 2%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%; /* Adjust width to 100% */
      }

      .add1, .edit2, .del3 {
        margin-left: 10%; /* Adjust margins */
        margin-right: 10%; /* Adjust margins */
        width: 150px; /* Adjust button width */
        border-radius: 10px;
        background: #FF728F;
        color: #FFF;
        height: 42px;
        border: 1px solid #C5C5C5;
        box-shadow: 1px 2px  #C5C5C5;
      }

      button:hover{
        color: #FF728F;
        background: #FFF;
      }

      h1 {
        position: fixed;
        left: 23%;
        font-size: 26px;
        top: 6%;
        color: #8C0F3D;
      }


      /* STYLE ITEMS */

      .item-list {
        position: fixed;
        width: 70%;
        height: 70%;
        top: 25%;
        left: 25%;
        right: 5%; /* Adjusted to display on the right side */
        display: flex; /* Changed to flex to display items horizontally */
        flex-wrap: wrap; /* Allow items to wrap to the next line */
        justify-content: flex-start;
        overflow-y: auto;

      }

      .item-list .items{
        background-image: linear-gradient(#F6A6BD, #E81652);
        margin-left: 1%;
        height: 30%;
        width: 20%;
        border-radius: 20px;
        z-index: 1000;
      }

      .items h4 {
        top: 3%;
        position: relative;
        color: #FFF;
        text-align: center;
        font-family: 'DM Sans', sans-serif;
        font-weight: bold;
        text-decoration: underline 1px;

      }

      .status {
        position: relative;
        display: flex;
        top: 15%;
        width: 100%;

      }

      .items h2 {
        color: #FFF;
        font-size: 15px ;
        margin-left: 2%;
        margin-right: 8%;
        font-family: 'DM Sans', sans-serif;
        font-weight: bold;

      }

      .items img {
        top: 2%;
        position: relative;
        width: 50%;
        left: 25%;
        height: 50%;
        border-radius: 20px;
      }


      /* ADD UI */

      .add-container {
        position: relative;
        width: 30%;
        height: 50%;
        background-image: linear-gradient(#F6A6BD, #E81652);
        left: 3%;
        display: grid;
        border-radius: 10px;
        opacity: 0; /* Initially hide the ADD UI */
        transition: opacity 0.5s ease; 
        z-index: 1000; /* Set a higher z-index value */
        top: 1%;
      }


      .add-container h6 {
        position: relative;
        font-size: 22px;
        margin-top: 6%;
        text-align: center;
        color: white;
      }

      .add-container .form {
        position: relative;
        display: inline-grid;
        grid-template-columns: 1fr 1fr; /* Split the container into two columns */
        gap: 10px;
        margin-top: 4%;
        right: 25%;
        top: -40%;
        
      }

      .add-container .form label {
        text-align: right; /* Align labels to the right */
        color: white;
        font-family: 'DM sans', sans-serif;

      }

      .add-container .form input,
      .add-container .form select {
        width: 100%; /* Make inputs and selects fill the available space */
        height: 80%;


      }

      .add-container .form .cancel{
        position: relative;
        height: 80%;
        width: 32%;
        left: 60%;
        top: 150%;
        color: white;
        background: #802032;
        border: none;
        border-radius: 6px;
        font-family: 'DM sans', sans-serif;
      }

      .add-container .form .add {
        position: relative;
        height: 80%;
        width: 25%;
        left: -12%;
        top: 150%;
        background: #4ac656;
        border: none;
        border-radius: 6px;
        color: #FFF;
        font-family: 'DM sans', sans-serif;
      }

      .add-container.show {
        opacity: 1; /* Show the ADD UI when the show class is added */
      }


      /* edit */

      
/* Existing styles */

/* Add UI styles */

/* Edit UI styles */
.edit-container {
    position: relative;
    width: 30%;
    height: 60%;
    background-image: linear-gradient(#F6A6BD, #E81652);
    left: 35%;
    display: grid;
    border-radius: 10px;
    opacity: 0; /* Initially hide the Edit UI */
    transition: opacity 0.5s ease; 
    z-index: 1000; /* Set a higher z-index value */
    bottom: 49%;
}

.edit-container h6 {
    position: relative;
    font-size: 22px;
    margin-top: 6%;
    text-align: center;
    color: white;
}

.edit-container .form {
    position: relative;
    display: inline-grid;
    grid-template-columns: 1fr 1fr; /* Split the container into two columns */
    gap: 10px;
    margin-top: 4%;
    right: 25%;
    top: -40%;
}

.edit-container .form label {
    text-align: right; /* Align labels to the right */
    color: white;
    font-family: 'DM sans', sans-serif;
   margin-right: -25%;
}

.edit-container .form input,
.edit-container .form select {
  margin-left: 25%;
  width: 100%; /* Make inputs and selects fill the available space */
    height: 80%;
}

.edit-container .form .cancel{
    position: relative;
    height: 80%;
    width: 32%;
    left: 60%;
    top: 150%;
    color: white;
    background: #802032;
    border: none;
    border-radius: 6px;
    font-family: 'DM sans', sans-serif;
}

.edit-container .form .edit {
    position: relative;
    height: 80%;
    width: 25%;
    left: -12%;
    top: 150%;
    background: #4ac656;
    border: none;
    border-radius: 6px;
    color: #FFF;
    font-family: 'DM sans', sans-serif;
}

.edit-container.show {
    opacity: 1; /* Show the Edit UI when the show class is added */
}


/* delete */
/* Style for delete UI */
/* Style for delete UI */
.delete-container {
    position: relative;
    width: 30%;
    height: 60%;
    background-image: linear-gradient(#F6A6BD, #E81652);
    left: 67%;
    display: grid;
    border-radius: 10px;
    opacity: 0; /* Initially hide the Delete UI */
    transition: opacity 0.5s ease; 
    z-index: 1000; /* Set a higher z-index value */
    top: -108%;
}

.delete-container h6 {
    position: relative;
    font-size: 22px;
    margin-top: 6%;
    text-align: center;
    color: white;
}

.delete-container .form {
    position: relative;
    display: inline-grid;
    grid-template-columns: 1fr 1fr; /* Split the container into two columns */
    gap: 10px;
    margin-top: 4%;
    right: 25%;
    top: -40%;
}

.delete-container .form label {
    text-align: right; /* Align labels to the right */
    color: white;
    font-family: 'DM sans', sans-serif;
    margin-top: 10%;
    margin-right: -25%;
}

.delete-container .form input {
  margin-left: 25%;
    width: 100%; /* Make inputs and selects fill the available space */
    height: 50%;
}

.delete-container .form .cancel{
    position: relative;
    height: 50%;
    width: 32%;
    left: 60%;
    top: 100%;
    color: white;
    background: #802032;
    border: none;
    border-radius: 6px;
    font-family: 'DM sans', sans-serif;
}

.delete-container .form .delete {
    position: relative;
    height: 50%;
    width: 30%;
    left: -12%;
    top: 100%;
    background: #4ac656;
    border: none;
    border-radius: 6px;
    color: #FFF;
    font-family: 'DM sans', sans-serif;
}

.delete-container.show {
    opacity: 1; /* Show the Delete UI when the show class is added */
}






      </style>