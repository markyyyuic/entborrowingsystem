<template>
  <div class="background-login"></div>

  <h1>Open <br>Laboratory <br>Borrowing <br>System</h1>

  <div class="login-bar">
    <img src="../assets/loginlogo.png" alt="">
    <form @submit.prevent="attemptLogin">
      
      <div class="username">
        <i class='bx bxs-user-circle'></i>
        <input v-model="username" type="text" id="username" name="username" placeholder="enter username">
      </div>

      <div class="password">
        <i class='bx bx-lock-alt' ></i>
        <input v-model="password" type="password" id="password" name="password" placeholder="enter password">
      </div>
      
      <a href="">Forgot Password?</a>
      <button class="login" :disabled="loading">Login</button>

      

      <dialogprompt :show="showDialog" :message="dialogMessage" :loading="loading" />

    </form>
  </div>
</template>

<script>
import dialogprompt from './logindialog.vue';
import axios from 'axios';

export default {
  components: {
    dialogprompt
  },
  data() {
    return {
      username: '',
      password: '',
      showDialog: false,
      dialogMessage: '',
      loading: false
    };
  },
  methods: {
    attemptLogin() {
      this.loading = true; // Show loading spinner
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);

      axios.post('http://127.0.0.1:8000/adminpanel/administrator/login/', formData)
        .then(response => {
          if (response.data) {
            this.dialogMessage = 'Login successfully please wait';
            this.showDialog = true;
            setTimeout(() => {
              this.$router.push('/maindashboards');
              this.loading = false; // Hide loading spinner
            }, 2000); // Redirect after 2 seconds
          } else {
            this.dialogMessage = 'Invalid username or password';
            this.showDialog = true;
            setTimeout(() => {
              this.showDialog = false; // Close dialog after 2 seconds
            }, 2000);
            this.loading = false; // Hide loading spinner
          }
        })
        .catch(error => {
          console.error("Error:", error);
          if (error.response && error.response.status === 401) {
            this.dialogMessage = 'Invalid username or password';
          } else {
            this.dialogMessage = 'An error occurred during login';
          }
          this.showDialog = true;
          setTimeout(() => {
            this.showDialog = false; // Close dialog after 2 seconds
          }, 2000);
          this.loading = false; // Hide loading spinner
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

.background-login {
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  transform: scaleX(-1);
  background-image: linear-gradient(to left, rgba(232, 22, 82, .8) 5%, rgba(255, 203, 213, 0.1) 75%), url('../assets/bg.jpg');
  background-size: cover;
  background-position: center;
  background-size: cover; 
}

.login-bar {
  width: 28%;
  height: 100vh;
  position: fixed;
  right: 0px;
  top: 0px;
  background-color: #FFF;
  box-shadow: 3px 5px  rgba(0, 0, 0, 0, 0.1);
}

h1 {
  position: fixed;
  bottom: 30%;
  font-size: 80px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  left: 5%;
  color: #FFF;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #E81652;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.login-bar form {
  padding: 5px 30px 20px 30px;
}

.username, .password {
  width: 75%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-bottom: 1px solid;
  margin-left: 15%;
  margin-top: 4%;
}

.username input, .password input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}

.username i, .password i {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1px solid #acacac;
  color: #555;
}

.login-bar img {
  position: relative;
  left: 25%;
  margin-top: 15%;
  margin-bottom: 23%;
}

.login-bar a {
  position: fixed;
  margin-top: 4%;
  color: #E81652;
  font-size: 15px;
  margin-left: 2%;
  font-family: 'Roboto', sans-serif;
}

.login-bar .login {
  position: fixed;
  margin-top: 50px;
  width: 10%;
  height: 45px;
  background: #E81652;
  border: 1px;
  border-style: solid;
  outline: none;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  cursor: pointer;
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
  margin-left: 13%;
}

.login:hover {
  background: #FFF;
  color: black;
}
</style>
