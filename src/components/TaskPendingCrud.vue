
    
<template>
    <div :key="keyForComponent">
    <NavBarBase/>
    <div class="cabecera">
        <h1>Lista de tareas : {{ this.state }}</h1>
        <div>
            <ButtonComponent @click="createTask" class="p-button p-button-primary"><strong>Nueva tarea</strong></ButtonComponent>
        </div> 
    </div>
    <br/>
    <div>
        <div class="list-group" style="padding:5%" >
                <div v-for="task in tasks" :key="task.id_tasks" class="card" >
                    <div class="card-body">
                        <a href="#" class="list-group-item list-group-item-action ">
                            <div>
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{ task.task.name }}</h5>
                                    <small :class="{'text-success': task.task.state === 'Completado', 'text-danger': task.task.state !== 'Completado'}">
                                        <strong>{{ task.task.state }}</strong>
                                    </small>
                                </div>
                                <p class="mb-1">Fecha de vencimiento: <strong>{{formatDate(task.task.due_date)}}</strong></p>
                                <small v-if="task.task.state !== 'Pendiente'">Fecha de completado: {{ formatDate(task.task.completation_date) }}</small>

                                <div v-for="tag in task.tag" :key="tag">
                                    <i class="fas fa-tag"></i><mark style="background-color: rgba(255, 237, 148, 0.58);">{{tag}}</mark>
                                </div>
                            </div>
                        </a>
                        <br/>
                        <!--TODO al crear una etiqueta, debe reconocer diferentes etiquetas para un usuario-->
                        <div class="d-flex w-100 justify-content-between">
                            <div>
                                <a href="#" class="btn btn-primary btn-sm mr-2" @click="() => updateTask(task.task.id_tasks, task.task.name, task.task.state, task.task.due_date, task.tag)"><i class="fas fa-pencil-alt" ></i> Editar</a>
                                <a href="#" class="btn btn-danger btn-sm"  @click="() => confirmDelete(task.task.id_tasks)"><i class="fas fa-trash-alt"></i> Borrar</a>
                            </div>
                            <div>
                                <button type="button" class="btn btn-light" @click="() => toggleTaskStatus(task.task.id_tasks, task.task.name, task.task.due_date, task.task.state) ">
                                    {{ task.task.state === 'Completado' ? 'Marcar como pendiente' : 'Marcar como completada' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <br/>
        </div>
        <br/>
    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import NavBarBase from "@/components/NavBarBase.vue";
import TaskService from '../service/TaskService';
export default {
    name : 'TaskPendingCrud',
    // props: {
    // state: String, // Declarar state como una propiedad de tipo String
    // },
    components: {
        NavBarBase,
    },
    data() {
        return {
            keyForComponent: 0,
            tasks : null,
            userId : null,
            state : 'Pendiente',
        }
    },
    beforeRouteUpdate(to, from, next) {
        next(vm => {
            vm.loadData();
        });
    },
    taskService : null,
    created(){
        this.taskService = new TaskService();
        
    },
    mounted(){
        try {
            this.userId = this.$store.getters['getUserId'];
            console.log("--------------ID del usuario reconocido en task state: " + this.userId);
            console.log("el estado es : " + this.state);
            if(this.userId == null){
                this.$router.push({ name: 'login'});
            }else{
                this.getTasks();
            }
            
            
        } catch (error) {
            console.error("Se produjo un error al obtener las etiquetas:", error);
        }
    },
    methods: {
        formatDate(dateTime) {
        if (dateTime) {
            const date = new Date(dateTime);
            date.setHours(date.getHours() + 4);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${day}/${month}/${year} - ${hours}:${minutes}`;
        }
        return '';
    },
    getTasks(){
        if(this.state == 'Completado')
                this.taskService.getAllCompletedTasksByUserId(this.userId).then((data) => {
                    this.tasks = data.data.content;
                    console.log(this.tasks);
                });
            else if(this.state == 'Pendiente')
                this.taskService.getAllPendingTasksByUserId(this.userId).then((data) => {
                    this.tasks = data.data.content;
                    console.log(this.tasks);
                });
            else
            this.taskService.getAllTasksByUserId(this.userId).then((data) => {
                this.tasks = data.data.content;
                console.log(this.tasks);
            });
    },
    createTask() {
        this.$router.push({ name: 'createTask'});
    },
    confirmDelete(taskId) {
        Swal.fire({
            title: '¿Estás segur@?',
            text: '¿Quieres eliminar esta tarea?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
            console.log('Eliminando tarea...');
            this.taskService.deleteTask(taskId, this.userId).then((data) => {
                console.log(data);
                if(data.data.code == "T-000"){
                    console.log("tarea eliminada");
                    this.getTasks();
                    Swal.fire('Eliminado', 'El registro ha sido eliminado', 'success');
                }
                
            });
            
            }
        });
    },
    toggleTaskStatus(taskId, name, dueDate, state) {
        
        console.log('Cambiando estado de tarea...');
        console.log('estado actual : ' + state)
        var message='¿Quieres marcar esta tarea como completada?';
        var newState="Completado";
        var messageFinal='La tarea ha sido marcada como completada :D';
        
        if(state == 'Completado'){
            message='¿Quieres marcar esta tarea como pendiente?';
            newState="Pendiente";
            messageFinal='La tarea ha sido marcada como pendiente';
        }
            
        Swal.fire({
            title: '¿Estás segur@?',
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, marcar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
            console.log('Cambiando estado...');
            this.taskService.completeTask(taskId, name, dueDate, this.userId, newState).then((data) => {
                console.log(data);
                if(data.data.code == "T-000"){
                    console.log("tarea marcada como completada");
                    this.getTasks();
                    Swal.fire('Se cambió el estado!', messageFinal, 'success');
                }
                
            });
            
            }
        });
    },
    updateTask(taskId, name, state, dueDate, tag){
        //task.task.id_tasks, task.task.name, task.task.state, task.task.due_date, task.tag,
        if(state=="Completado"){
            Swal.fire({
                icon: 'error',
                title: 'No se puede editar!',
                text: 'La tarea ya ha sido completada, por lo que no puede editarse.',
            });
        }else{
            console.log("se produce un cambio en la tarea");
            this.$store.commit('setTaskId', taskId);
            this.$store.commit('setTaskName', name);
            this.$store.commit('setTaskState', state);
            this.$store.commit('setTaskDueDate', dueDate);
            this.$store.commit('setTaskTags', tag);
            console.log("este es el taskId guardado en store: " + this.$store.getters['getTaskId']);
            console.log("este es el taskName guardado en store: " + this.$store.getters['getTaskName']);
            console.log("este es el taskState guardado en store: " + this.$store.getters['getTaskState']);
            console.log("este es el taskDueDate guardado en store: " + this.$store.getters['getTaskDueDate']);
            console.log("este es el taskTags guardado en store: " + this.$store.getters['getTaskTags']);

            this.$router.push({ name: 'updateTask'});
        }
        
    },
    },
}
</script>
<style scoped>

</style> 