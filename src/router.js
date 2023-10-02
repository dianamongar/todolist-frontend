// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginView.vue';
import Main from './components/TagCrud.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/main', component: Main },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
