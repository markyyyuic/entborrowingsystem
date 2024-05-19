import { createApp } from 'vue';
import App from './App.vue';
import 'mdb-vue-ui-kit/css/mdb.min.css';
import router from './router';
import PrimeVue from 'primevue/config';
import store from '../src/components/store'; // Import the Vuex store
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import DataView from 'primevue/dataview';

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
  .use(ConfirmationService)
  .component("DataTable",DataTable)
  .component("Column",Column)
  .component("InputText",InputText)
  .component("IconField",IconField)
  .component("InputIcon",InputIcon)
  .component("Button",Button)
  .component("Tag",Tag)
  .component("Dialog",Dialog)
  .component("DataView",DataView)
  .mount('#app');
