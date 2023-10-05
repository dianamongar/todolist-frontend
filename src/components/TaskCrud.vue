
    
<template>
    <NavBarBase/>
    <div class="cabecera">
        <h1>Lista de tareas</h1>
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
                                <p class="mb-1">Fecha de vencimiento: <strong>{{task.task.due_date}}</strong></p>
                                <small>Fecha de completado: {{task.task.completation_date}}</small>
                                <div v-for="tag in task.tag" :key="tag">
                                    <i class="fas fa-tag"></i><mark style="background-color: rgba(255, 237, 148, 0.58);">{{tag}}</mark>
                                </div>
                            </div>
                        </a>
                        <br/>
                        <div class="d-flex w-100 justify-content-between">
                            <div>
                                <a href="#" class="btn btn-primary btn-sm mr-2" ><i class="fas fa-pencil-alt"></i> Editar</a>
                                <a href="#" class="btn btn-danger btn-sm"  @click="() => confirmDelete(task.task.id_tasks)"><i class="fas fa-trash-alt"></i> Borrar</a>
                            </div>
                            <div>
                                <button type="button" class="btn btn-light" @click="() => toggleTaskStatus(task.task.id_tasks, task.task.name, task.task.due_date) ">
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
    
</template>

<script>
import Swal from 'sweetalert2';
import NavBarBase from "@/components/NavBarBase.vue";
import TaskService from '../service/TaskService';
export default {
    name : 'TaskCrud',
    components: {
        NavBarBase,
    },
    data() {
        return {
            tasks : null,
            userId : null,
        }
    },
    taskService : null,
    created(){
        this.taskService = new TaskService();
    },
    mounted(){
        
        try {
            this.userId = this.$store.getters['getUserId'];
            console.log("ID del usuario reconocido en task : " + this.userId);
            if(this.userId == null){
                this.$router.push({ name: 'login'});
            }
            this.taskService.getAllTasksByUserId(this.userId).then((data) => {
                this.tasks = data.data.content;
                console.log(this.tasks);
            });
            
        } catch (error) {
            console.error("Se produjo un error al obtener las etiquetas:", error);
        }
    },
    methods: {
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
                    this.taskService.getAllTasksByUserId(this.userId).then((data) => {
                        this.tasks = data.data.content;
                        console.log(this.tasks);
                    });
                    Swal.fire('Eliminado', 'El registro ha sido eliminado', 'success');
                }
                
            });
            
            }
        });
    },
    toggleTaskStatus(taskId, name, dueDate) {
        console.log('Cambiando estado de tarea...');
        Swal.fire({
            title: '¿Estás segur@?',
            text: '¿Quieres marcar esta tarea como completada?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, marcar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
            console.log('Eliminando tarea...');
            this.taskService.completeTask(taskId, name, dueDate, this.userId).then((data) => {
                console.log(data);
                if(data.data.code == "T-000"){
                    console.log("tarea marcada como completada");
                    this.taskService.getAllTasksByUserId(this.userId).then((data) => {
                        this.tasks = data.data.content;
                        console.log(this.tasks);
                    });
                    Swal.fire('Completada!', 'La tarea ha sido marcada como completada :D', 'success');
                }
                
            });
            
            }
        });
    },
    },
}
</script>
<style scoped>

</style> 