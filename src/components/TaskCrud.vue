
    
<template>
    <div class="cabecera">
        <h1>Lista de tareas</h1>
        <div>
                <ButtonComponent @click="createTask" class="p-button p-button-primary">Abrir Diálogo</ButtonComponent>
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
    createTask() {
        this.$router.push({ name: 'createTask'});
    },
    },
}
</script>
<style scoped>

</style> 