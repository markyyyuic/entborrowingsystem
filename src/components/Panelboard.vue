<template>
  <div class="container">
    <h2>Dashboard</h2>
      <div class="date">
        <p>{{ formattedDate }}</p>
      </div>

      <div class="user-setting">
        <a href="" class="text-admin" @click="toggleDropDown"><i class='bx bxs-user-circle admin-icon'></i>Admin</a>
        <div class="user-dropdown"  v-show="dropdownVisible" @click="closeDropdown"> 
          <a href="" class="left-align" >Settings</a>
          <a href="" class="left-align"><RouterLink to="/login">Sign Out</RouterLink></a>

        </div>
      </div>
        <div class="nav-bar">
          <h1>ADMIN PANEL</h1>
          <img src="../assets/logoupdate.png" alt="">

          <div class="nav-menus">
            <router-link to="/maindashboards">
            <div class="items"><a href=""><i class='bx bxs-dashboard' ></i>DASHBOARD</a></div>
          </router-link>
            <div class="items">
              <a href="" @click="toggleSubMenu"><i class='bx bxl-deviantart' ></i>EQUIPMENTS<i class='bx bx-chevron-down dropdown' ></i></a>
              
          
              <div class="submenu" v-if="showSubMenu">
                <a href="" @click="toManageTools" class="sub-items"><i class='bx bxs-chevron-right '></i>Manage Tools</a>
                <a href="" @click="toBorrowlist" class="sub-items"><i class='bx bxs-chevron-right'></i>Available Items</a>
              </div>
            
            </div>
            <div class="items"><a href="" @click="toggleSubmenu2"><i class='bx bx-edit' ></i>RECORDS<i class='bx bx-chevron-down'></i></a>
              <div class="submenu2" v-if="showSubMenu2">
                <a href="" @click="toRequestList" class="sub-items2"><i class='bx bxs-chevron-right arrowdown'></i>Request List</a>
                <a href="" @click="toManageRecords" class="sub-items2"><i class='bx bxs-chevron-right arrowdown'></i>Manage Records</a>
              </div>
            
            
            </div>
             
          </div>
        </div>
 
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            showSubMenu: false,
            formattedDate: "",
            dropdownVisible: false,
            showSubMenu2: false,
        };
    },
    methods: {
            updateDate() {
            const currentDate = new Date();
            const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
            this.formattedDate = currentDate.toLocaleDateString('en-US', options);
        },
        toggleSubMenu(event) {
            event.preventDefault();
            this.showSubMenu = !this.showSubMenu;
        },
        toggleDropDown() {
          event.preventDefault(); 
          this.dropdownVisible = !this.dropdownVisible;
        },
        closeDropdown(){
          this.dropdownVisible = false;
        },
        toManageTools(){
          this.$router.push('/panelboardequipment');
        },
        toBorrowlist(){
          this.$router.push('/itemlist');
        },
   
        toManageRecords(){
          this.$router.push('/borrowlist');
        },
        toRequestList(){
          this.$router.push('/request');
        },
        toggleSubmenu2(event) {
          event.preventDefault();
          this.showSubMenu2 = !this.showSubMenu2;
        },
    },
    mounted() {
        this.updateDate();
    },
    components: { RouterLink }
};

</script>


<style scoped>





html {
  width: 100%;
  height: 100%;
}


/* sign-out area */
.user-setting {
  position: relative;
  display: inline-block;
  left: 92.3%;
  top: -3em;
}

.user-setting .text-admin {
  color: rgba(249, 60, 195, 0.78);
  font-family: 'Cambay' sans-serif;
  font-size: 27px;
  font-style: normal;
  font-weight: 400;
}

.user-dropdown {
  display: none;
  position: relative;
  background-color: #f9f9f9;
  min-width: 150px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  left: 0; 
  top: 100%;
}

.user-setting:hover .user-dropdown {
  display: block;
}

.user-dropdown a {
  color: black;
  padding: 10px 10px;
  text-decoration: none;
  display: block;
  font-size: 20px;
  transition: transform 0.2s ease-in-out;
  
}

.user-dropdown a:hover {
  background-color: #f1f1f1;
  transform: scale(1.05);
}

.left-align {
  text-align: left;
}

.admin-icon {
  padding: 0;
  color: black;
}


.show {
  display: block;
}



/* end of signout area */


.container {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 0;
    background: #FFF;
    left: 0;
    right: 0;
    max-width: 100%;
    overflow: hidden;
  } 

  /* SIDEBAR */
  .nav-bar {
  

    position: absolute;
    background: pink;
    width: 20%;
    height: 100%;
    left: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    bottom: 0.2%;
    background: rgba(238, 158, 215, 0.96);



  }

  .nav-bar h1 {
    margin-top: 5%;
    position: relative;
    font-size: 35px;
    align-items: center;
    justify-content: center;
    align-items: center;
    display: flex;
    color: rgba(7, 7, 7, 0.94);
    font-family: 'Poppins' sans-serif;
    font-weight: 700;
    font-style: normal;
    line-height: normal;
    
    
  }

  .nav-bar img {
    position: relative;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 25%;
    box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.30);
    border-radius: 50%;
    border-width: 1rem;
    background: lightgray 50% / cover no-repeat;
  }
    


  .nav-menus {
    position: relative;
    margin-top: 30px;
    left: 18%;
  }

  .nav-menus .items {
    position: relative;
    cursor: pointer;
    align-items: center;
  
  }

  .nav-menus .items a {
    color: black;
    font-size: 18px;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    padding: 10px;
    line-height: 60px;
    display: block;

  }

 

  .nav-menus .items a:hover {
    color: white;
    transition: 0.3s ease;
  }

  .nav-menus .items a i {
    margin-right: 15px;
  }

  .nav-menus .items a .dropdown  {
    position: absolute;
    margin: 10x;
    transition: 0.3s ease;
    
  }

  .nav-menus .items a .sub-menu {
    background: rgb(10, 2, 2);
    

  }

  .nav-menus .items a .sub-menu a {
    padding-left: 80px;
  }



  .nav-menus .items a .sub-menu2 {
    background: rgb(10, 2, 2);
    

  }

  .nav-menus .items a .sub-menu2 a {
    padding-left: 80px;
  }

  /* ENDING OF SIDEBAR */


  /* container contents */
  .container h2{
  position: relative;
  align-items: flex-start;
  display: flex;
  left: 22%;
  color: rgba(255, 106, 213, 0.75);
  font-family: 'Content' sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  
}

.container .date {
  position: relative;
  display: flex;
  left: 23%;
  color: rgb(0, 0, 0);
  font-family: 'Carme' sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  align-items: flex-start;
  height: 30px;

}

</style>
