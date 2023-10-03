// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginView.vue';
// import Main from './components/TagCrud.vue';
import NavBar from './components/NavBarBase.vue';
import TagCrud from './components/TagCrud.vue';
import TaskCrud from './components/TaskCrud.vue';


const routes = [
    { path: '/', component: Login },
    { path: '/main', component: NavBar },
    { path: '/tags', component: TagCrud },
    { path: '/tasks', component: TaskCrud },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
