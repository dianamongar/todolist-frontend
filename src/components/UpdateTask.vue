<template>
    <h1>hola, llegamos a update</h1>
</template>
<script>
    import TaskService from '../service/TaskService';
    import TagService from '../service/TagService';
    export default {
    name : 'UpdateTask',
    
    data() {
        return {
            task : {
                name : "",
                dueDateDate : "",
                dueDateHour : "",
            },
            taskRecover :null,
            tags : [],
            selectedTags: [], // Lista de etiquetas seleccionadas
            idUser : null,
        }
    },
    created(){
        this.taskService = new TaskService();
        this.tagService = new TagService();
    },
    mounted(){
        try {
            this.idUser = this.$store.getters['getUserId'];
            console.log("ID del usuario reconocido en update task : " + this.idUser);
            if(this.idUser == null){
                console.log("No hay usuario logueado");
                this.$router.push({ name: 'login'});
            }
            
        } catch (error) {
            console.error("Se produjo un error al obtener el id del usuario:", error);
        }
    },
    methods: {
    
    // cancel() {
    //     this.$router.push({ name: 'tasks'});
    // },
    // recoverData() {
        
    //     var nameTag = document.getElementById("name");
    //     nameTag.value = this.taskRecover.name;
    //     console.log("la tarea tiene el nombre: "+this.task.name);
    // }
    },
}
</script>