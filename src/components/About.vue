<template>
 <div class="background"></div>
<!-- <img src="../assets/logo2.png" class="logo" alt=""> -->

<div class="wrapper">
  <img src="../assets/logo2.png" class="form-logo" alt="">
        <form action="">
            
            <div class="input-box">
              <label for="userid" class="userid">User ID:</label>
                <input type="text" id="userid" name="userid" placeholder="Identification Number" required>
              </div>  

            <div class="input-box" style="margin-bottom: 39px">
              <label for="usernames" class="username">Name:</label>
                <input type="text" id="usernames" placeholder="Enter your Name" required> 
            </div>
            <label for="role-dp" class="roles">Role:</label>
            <div class="input-box">
        <select id="role-dp" required>
          <option value="" disabled selected>Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="personnel">Personnel</option>
        </select>
      </div>

      
      <div id="studentForm" style="display: none; top: 25%;">
        
    <div class="input-box" style="display: flex; align-items: center;">
        <input type="text" id="yearSection" placeholder="Enter Year and Section" style="flex: 10; width: 100%;" required>
    </div>
</div>

            
            <button type="submit" class="btn" >Submit</button>

        </form>


   
</div>
</template>



<style scoped>

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
}



/*.logo {
  
 

}*/






  .background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(232, 22, 82, 1) 10%, rgba(255, 203, 213, 1) 80%);
}


.wrapper {
    position: fixed;
    top: 15%;
    height: 70%;
    width:  30%;
    background: rgb(249, 249, 249);
    text-align: center;
    color: #fff;
    border-radius: 15px;
    padding: 30px 40px;
    z-index: 1;
    left: 35%;
}

.wrapper h1 {
    font-size: 36px;
    text-align: center;
    

}


.wrapper .input-box {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 35px 10px 10px 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    right: 2%;
}


.input-box input {
width: 100%;
height: 100%;
background: transparent;
border: none;
outline: none;
border: 2px solid rgba(251, 69, 112, 1);
border-radius: 10px;
font-size: 16px;
color: #010101;
padding: 15px;

}


.input-box input::placeholder{
    color: #686565;

}

.userid {
  color: #E81652;
  position: fixed;
  top: 20%;
  left: 38%;
  font-size: 16;
  font-family: 'Poppins', sans-serif;
  font-weight: 400
}

.username {
  color: #E81652;
  position: fixed;
  top: 31.8%;
  left: 38%;
  font-size: 16;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
}


.roles {
  color: #E81652;
  position: fixed;
  top: 44%;
  left: 38%;
  font-size: 16;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
}





.wrapper .btn {
    position: fixed;
    margin-top: 10px;
    width: 10%;
    height: 8%;
    background: #FB4570;
    border: 1px;
    border-style: solid;
    outline: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 16px;
    color: #333;
    font-weight: 600;
    top: 70%;
    left: 44.5%;
}

.btn:hover {
  background: #FFFF;
  
}

.form-logo {
  position: fixed;
  width: 40%;
  bottom: 100%;
  left: 30%;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}


.input-box select {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(251, 69, 112, 1);
  border-radius: 10px;
  font-size: 16px;
  color: #000000;
  padding: 15px;

 
}


  



.input-box select option {
  background-color: #fff; /* Adjust background color of options */
  color: #333; /* Adjust text color of options */
}



</style>


<script>
document.addEventListener('DOMContentLoaded', function () {
    // Your code here
    function showAdditionalForm() {
        var role = document.getElementById("role").value;
        var studentForm = document.getElementById("studentForm");

        if (role === "student") {
            studentForm.style.display = "block";
        } else {
            studentForm.style.display = "none";
        }
    }

    // Add event listener to call showAdditionalForm() when role dropdown changes
    document.getElementById("role").addEventListener("change", showAdditionalForm);
});

</script>