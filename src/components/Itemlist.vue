  <template>
    <div>
  
        <PrimeVueToast ref="toast" />
      <sidebar />
      <h1>Manage Tools</h1>

      <!-- Main Item Wrapper -->
      <div class="item-container">
        <!-- Container for Buttons -->
        <div class="buttons">
          <button class="add1" @click="toggleAddUI">Add Item</button>
          <button class="edit2" @click="toggleEditUI">Edit Item</button>
          <button class="del3" @click="toggleDeleteUI">Delete Item</button>
        </div>

        <!-- Container for Items -->
        <div class="item-list">
          <div class="items" v-for="(item, index) in equipments" :key="index">
            <img :src="'data:image/jpeg;base64,' + item.image" alt="Equipment Image" />
            <h4>{{ item.item_name }}</h4>
           
            <div class="status" >
              <h2 >Quantity: {{ item.quantity }}</h2>
              <h2 :class="getStatusClass(item.status)">Status: {{ item.status }}</h2>
            </div>
          </div>
        </div>

        <!-- Add UI -->
        <div class="add-container" :class="{ 'show': showAddUI}">
          <h6>Add Equipment</h6>
          <div class="form">
            <label for="item_name">Item Name:</label>
            <input type="text" name="item_name" id="item_name">

            <label for="quantity">Quantity:</label>
            <input type="text" name="quantity" id="quantity">

            <label for="itemstatus">Status:</label>
            <select name="itemstatus" id="itemstatus">
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>

            <label for="image">Add Image:</label>
            <input type="file" id="image" name="image" accept="image/*">

            <button class="cancel" @click="closeAdd">Cancel</button>
            <button class="add" @click="addItem">Add</button>
          </div>
        </div>

  <!-- Edit UI -->
  <div class="edit-container" :class="{ 'show': showEditUI}">
    <h6>Edit Equipment</h6>
    <div class="form">
        <label for="edit_item_name">Item Name:</label>
        <select name="edit_item_name" id="edit_item_name">
            <option v-for="item in equipments" :value="item.item_name">{{ item.item_name }}</option>
        </select>

        <label for="edit_quantity">Quantity:</label>
        <input type="text" name="edit_quantity" id="edit_quantity">

        <label for="editItemStatus">Status:</label>
        <select name="editItemStatus" id="editItemStatus">
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
        </select>

        <label for="edit_image">Update Image:</label>
        <input type="file" id="edit_image" name="edit_image" accept="image/*">

        <button class="cancel" @click="closeEdit">Cancel</button>
        <button class="edit" @click="editItem">Edit</button>
    </div>
