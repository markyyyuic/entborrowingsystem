<template>

 <div class="equip-bgm">
  <router-link to="/about"> 
    <button><img src="../assets/backbutton.png" alt="">CHOOSE EQUIPMENTS
  </button>
  </router-link>
 
    <div class="item-wrapper">
        <div v-for="(item, index) in items" :key="index" class="items" onclick="highlightItems(this)">
        <img :src="getItemImage(item.name)" alt="">
    <div class="item-details">
        <h1>{{ item.name }}</h1>
        <h2>{{ item.quantity }}</h2>
    
    </div>
</div>




 </div>

 <RouterLink to="/confirmation">
    <button class="nextbtn">NEXT</button>
  </RouterLink>
 </div>

</template>

<script setup>

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
  { name:  'Pen Table', quantity: 1, },
];


const getItemImage = (itemName) => {
  const defaultImagePath = '/tools/notavail.jpg'; // Replace with the path to your default image
  const itemImageMap = {
    'Extension Wire': '/tools/extensionwire.png',
    'HDMI': '/tools/hdmi.png',
    'Projector': '/tools/projector.png',
    'Crimping Tool': '/tools/crimping.png',
    'VGA to HDMI': '/tools/vgatohdmi.png',
    'G.Wire': '/tools/Gwire.png',
    'Adapter': '/tools/adapter.png',
    'Long Tables': '/tools/longt.png',
    'Clicker': defaultImagePath, // Add appropriate path or leave empty if no image
    'Mac VGA': defaultImagePath, // Add appropriate path or leave empty if no image
    'Puncher': '/tools/puncher.png',
    'Pen Table': '/tools/pentablet.png',
  };
  return itemImageMap[itemName] || '';
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300&family=Poppins:wght@800&display=swap');


body {
height: 100%;
width: 100%;
}
.equip-bgm {

  height: 100vh;
  width: 100vw;
  background: rgba(250, 195, 228, 0.96);
  overflow: hidden;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.equip-bgm button {
  border: none;
  background: none;
  margin-left: 45px;
  margin-top: 10px;
  font-size: 25px;
  text-transform: capitalize;
  padding: 10px;
  color: #756767;
}

.equip-bgm .items:hover img {
  border-radius: 5px;
  border-width: 2px;
  border-color: red;

}

.item-wrapper {
    width: 80vw;
    max-height: 75vh; 
    overflow: auto; 
    background: rgba(253, 250, 250, 0.55);
    margin: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

.item-wrapper .items {
  display: grid;
  grid-template-rows: auto auto auto;
  text-align: center;
  position: relative;
  border-radius: 2px;
  margin: 10px;
}

.items img {
  width: 100%;
  height: 150px;
  border: 1px solid #000;
}

.item-wrapper .item-details {
margin-top: 10px;
  text-align: center;
  position: relative;
}

.item-wrapper .item-details h1,
.item-wrapper .item-details h2 {
  font-size: 20px;
  border-radius: 20px;
  background: #a49999;
  color: #000;
}

.equip-bgm .nextbtn {
  top: 1%;
  position: relative;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, 0.60);
  background: #A49999;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 15%;
  height: 9%;
  flex-shrink: 0;
  left: 72%;
  transition: transform 0.2s ease-in-out;
  color: #FFF;
}

.nextbtn:hover {
    background-color: rgb(211, 205, 205);
    transform: scale(1.05);


}

</style>