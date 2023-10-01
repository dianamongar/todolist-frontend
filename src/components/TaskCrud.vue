<!--<template>

</template>-->
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
    }
}
</script>
<style scoped>

</style>