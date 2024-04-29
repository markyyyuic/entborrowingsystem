<template>
<div class="background-container">
</div>
<div class="logo-container">
  <img src="../assets/logo2.png" class="logo" alt="">
</div>

<h1>Open Laboratory <br>Borrowing System</h1>

<RouterLink to="/login">
<button>ADMIN</button>
</RouterLink>

<div class="wrapper">
  <div class="link_wrapper">

    <router-link to="/about">Borrow Now!</router-link>
    <div class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
        
        <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
      </svg>
    </div>
  </div>
  
</div>


</template>


<script>
import { RouterLink } from 'vue-router';

</script>

<style scoped>


html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
  
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  transform: scaleX(-1);
  background-image: linear-gradient(to left, rgba(232, 22, 82, 1) 5%, rgba(255, 203, 213, 0.1) 75%), url('../assets/bg.jpg');
  background-size: cover;
  background-position: center;
  background-size: cover; 
  
}



/* LOGO */

.logo {
  width: 15%;
  margin: 3%;
  position: fixed;
  
}

h1 {
  color: white;
  font-weight: bolder;
  font-family: "Roboto", sans-serif;
  text-align: left;
  position: fixed;
  margin-top: 19%;
  margin-left: 3%;
  font-size: 70px;
  
}


button {
  border: 1px;
  border-radius: 6px;
  color: #E81652;
  position: fixed;
  top: 90%;
  left: 3%;
  width: 8%;
  height: 5%;
  font-size: 25px;
  text-align: center;
  padding: 0px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  
}



.wrapper{
  position: fixed;
  top: 50%;
  left: 85%;
  transform: translate(-50%, -50%);
}

.link_wrapper{
  position: relative;
}

a{
  display: block;
  width: 250px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  text-decoration: none;
  background: #E81652;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 3px solid #E81652;
  transition: all .35s;
}

.icon{
  width: 50px;
  height: 50px;
  border: 3px solid transparent;
  position: absolute;
  transform: rotate(45deg);
  right: 0;
  top: 0;
  z-index: -1;
  transition: all .35s;
}

.icon svg{
  width: 30px;
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  transform: rotate(-45deg);
  fill: #E81652;
  transition: all .35s;
}

a:hover{
  width: 200px;
  border: 3px solid #E81652;
  background: transparent;
  color: #E81652;
}

a:hover + .icon{
  border: 3px solid #E81652;
  right: -25%;
}



</style>