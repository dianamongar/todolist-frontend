// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginView.vue';
// import Main from './components/TagCrud.vue';
import NavBar from './components/NavBarBase.vue';
import TagCrud from './components/TagCrud.vue';
import TaskCrud from './components/TaskCrud.vue';
import CreateTask from './components/CreateTask.vue';


const routes = [
    { path: '/', component: Login, name: 'login' },
    { path: '/main', component: NavBar, name: 'main' },
    { path: '/tags', component: TagCrud, name: 'tags' },
    { path: '/tasks', component: TaskCrud, name: 'tasks' },
    { path: '/tasks', component: CreateTask, name: 'createTask' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
