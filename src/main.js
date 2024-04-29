import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import 'mdb-vue-ui-kit/css/mdb.min.css';
import router from './router'; // Import the router configuration
import PrimeVue from 'primevue/config';



import 'primevue/resources/themes/saga-blue/theme.css'; // Theme
import 'primevue/resources/primevue.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons

// createApp(App).mount('#app')
createApp(App).use(router).use(PrimeVue).mount('#app');



