<template>
  <div class="background-login"></div>

  <h1>Equipment and<br>Tools <br>Borrowing <br>System</h1>

  <div class="login-bar">
    <h2>Please Login</h2>
    <img src="../assets/loginlogo.png" alt="">
    <form @submit.prevent="attemptLogin">
      <div class="username">
        <i class='bx bxs-user-circle'></i>
        <input v-model="username" type="text" id="username" name="username" placeholder="username">
      </div>

      <div class="password">
        <i class='bx bx-lock-alt' ></i>
        <input v-model="password" type="password" id="password" name="password" placeholder="password">
      </div>
      
      <button class="login" :disabled="loading">Login</button>

      <!-- Dialog component for displaying messages -->
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
  this.loading = true; 

  const formData = new FormData();
  formData.append('username', this.username);
  formData.append('password', this.password);

  axios.post(
    'http://127.0.0.1:8000/adminpanel/administrator/login/',
    formData
  )
    .then(response => {
      if (response.status === 200) {
        const adminCredentials = response.data;
        console.log('Admin logged in:', adminCredentials);

        // Check if adminCredentials is not undefined
        if (adminCredentials) {
          // Store admin data in session storage
          sessionStorage.setItem('admin_id', adminCredentials.admin_id);
          sessionStorage.setItem('username', adminCredentials.username);

          // Set loggedInAdmin object in Vuex store
          this.$store.commit('setLoggedInAdmin', adminCredentials);

          this.dialogMessage = 'Login successful, redirecting...';
          this.showDialog = true;

          setTimeout(() => {
            this.$router.push('/maindashboards');
            this.loading = false;
          }, 2000);
        } else {
          this.dialogMessage = 'An error occurred during login';
          this.showDialog = true;
          setTimeout(() => {
            this.showDialog = false;
          }, 2000);
          this.loading = false;
        }
      } else {
        // Handle other response status codes if needed
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        this.dialogMessage = 'Invalid username or password';
      } else {
        this.dialogMessage = 'An error occurred during login';
      }
      this.showDialog = true;
      setTimeout(() => {
        this.showDialog = false;
      }, 2000);
      this.loading = false;
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
  left: 68%;
}

.login:hover {
  background: #FFF;
  color: black;
}

.login-bar h2{
  position: fixed;
  font-size: 23px;
  top: 45%;
  left: 82%;
  color: #555;
}



@media screen and (max-width: 1024px) {
  .login-bar {
    width: 40%;
  }

  h1 {
    font-size: 60px;
    bottom: 40%;
  }

  .username,
  .password {
    width: 80%;
    margin-left: 10%;
  }

  .login-bar img {
    left: 20%;
    margin-bottom: 18%;
  }

  .login-bar a {
    margin-top: 5%;
  }

  .login-bar .login {
    margin-top: 40px;
    width: 15%;
    margin-left: 8%;
  }
}

/* For small-sized devices */
@media screen and (max-width: 768px) {
  .login-bar {
    width: 60%;
  }

  h1 {
    font-size: 40px;
    bottom: 50%;
  }

  .username,
  .password {
    width: 85%;
    margin-left: 7.5%;
  }

  .login-bar img {
    left: 15%;
    margin-bottom: 13%;
  }

  .login-bar a {
    margin-top: 6%;
  }

  .login-bar .login {
    margin-top: 30px;
    width: 20%;
    margin-left: 5%;
  }
}

/* For extra small-sized devices */
@media screen and (max-width: 480px) {
  .login-bar {
    width: 80%;
  }

  h1 {
    font-size: 30px;
    bottom: 60%;
  }

  .username,
  .password {
    width: 90%;
    margin-left: 5%;
  }

  .login-bar img {
    left: 10%;
    margin-bottom: 10%;
  }

  .login-bar a {
    margin-top: 8%;
  }

  .login-bar .login {
    margin-top: 20px;
    width: 25%;
    margin-left: 2.5%;
  }
}
</style>