</div>



      <div class="delete-container" :class="{ 'show': showDeleteUI}">
      <h6>Delete Equipment</h6>
      <div class="form">
        <label for="delete_item_name">Select Item:</label>
        <select v-model="selectedItemToDelete" id="delete_item_id" class="selection">
          <option v-for="item in equipments" :value="item.item_id">{{ item.item_name }}</option>
        </select>

        <button class="cancel" @click="closeDelete">Cancel</button>
        <button class="delete" @click="deleteItem">Delete</button>
      </div>
    </div>

      </div>
    </div>
  </template>

  <script>
  import sidebar from './sidebar.vue';
  import axios from 'axios';
  import PrimeVueToast from 'primevue/toast';
  import ConfirmDialog from 'primevue/confirmdialog';

  export default {
    components: {
      sidebar,
      PrimeVueToast,
    
    },
    data() {
      return {
        showAddUI: false,
        showEditUI: false,
        showDeleteUI: false,
        equipments: [],
        selectedItemToDelete: null
      };
    },
    methods: {
      getStatusClass(status) {
    return status.toLowerCase() === 'available' || status.toUpperCase() === 'AVAILABLE' ? 'green-text' : 'red-text';
},
      toggleAddUI() {
        this.showAddUI = !this.showAddUI;
      },
      closeAdd() {
        this.showAddUI = false;
      },
      async addItem() {
    try {
        const adminId = sessionStorage.getItem('admin_id');
        const username = sessionStorage.getItem('username');

        if (!adminId || !username) {
            console.error('Admin ID or Username not found in session storage');
            this.$toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Admin ID or Username not found.',
                life: 3000
            });
            return;
        }

        const itemName = document.getElementById('item_name').value;
        const quantity = document.getElementById('quantity').value;
        const status = document.getElementById('itemstatus').value;
        const image = document.getElementById('image').files[0]; // Get the first selected file

        if (!itemName || !quantity || !status || !image) {
            console.error('Missing form fields');
            this.$toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill in all required fields.',
                life: 3000
            });
            return;
        }

        const formData = new FormData();
        formData.append('item_name', itemName);
        formData.append('quantity', quantity);
        formData.append('status', status);
        formData.append('admin_id', adminId);
        formData.append('username', username);
        formData.append('image', image); // Append the image file to the form data

        const response = await axios.post('http://127.0.0.1:8000/adminpanel/admin/equipment/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: {
                username: username
            }
        });

        if (response.data.message === "Item Already Exist") {
            this.$toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'This item already exists.',
                life: 3000
            });
        } else {
            this.$toast.add({
                severity: 'success',
                summary: 'Successfully Added',
                detail: `New Item Added: ${itemName} : ${quantity}`,
                life: 3000
            });
            this.fetchItemList();
            this.closeAdd();
        }
    } catch (error) {
        console.error('Error adding item:', error);
        // Log the full error response for debugging
        if (error.response) {
            console.error('Error response:', error.response.data);
        }
        this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response?.data?.detail || 'Error Adding Item.',
            life: 3000
        });
        this.closeAdd();
    }
},
async editItem() {
  try {
    const itemName = document.getElementById('edit_item_name').value;
    const selectedItemIndex = this.equipments.findIndex(item => item.item_name === itemName);
    
    if (selectedItemIndex === -1) {
      console.error('Selected item not found');
      return;
    }
    
    const itemId = this.equipments[selectedItemIndex].item_id;
    
    const formData = new FormData();
    formData.append('item_name', itemName);
    formData.append('quantity', document.getElementById('edit_quantity').value);
    formData.append('status', document.getElementById('editItemStatus').value);
    const imageInput = document.getElementById('edit_image');
    if (imageInput.files.length > 0) {
      formData.append('image', imageInput.files[0]);
    }
    
    const username = sessionStorage.getItem('username');
    const adminId = sessionStorage.getItem('admin_id');
    
    const response = await axios.put(`http://127.0.0.1:8000/adminpanel/admin/equipment/edit/${itemId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        admin_id: adminId,
        username: username
      }
    });

    if (response.data.message === "Equipment updated successfully by administrator") {
      const updatedItem = this.equipments[selectedItemIndex];
      updatedItem.quantity = formData.get('quantity');
      updatedItem.status = formData.get('status');

      this.$refs.toast.add({
        severity: 'success',
        summary: 'Successfully Updated',
        detail: `Updated Item ${updatedItem.item_name}: ${updatedItem.quantity} : ${updatedItem.status}`,
        life: 3000
      });
  
      this.fetchItemList();
      this.closeEdit();
    } else {
      console.error('Error editing item:', response.data.message);
      this.$refs.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error updating item`,
        life: 3000
      });
    }
  } catch (error) {
    console.error('Error editing item:', error);
    this.$refs.toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `Error updating item`,
      life: 3000
    });
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
      toggleDeleteUI() {
        this.showDeleteUI = !this.showDeleteUI;
      },
      closeDelete() {
        this.showDeleteUI = false;
      },
      async deleteItem() {
      try {
        const itemId = this.selectedItemToDelete;
        const username = sessionStorage.getItem('username');

        const response = await axios.delete(`http://127.0.0.1:8000/adminpanel/admin/equipment/delete/${itemId}`, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            username: username
          }
        });
        

        if (response.data.message === "Equipment deleted successfully by administrator") {

          this.$refs.toast.add({
          severity: 'success',
          summary: 'Success',
          detail: `Item deleted`, // Updated toast message
          life: 3000
      });
          this.fetchItemList();
          this.closeDelete();
        } else {
          console.error('Error deleting item:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    },

    fetchItemList() {
      try {
        axios.get('http://127.0.0.1:8000/api/equipments/equipment_list')
          .then(response => {
            this.equipments = response.data;
          })
          .catch(error => {
            console.error('Error fetching item list:', error);
          });
      } catch (error) {
        console.error('Error fetching item list:', error);
      }
    },

    },
    created() {
      this.fetchItemList();
    }
  }
  </script>





  <style scoped>


