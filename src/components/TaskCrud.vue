
    
<template>
    <div class="card">
        <DataTable :value="tasks" removableSort tableStyle="min-width: 50rem">
            <ColumnComponent field="" header="N°" sortable style="width: 25%"></ColumnComponent>
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
        try {
            this.taskService.getAllTasksByUserId(2).then((data) => {
                this.tasks = data.data.content;
                console.log(this.tasks);
            });
            
        } catch (error) {
            console.error("Se produjo un error al obtener las etiquetas:", error);
        }
    }
}
</script>
<style scoped>

</style> 