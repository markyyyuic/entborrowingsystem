import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Category from './components/Category.vue';
import About from './components/About.vue';
import Login from './components/Login.vue';
import Panelboard from './components/Panelboard.vue';
import panelboardequipment from './components/panelboardequipment.vue';
import maindashboard from './components/maindashboard.vue';
import confirmation from './components/confirmation.vue';
import Itemlist from './components/Itemlist.vue';
import borrowlist from './components/Borrowerslist.vue';
import request from './components/requestforuser.vue';
import sidebar from './components/sidebar.vue';


const routes = [
    { path: '/', component: Home },
    { path: '/category', component: Category },
    { path: '/about', component: About },
    { path: '/login', component: Login},
    { path: '/panelboard', component: Panelboard},
    { path: '/panelboardequipment', component: panelboardequipment},
    { path: '/maindashboards', component: maindashboard},
    { path: '/confirmation', component: confirmation},
    { path: '/itemlist', component: Itemlist},
    { path: '/borrowlist', component: borrowlist},
    { path: '/request', component: request},
    {path: '/sidebar', component: sidebar},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;