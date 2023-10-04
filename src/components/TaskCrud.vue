
    
<template>
    <div class="cabecera">
        <h1>Lista de tareas</h1>
        <div>
            <div>
        <button @click="showDialog = true" class="btn btn-primary">Abrir Diálogo</button>

        <!-- Diálogo emergente Bootstrap -->
        <div class="modal" tabindex="-1" role="dialog" v-if="showDialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Título del Diálogo</h5>
                <button type="button" class="close" @click="showDialog = false">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Contenido del diálogo -->
                <!-- Aquí puedes agregar tu formulario u otro contenido -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="showDialog = false">Cerrar</button>
                <button type="button" class="btn btn-primary">Guardar</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
        
    </div>
    <br/>
    <div class="card">
        <DataTable :value="tasks" removableSort tableStyle="min-width: 50rem">
            <ColumnComponent field="" header="Etiquetas" sortable style="width: 25%"></ColumnComponent>
            <ColumnComponent field="task.name" header="Descripción" sortable style="width: 25%"></ColumnComponent>
            <ColumnComponent field="task.state" header="Estado" sortable style="width: 25%"></ColumnComponent>
            <ColumnComponent field="task.due_date" header="Fecha de vencimiento" sortable style="width: 25%"></ColumnComponent>
            <ColumnComponent field="task.completation_date" header="Fecha de completado" sortable style="width: 25%"></ColumnComponent>
            
        </DataTable>
    </div>
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
    // agregarTarea() {
    //     // Aquí puedes guardar los datos de la tarea en tu lista de tareas o en tu estado de Vuex, etc.
    //     // Luego, cierra el diálogo:
    //     this.showDialog = false;
        
    //     // También puedes hacer la lógica para agregar la tarea a tu ToDo list.
    // },
    },
}
</script>
<style scoped>

</style> 