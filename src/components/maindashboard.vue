<template>

<!-- MAIN CONTENT -->
<sidebar />

  <div class="main-container">
    <h1>Dashboard</h1>

    <div style="width: 70%;  left: 26%; position: fixed; top: 18%; " class="table-data" >
      <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions"  style="background-color: none;"    />
    </div>
    </div>

    <div class="history-container"> 
      <h2>History:</h2>
      <div class="tables">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Item Borrowed</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(borroweditems, index) in history" :key="index">
              <td>{{ borroweditems[1] }}</td>
              <td>{{ borroweditems[3] }}</td>
              <td>{{ borroweditems[2] }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    

    <!-- <div class="transaction-history">
      <h2>Borrowed History</h2>
      <div class="data-table" style="">
          <div class="colro">
            <table style="width:71%; position: fixed; left: 25%; border-radius: 5%;">
              <thead>
                <tr class="header">
                  <th>Name</th>
                  <th>date</th>
                  <th>Equipment</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(transaction, index) in history" :key="index">
                  <td>{{ transaction[1] }}</td>
                  <td>{{ transaction[2] }}</td>
                  <td>{{ transaction[3] }}</td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div> -->
  </div>

  <div class="log-out">
    <RouterLink to="/login">
    <button >Sign Out</button><i class='bx bx-log-in'></i>
    </RouterLink>
  </div>

</template>


<script>
import { RouterLink } from "vue-router";
import sidebar from './sidebar.vue';
import { ref, onMounted } from "vue";
import axios from 'axios'; // Import axios for making HTTP requests
import Chart from 'primevue/chart';
import { ProductService } from '../services/ProductServices';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Sidebar from "primevue/sidebar";


export default {
  setup() {
    const chartData = ref(null);
    const chartOptions = ref(null);
    const products = ref([]);
    const history = ref([]); // Define the reactive variable for history data

    // Function to fetch history data from the API
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/history/history_data");
        history.value = response.data; // Update the history data with the response
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      const data = await ProductService.getProductsMini();
      products.value = data;
      chartData.value = setChartData();
      chartOptions.value = setChartOptions();
      fetchHistoryData(); // Call the function to fetch history data when the component is mounted
    });

    const setChartData = () => {
      const documentStyle = getComputedStyle(document.documentElement);
      return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Most Borrowed Tool Set 1',
            backgroundColor: '#FF6C8B',
            borderColor: '#FF6C8B',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: 'Most Borrowed Tool Set 2',
            backgroundColor: documentStyle.getPropertyValue('--gray-500'),
            borderColor: documentStyle.getPropertyValue('--gray-500'),
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      };
    };

    const setChartOptions = () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500
              }
            },
            grid: {
              display: false,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
    };

    return { chartData, chartOptions, products, history }; // Return the history data for use in the template
  },
  components: {
    Chart,
    DataTable,
    Column,
    sidebar
  }
};



</script>

<style scoped>

/* TABLE */

.history-container {
  position: fixed;
  margin: 0;
  left: 54%;
  top: 57%;
}

.history-container h2 {
  position: fixed;
  font-size: 1.2rem;
  left: 27%;
  font-weight: bold;
}

.history-container  table {
  position: fixed;
  border: 1px solid #FF6C8B;
  width: 70%;
  bottom: 13%;
  left: 27%;

  
  
 

}

.history-container thead tr {
  color: black;
 
  
}

.history-container thead tr th {
  border: 1px solid #FF6C8B;
  width: 40%;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
  padding: 0.5%;
  font-weight: 400;
}


.history-container tbody tr td {
  border: 1px solid #FF6C8B;
  width: 40%;
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
  padding: 0.5%;
  font-weight: 400;
}


/* Sign out  */

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
/* TABLE EDITS */

/* table, td, th {  
    border: 2px solid #FB0664E0;
    background-color: #FFE3E7;
  }
  
  table {
    border-collapse: collapse;
    width: 50%;
    position: fixed;
    
  
  }
  
  th, td {
    padding: 15px;
  }
  th{
      background-color: #FFE3E7;
      border: 2px solid #FF6C8B;

  } */


.main-container{
  position: fixed;
  height: 100%;
  width: 80%;
  left: 21%;
  margin: 0;
}

.p-chart {
  height: 17rem;
}

.transaction-history {

  top: 65%;
  position: fixed;
  height: 45%;
  width: 80%;
}

.p-datatable {
  position: fixed;
  left: 25%;
  width: 70%;
  box-shadow: 3px 5px  rgba(0, 0, 0, 0, 0.5);
  background-color: red !important;
}


.transaction-history h2 {
  font-size: 16px;
  left: 25%;
  top: 62%;
  position: fixed;
  font-family: 'Poppins', sans-serif;
  color: #8C0F3D;
}



































/* SIDE BAR SECTION! */




</style>