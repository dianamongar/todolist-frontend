<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card" style="width: 500px;">
        <div class="card-header">
        <h3 class="card-title">Editar Tarea</h3>
        </div>
        <div class="card-body">
        <!-- Cuerpo de la tarjeta -->
        <form @submit.prevent="">
            <div class="mb-3">
            <label for="name" class="form-label">Descripción:</label>
            <input type="textArea" id="name" class="form-control"  required :maxlength="100">
            </div>
            <div class="mb-3">
            <label for="dueDateDate" class="form-label">Fecha límite:</label>
            <input type="date" id="dueDateDate" class="form-control"  required>
            <input type="time" id="dueDateHour" class="form-control"  required>
            </div>
            <!-- ETIQUETAS PARA ASOCIAR A LA TAREA -->
            <!-- <div class="card">
            <div class="card-body">
                <div class="form-check" v-for="tag in tags" :key="tag.id_tags">
                <input type="checkbox" class="form-check-input" :id="'tag' + tag.id_tags" v-model="selectedTags" :value="tag.id_tags">
                <label class="form-check-label" :for="'tag' + tag.id_tags">{{ tag.name }}</label>
                </div>
            </div>
            </div> -->
            <!-- FIN ETIQUETAS PARA ASOCIAR A LA TAREA -->
            <div class="mb-3">
            <button type="submit" class="btn btn-primary">Guardar</button>
            <button type="button" class="btn btn-secondary">Cancelar</button>
            </div>
        </form>
        </div>
    </div>
    </div>
</template>
<!-- <script>
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
            try {
                this.tagService.getAllTagsByUserId(this.idUser).then((data) => {
                    this.tags = data.data.content;
                    console.log(this.tags);
                });
                //agregar los datos a los campos de la tarea
                this.taskRecover = this.$store.getters['getTask'];
                this.recoverData();
            } catch (error) {
                console.error("Se produjo un error al obtener las etiquetas:", error);
            }
            
        } catch (error) {
            console.error("Se produjo un error al obtener el id del usuario:", error);
        }
    },
    methods: {
    
    cancel() {
        this.$router.push({ name: 'tasks'});
    },
    recoverData() {
        
        var nameTag = document.getElementById("name");
        nameTag.value = this.taskRecover.name;
        console.log("la tarea tiene el nombre: "+this.task.name);
    }
    },
}
</script> -->