import { createApp } from 'vue';
import App from './App.vue';
import 'mdb-vue-ui-kit/css/mdb.min.css';
import router from './router';
import PrimeVue from 'primevue/config';
import store from '../src/components/store'; // Import the Vuex store
import ToastService from 'primevue/toastservice';

// BOOTSTRAP STYLES
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(store)
  .use(ToastService)
  .mount('#app');