.selection{
  height: 50%;
  width: 100%;
  left: 25%;
  position: relative;
}
.green-text {
  color: green;
}

.red-text {
  color: red;
}

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

  .items {
  background: #EAB2BE;
  margin-left: 1%;
  height: 35%;
  width: 20%;
  border-radius: 20px;
  z-index: 1000;
  margin-bottom: 20px; /* Add margin to the bottom to create space between each item */
}


        .item-list {
          position: fixed;
          width: 70%;
          height: 75%;
          top: 25%;
          
          left: 25%;
          right: 5%; /* Adjusted to display on the right side */
          display: flex; /* Changed to flex to display items horizontally */
          flex-wrap: wrap; /* Allow items to wrap to the next line */
          justify-content: flex-start;
          overflow-y: auto;

        }

        .item-list .items{
          background: #EAB2BE;
          margin-left: 1%;
          height: 40%;
          width: 20%;
          border-radius: 20px;
          z-index: 1000;
        }

        .items h4 {
          top: 20%;
          position: relative;
          color: #0c0c0c;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-weight: bold;
          text-decoration: underline 1px;

        }

   

        .status {
          position: relative;
          display: flex;
          top: 1%;
          width: 100%;

        }

        .items h2 {
          margin-top: 45px;
          font-size: 15px ;
          margin-left: 2%;
          margin-right: 8%;
          font-family: 'DM Sans', sans-serif;
          font-weight: 200;

        }

        .items img {
          top: 5%;
          position: relative;
          width: 50%;
          left: 25%;
          height: 50%;
          border-radius: 20px;
          background-color: rgb(193, 158, 158);
        }

    




        .status h2.available {
        color: green;
      }

      .status h2.not-available {
        color: red;
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
          opacity: 0;
        pointer-events: none;
          z-index: -1;
          
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
          opacity: 1;
          pointer-events: auto;
          z-index: 1000; 
        }


        /* edit */

        
  /* Existing styles */

  /* Add UI styles */

  /* Edit UI styles */
  .edit-container {
      position: relative;
      width: 30%;
      height: 49.5%;
      background-image: linear-gradient(#F6A6BD, #E81652);
      left: 35%;
      display: grid;
      border-radius: 10px;
      opacity: 0; /* Initially hide the Edit UI */
      transition: opacity 0.5s ease; 
      opacity: 0;
      pointer-events: none;
      z-index: -1;
      bottom: 49%;
  }

  .edit-container h6 {
      position: relative;
      font-size: 22px;
      margin-top: 2%;
      text-align: center;
      color: white;
  }

  .edit-container .form {
      position: relative;
      display: inline-grid;
      grid-template-columns: 1fr 1fr; /* Split the container into two columns */
      gap: 10px;
      margin-top: 4%;
      right: 22%;
      top: -25%;
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
      opacity: 1;
      pointer-events: auto;
      z-index: 1000; 
  }



  /* Style for delete UI */
  .delete-container {
      position: relative;
      width: 30%;
      height: 50%;
      background-image: linear-gradient(#F6A6BD, #E81652);
      left: 67%;
      display: grid;
      border-radius: 10px;
      opacity: 0; /* Initially hide the Delete UI */
      transition: opacity 0.5s ease; /* Set a higher z-index value */
      top: -100%;
      opacity: 0;
      pointer-events: none;
      z-index: -1;
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
      pointer-events: auto;
      z-index: 1000; 
  }






        </style>