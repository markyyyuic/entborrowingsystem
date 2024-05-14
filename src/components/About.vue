<template>
  <transition name="fade">
    <div v-if="!showItemSelection" class="background"></div>
  </transition>
  <transition name="slide">
    <div class="wrapper" v-if="!showItemSelection">
      <img src="../assets/loginlogo.png" class="form-logo" alt="">
      <form @submit.prevent="next">
        <div class="input-box">
          <label for="userid" class="userid">User ID:</label>
          <input type="text" v-model="formData.user_id" id="userid" name="userid" placeholder="Identification Number" required>
        </div>  

        <div class="input-box">
          <label for="usernames" class="username">Name:</label>
          <input type="text" v-model="formData.user_name" id="usernames" placeholder="Enter your Name" required> 
        </div>
        
        <div class="input-box">
          <label for="role-dp" class="roles">Role:</label>
          <select id="role-dp" v-model="formData.user_type" required @change="showAdditionalForm">
            <option value="" disabled selected>Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="personnel">Personnel</option>
          </select>
        </div>

        <div id="studentForm" class="input-box" style="display: none;">
          <label for="yearSection" class="year-section">Year and Section:</label>
          <input type="text" v-model="formData.year_section" id="yearSection" placeholder="Enter Year and Section">
        </div>
        <button type="submit" class="btn">Next</button>
      </form>
    </div>
  </transition>
  <transition name="slide">
    <itemselection v-if="showItemSelection" :formData="formData" />
  </transition>
</template>

<script>
import itemselection from './itemselection.vue'; // Import ItemSelection component
import store from './store'; // Import Vuex store

export default {
  components: {
    itemselection // Register ItemSelection component
  },
  data() {
    return {
      formData: {
        user_id: '',
        user_name: '',
        user_type: '',
        year_section: ''
      },
      showItemSelection: false
    };
  },
  methods: {
    showAdditionalForm() {
      var role = document.getElementById("role-dp").value;
      var studentForm = document.getElementById("studentForm");

      if (role === "student") {
        studentForm.style.display = "block";
      } else {
        studentForm.style.display = "none";
      }
    },
    next() {
        // Dispatch action to update formData in the store
        this.$store.dispatch('updateFormData', this.formData)
          .then(() => {
            // Log the form data stored in the Vuex store
            console.log('Form Data stored in Vuex store:', this.$store.getters.getFormData);
            this.showItemSelection = true;
            // Optionally, you can perform any other actions here after the form data is updated
          })
          .catch(error => {
            console.error('Error updating form data:', error);
          });
      }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(242, 14, 74);
}

.wrapper {
  position: fixed;
  top: 15%;
  height: auto;
  width: 90%;
  max-width: 400px;
  background: rgb(249, 249, 249);
  text-align: center;
  color: #fff;
  border-radius: 15px;
  padding: 30px 20px;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
}

.wrapper h1 {
  font-size: 36px;
  text-align: center;
}

.wrapper .input-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 20px 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px;
}

.input-box label {
  color: #E81652;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
}

.input-box input, .input-box select {
  width: 100%;
  height: 40px;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(251, 69, 112, 1);
  border-radius: 10px;
  font-size: 16px;
  color: #010101;
  padding: 10px;
  margin-top: 5px;
}

.input-box input::placeholder {
  color: #686565;
}

.wrapper .btn {
  width: 100%;
  height: 40px;
  background: #FB4570;
  border: none;
  outline: none;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
  margin-top: 20px;
}

.btn:hover {
  background: #514949;
}

.form-logo {
  width: 80px;
  margin-bottom: 20px;
}

.input-box select option {
  background-color: #fff; /* Adjust background color of options */
  color: #333; /* Adjust text color of options */
}

#studentForm {
  display: none;
}

@media (min-width: 600px) {
  .wrapper {
    max-width: 500px;
    top: 50px;
  }
  .form-logo {
    width: 60px;
  }
}

@media (min-width: 768px) {
  .wrapper {
    max-width: 600px;
  }
  .form-logo {
    width: 60px;
  }
}

@media (min-width: 1024px) {
  .wrapper {
    max-width: 30%;
  }
  .form-logo {
    width: 60px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  transform: translateY(100%);
}
</style>
