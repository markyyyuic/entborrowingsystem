import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Category from './components/Category.vue';
import About from './components/About.vue';
import Login from './components/Login.vue';
import Panelboard from './components/Panelboard.vue';
import itemselection from './components/itemselection.vue';
import maindashboard from './components/maindashboard.vue';
import confirmation from './components/confirmation.vue';
import Itemlist from './components/Itemlist.vue';
import borrowlist from './components/Borrowerslist.vue';
import request from './components/requestforuser.vue';
import sidebar from './components/sidebar.vue';
import requestforuser from './components/requestforuser.vue';
import submitprompt from './components/submitprompt.vue';
import dialogprompt from './components/logindialog.vue';






const routes = [
    { path: '/', component: Home },
    { path: '/category', component: Category },
    { path: '/about', name:'About', component: About },
    { path: '/login', component: Login},
    { path: '/panelboard', component: Panelboard},
    { path: '/itemselection', name: 'itemselection', component: itemselection, props: true },
    { path: '/maindashboards', component: maindashboard},
    { path: '/confirmation',  name: 'confirmation', component: confirmation, props: true},
    { path: '/itemlist', component: Itemlist},
    { path: '/borrowlist', component: borrowlist},
    { path: '/request', component: request},
    { path: '/sidebar', component: sidebar},
    { path: '/requests', component: requestforuser},
    { path: '/submitprompt', component: submitprompt},
    { path: '/dialogprompt', component: dialogprompt}

  
 
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;