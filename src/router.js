// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginView.vue';
// import Main from './components/TagCrud.vue';
import NavBar from './components/NavBarBase.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/main', component: NavBar },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
