// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginView.vue';
// import Main from './components/TagCrud.vue';
import NavBar from './components/NavBarBase.vue';
import TagCrud from './components/TagCrud.vue';
import TaskCrud from './components/TaskCrud.vue';
import CreateTask from './components/CreateTask.vue';
import UpdateTask from './components/UpdateTask.vue';
import TaskCompleted from './components/TaskCompletedCrud.vue';
import TaskPending from './components/TaskPendingCrud.vue';



const routes = [
    { path: '/', component: Login, name: 'login' },
    { path: '/main', component: NavBar, name: 'main' },
    { path: '/tags', component: TagCrud, name: 'tags' },
    { path: '/tasks', component: TaskCrud, name: 'tasks' },
    { path: '/tasks/Completado', component: TaskCompleted, name: 'tasksCompleted'},
    { path: '/tasks/Pendiente', component: TaskPending, name: 'tasksPending'},
    { path: '/tasks', component: CreateTask, name: 'createTask' },
    { path: '/tasks/Update', component: UpdateTask, name: 'updateTask'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
