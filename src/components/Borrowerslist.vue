<script setup>
import Panelboard from './Panelboard.vue';
import { RouterLink } from 'vue-router';

const users = [
  { id: 1111, name: "Mark Anthony Nisnea", year: "2nd Year", coursesection: "BSIT-2B", role: "Student" },
  { id: 1122, name: "Xaian Paul Belderol", year: "2nd Year", coursesection: "BSIT-2B", role: "Student" },
  { id: 1123, name: "Resti Deniega", year: "1st Year", coursesection: "BSIT-1B", role: "Student" },
  { id: 1124, name: "Zeuel Lalaguna", year: "3rd Year", coursesection: "BSIT-3A", role: "Student" },
  { id: 1125, name: "Michel Bolo", year: "--", coursesection: "--", role: "Professor" },

  
]
</script>

<template>
 <Panelboard />

  
   <div class="item-header">
    <h1>Manage Records</h1>
   </div>

   <div class="content-item">
    <h2><i class='bx bxs-group'></i>LIST OF BORROWERS</h2>
    <div class="searchinput">    
    <label for="search">Search:</label>
    <input  class="searchbar" type="text">
  </div>



  <div class="table">
    <table>
      <thead>
      <tr>
        <th>Stud/Per ID</th>
        <th>Name</th>
        <th>Year</th>
        <th>Section</th>
        <th>University Role</th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-hover" v-for="users in users" :key="users.id">
        <td>{{ users.id }}</td>
        <td>{{ users.name }}</td>
        <td>{{ users.year }}</td>
        <td>{{ users.coursesection }}</td>
        <td>{{ users.role }}</td>
      </tr>
    </tbody>
    </table>

  </div>

   </div>

 


</template>


<style scoped>



.item-header {
  display: flex;
  justify-content: left;
  align-items: center;
  background: rgba(238, 158, 215, 0.96);
  border: 1px solid #000;
  position: absolute;
  right: 8em;
  top: 15%;
  width: 65em;
  padding: 10px;
  height: 3.5em;
 
}

.item-header h1 {
  margin: 0;
  color: #2C2121;
  font-family: 'B612' sans-serif;
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: left;
  text-align: left;
  justify-content: left;
  margin-left: 10px;
  left: 0;
  text-align: center;
  margin-bottom: 7px;
}



.content-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  position: absolute;
  right: 8em;
  top: 21.1%;
  width: 65em;
  padding: 10px;
  background: #FFF9F9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 75%;
  overflow-y: auto; 
  overflow-x: hidden;

}

.content-item h2 {
  margin: 10px;
  top: 10px;
  font-size: 1em;
}

.content-item h2 i {
  font-size: 2em;
  margin: 10px;
  display: inline;
  margin-top: 20px;
  vertical-align: middle; /* Add this property */
}



.content-item .searchinput {
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  left: 25em;
  bottom: 2.3em;



}

.content-item label {
  margin: 10px;
}

.content-item .searchbar{
  width: 20vh;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  background: #FFF9F9;
}

 .table {
  width: 100vw;
  display: flex;
  height: 100vh;
  background: #FFFDFD;;


}

.table table {
  width: 66.8%;
  border: 1px solid black;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

.table table thead {
  height: 15%;
}

.table table tr td {
  color: black;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.table table tr th {
  color: black;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.table .data-hover:hover {
  background: lightgrey;
}
</style>