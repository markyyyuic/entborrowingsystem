<template>
    <Panelboard />
    <div class="request-header">
        <h1>Request List</h1>
    </div>

    <div class="request-container">
        <h2>Requests for Approval</h2>
        <div class="table">
        <table>
            <thead>
                <tr>
                    <td>Stud/Per ID</td>
                    <td>Name</td>
                    <td>Year</td>
                    <td>Course & Sec</td>
                    <td>Univ Role</td>
                    <td>Equipment</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="request in request" :key="request.id"> 
                    <td>{{ request.id }}</td>
                    <td>{{ request.name }}</td>
                    <td>{{ request.year }}</td>
                    <td>{{ request.coursesection }}</td>
                    <td>{{ request.role }}</td>
                    <td>{{ request.equipments }}</td>
                    <td><button class="button1">Approve</button></td>
                    <td><button class="button2">Decline</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>


    

</template>

<script setup>
import Panelboard from './Panelboard.vue';
import { RouterLink } from 'vue-router';

const request = [
    {id: 1126, name: "JD Boy Saycon", year: "2nd Year", coursesection: "BSIT-2B", role: "Student", equipments: "HDMI x1, Projector x1" },
    {id: 1127, name: "Clyde Balaman", year: "--", coursesection: "--", role: "Professor", equipments: "Extension Wire x1, Projector x1" },
    {id: 1128, name: "Xaian Paul Belderol", year: "2nd Year", coursesection: "BSIT-2B", role: "Student", equipments: "Pen Tablet x1" },
    {id: 1129, name: "Resti Deniega", year: "2nd Year", coursesection: "BSIT-2B", role: "Student", equipments: "Long Table x1" },
    {id: 1130, name: "Zeuel Lalaguna", year: "2nd Year", coursesection: "BSIT-2B", role: "Student", equipments: "G.Wire 2x" },
    {id: 1131, name: "Janilla Conde", year: "2nd Year", coursesection: "BSIT-2B", role: "Student", equipments: "Extension Wire x1, Pen Tablet x1" },
]
    


</script>

<style scoped>

.request-header {
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

.request-header h1 {
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

.request-container {
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

.request-container h2 {
    margin: 10px;
  top: 10px;
  font-size: 1em;
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

.table tbody tr td button.button1 {
    border: none;
    background: #6ACC62;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;
    height: 35px;
}


.table tbody tr td button.button2 {
    border: none;
    background: #DE5B5B;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;
    height: 35px;
}

</style>