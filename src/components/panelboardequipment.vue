<script setup>
import Panelboard from './Panelboard.vue';

const items = [
  { name: 'Extension Wire', quantity: 2,  },
  { name:  'HDMI', quantity: 1, },
  { name:  'Projector', quantity: 1, },
  { name:  'Crimping Tool', quantity: 1, },
  { name:  'VGA to HDMI', quantity: 1, },
  { name:  'G.Wire', quantity: 1, },
  { name:  'Adapter', quantity: 1, },
  { name:  'Long Tables', quantity: 1, },
  { name:  'Clicker', quantity: 0, },
  { name:  'Mac VGA', quantity: 1, },
  { name:  'Puncher', quantity: 1, },
  { name:  'Pen Tablet', quantity: 1, },
];

const getItemImage = (itemName) => {
  const defaultImagePath = '/tools/notavail.jpg';
  const itemImageMap = {
    'Extension Wire': '/tools/extensionwire.png',
    'HDMI': '/tools/hdmi.png',
    'Projector': '/tools/projector.png',
    'Crimping Tool': '/tools/crimping.png',
    'VGA to HDMI': '/tools/vgatohdmi.png',
    'G.Wire': '/tools/Gwire.png',
    'Adapter': '/tools/adapter.png',
    'Long Tables': '/tools/longt.png',
    'Clicker': defaultImagePath, 
    'Mac VGA': defaultImagePath, 
    'Puncher': '/tools/puncher.png',
    'Pen Tablet': '/tools/pentablet.png',
  };
  return itemImageMap[itemName] || '';
};



</script>

<template>
    <Panelboard />
    <div class="header-container">
      <h1>Manage Tools</h1>
    </div>
    <div class="equipment-container">
      <div class="option-buttons">
      <a href="#" @click="addEquipment"><i class='bx bx-plus-circle'></i>Add Equipment</a>
      <a href=""><i class='bx bx-minus-circle'></i>Remove Equipment</a>
      <a href=""><i class='bx bxs-edit-alt' ></i>Edit Equipment</a>
    </div>
  
      <div class="items-container">
        <div v-for="(item, index) in items" :key="index" class="items" onclick="highlight">
          <div class="image-wrapper">
          <img :src="getItemImage(item.name)" alt="">
          </div>
          <div class="item-details">
            <h1>{{ item.name }}</h1>
            <h2>QUANTITY: {{ item.quantity }}</h2>
          </div>
        </div>


      </div>
    </div>
  </template>


<style scoped>



html {
  width: 100%;
  height: 100%;
}


.header-container {

  display: flex;
  justify-content: left;
  align-items: center;
  background: rgba(238, 158, 215, 0.96);
  border: 1px solid #000;
  position: absolute;
  right: 150px;
  top: 15%;
  width: 65%;
  padding: 10px;
  height: 2.5em;
}

.header-container h1 {
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
}

.equipment-container {

  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  position: absolute;
  right: 150px;
  top: 19.1%;
  width: 65%;
  padding: 10px;
  background: #FFF9F9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 75%;
  overflow-y: auto; 
  overflow-x: hidden;

}

.option-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}

.option-buttons a {
  text-decoration: none;
  color: #000;
  padding: 10px;
  margin: 0 10px;
  color: #302D2D;
  font-family: 'Inter' sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.items-container {
  width: 80vw;
  max-height: 75vh;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  align-content: flex-start; /* Adjusted property */
  border-radius: 10px;
  padding: 25px;
  justify-content: flex-start;

}
.items {
  display: grid;
  grid-template-rows: auto auto auto;
  text-align: center;
  position: relative;
  border-radius: 2px;
  margin: 10px;
  cursor: pointer;
}

.items img {
  width: 80%;
  height: 150px;
  border: 1px solid #000;
  border-radius: 5px;

}

.items img:hover {
  border-radius: 4px;
  border: 2px solid red;

}



.item-details h1, h2, h3 {
  font-size: 13px;
  margin: 0; /* Remove default margin */
  padding: 5px;
  font-weight: 400;
}


/* NAV-BOXES */





</style>