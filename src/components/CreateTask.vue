<template>
        <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card" style="width: 500px;">
            <div class="card-header">
            <h3 class="card-title">Nueva Tarea</h3>
            </div>
            <div class="card-body">
            <!-- Cuerpo de la tarjeta -->
            <form @submit.prevent="createTask">
                <div class="mb-3">
                <label for="name" class="form-label">Descripción:</label>
                <input type="textArea" id="name" class="form-control" v-model="task.name" required :maxlength="100">
                </div>
                <div class="mb-3">
                <label for="dueDateDate" class="form-label">Fecha límite:</label>
                <input type="date" id="dueDateDate" class="form-control" v-model="task.dueDateDate" required>
                <input type="time" id="dueDateHour" class="form-control" v-model="task.dueDateHour" required>
                </div>
                <!-- ETIQUETAS PARA ASOCIAR A LA TAREA -->
                <div class="card">
                <div class="card-body">
                    <div class="form-check" v-for="tag in tags" :key="tag.id_tags">
                    <input type="checkbox" class="form-check-input" :id="'tag' + tag.id_tags" v-model="selectedTags" :value="tag.id_tags">
                    <label class="form-check-label" :for="'tag' + tag.id_tags">{{ tag.name }}</label>
                    </div>
                </div>
                </div>
                <!-- FIN ETIQUETAS PARA ASOCIAR A LA TAREA -->
                <div class="mb-3">
                <button type="submit" class="btn btn-primary">Guardar</button>
                <button type="button" class="btn btn-secondary" @click="cancel">Cancelar</button>
                </div>
            </form>
            </div>
        </div>
        </div>
</template>

<script>
    import TaskService from '../service/TaskService';
    import TagService from '../service/TagService';
    export default {
    name : 'CreateTask',
    data() {
        return {
            task : {
                name : "",
                dueDateDate : "",
                dueDateHour : "",
            },
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
            console.log("ID del usuario reconocido en create task : " + this.idUser);
            if(this.idUser == null){
                console.log("No hay usuario logueado");
                this.$router.push({ name: 'login'});
            }
            try {
                this.tagService.getAllTagsByUserId(this.idUser).then((data) => {
                    this.tags = data.data.content;
                    console.log(this.tags);
                });
                
            } catch (error) {
                console.error("Se produjo un error al obtener las etiquetas:", error);
            }
            
        } catch (error) {
            console.error("Se produjo un error al obtener el id del usuario:", error);
        }
    },
    methods: {
    createTask() {
        try{
            console.log("se recuperó la nueva tarea:" + this.task.name);
            console.log('fecha de vencimiento: ' + this.task.dueDateDate + "hora: " + this.task.dueDateHour);
            console.log('etiquetas seleccionadas: ' + this.selectedTags);
            this.taskService.insertTaskForUser(this.idUser, this.task.dueDateDate, this.task.dueDateHour, this.task.name).then((data) => {
                console.log("codigo de respuesta http: "+ data.data.code);
                if(data.data.code == "T-000"){
                    console.log("tarea :" + data.data.content.id_tasks);
                    //se insertó correctamente la tarea :D
                    console.log('se creó la tarea correctamente :D');
                    //asociamos las etiquetas a la tarea
                    this.insertTagOfTask(data.data.content.id_tasks);
                    //this.$router.push({ name: 'tasks'});
                }else{
                    console.log('no se pudo crear la tarea :(');
                }
            });
        }catch(error)
        {
            console.log("Se produjo un error al crear la tarea:", error);
        }
    },
    insertTagOfTask(taskId){
        try{
            console.log("llegamos a insert tag of task");
            this.selectedTags.forEach((tag) => {
                console.log(tag);
                this.taskService.insertTagOfTask(taskId,tag, this.idUser).then((data) => {
                    console.log("codigo de respuesta http: "+ data.data.code);
                    if(data.data.code == "T-000"){
                        //se insertó correctamente la tarea :D
                        console.log('se creó la tarea correctamente :D '+ tag);
                        
                    }else{
                        console.log('no se pudo crear la tarea :(');
                    }
                });
            });
            this.$router.push({ name: 'tasks'});
        }catch(error){
            console.log("Se produjo un error al insertar la etiqueta de la tarea:", error);
        }
    },
    cancel() {
        this.$router.push({ name: 'tasks'});
    },
    },
}
</script>