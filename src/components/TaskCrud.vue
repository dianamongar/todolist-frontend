
    
<template>
    

    <div class="cabecera">
        <h1>Lista de tareas</h1>
        <div>
                <ButtonComponent @click="createTask" class="p-button p-button-primary"><strong>Nueva tarea</strong></ButtonComponent>
        </div> 
    </div>
    <br/>
    <div>
        <div class="list-group" style="padding:5%">
                <div v-for="task in tasks" :key="task.id_tasks" class="card">
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
                                    <mark style="background-color: rgba(237, 221, 144, 0.58);">{{tag}}</mark>
                                </div>
                            </div>
                        </a>
                        <br/>
                        <div >
                            <!-- <font-awesome-icon icon="trash" /> -->
                            <!-- Icono de Editar (lápiz) más pequeño y con margen -->
                            <a href="#" class="btn btn-primary btn-sm mr-2" ><i class="fas fa-pencil-alt"></i> Editar</a>
                            <!-- Icono de Borrar (basura) más pequeño y con margen -->
                            <a href="#" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Borrar</a>
                        </div>
                    </div>
                </div>
            <br/>
        </div>
    </div>
    <!-- <div class="card">
        <DataTable :value="tasks" removableSort tableStyle="min-width: 50rem">
            <ColumnComponent field="" header="Etiquetas" sortable style="width: 25%"></ColumnComponent>
            <ColumnComponent field="task.name" header="Descripción" sortable style="width: 25%"></ColumnComponent>
            <ColumnComponent field="task.state" header="Estado" sortable style="width: 25%"></ColumnComponent>
            <ColumnComponent field="task.due_date" header="Fecha de vencimiento" sortable style="width: 25%"></ColumnComponent>
            <ColumnComponent field="task.completation_date" header="Fecha de completado" sortable style="width: 25%"></ColumnComponent>
            
        </DataTable>
    </div> -->
</template>


<script>
import TaskService from '../service/TaskService';
export default {
    name : 'TaskCrud',
    data() {
        return {
            tasks : null,
        }
    },
    taskService : null,
    created(){
        this.taskService = new TaskService();
    },
    mounted(){
        const idDice = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en task : " + idDice);
        try {
            this.taskService.getAllTasksByUserId(idDice).then((data) => {
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
    },
}
</script>
<style scoped>

</style> 