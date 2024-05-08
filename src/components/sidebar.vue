<template>
  <!-- SIDE BAR SECTION -->
  <div class="side-bar">

<div class="logo-container">
  <img src="../assets/loginlogo.png" alt="">
</div>

<div class="nav-menus">
<div class="menus">
<i class='bx bxs-dashboard'></i><RouterLink to="/maindashboards">Dashboard</RouterLink>
</div>

<div class="menus">
<i class='bx bx-file'></i><RouterLink to="/requests">Request List</RouterLink>
</div>

<div class="menus">
<i class='bx bx-cog'></i><RouterLink to="/itemlist">Tool Settings</RouterLink>
</div>
</div>


</div>


<div class="log-out">
    <RouterLink to="/login">
    <button >Sign Out</button><i class='bx bx-log-in'></i>
    </RouterLink>
  </div>

</template>

<script>
</script>



<style scoped>

.side-bar {
  position: fixed;
  background-color: #FFF;
  height: 100%;
  width: 21%;
  border-right: 3px solid pink;
}

.logo-container {
  
  height: 20%;
  margin-top: 15%;
}

.logo-container img {
  position: fixed;
  width: 14%;
  left: 3%;
  
}

.nav-menus {
  position: fixed;
  margin-top: 8%;
  width: 20.9%;

}

.menus  {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    height: 80px;
   

}

.menus:active,
.menus:focus
.menus a:focus {
  border: 2px solid #FF6C8B;
  background-color: #FFCBD5;
  border-right: 5px solid #FF6C88;
  color: white; /* Adjust text color for better visibility */
}

.menus a {
    text-decoration: none;
    color: black; /* Adjust the color as needed */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%; /* Make sure the anchor takes full width */
    height: 100%; /* Make sure the anchor takes full height */
    font-size: 20px;
    font-weight: 200;
    font-family: 'Poppins', sans-serif;

  }

  .menus i {
    font-size: 2rem;
    background: #CCCCCC;
    height: 33px;
    width: 33px;
    border-radius: 7px;
  }


  /* Log out */

  .log-out {
  position: fixed;
  margin-top: 20px;
  left: 90%;
}

.log-out button {
  border: none;
  background: none;
  font-size: 15px;
  
}

.log-out i {
 font-size: 18px;
 background: #CCCCCC;
 border-radius: 2px;
 width: 20px;
 color: #33363F;
}


</style>