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
                <!--crear nueva tag-->
                <br/>
                <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#crearEtiquetaModal">Nueva Etiqueta</button>
                    
                </div>
                <br/>
                <!--aqui esta el dialog para crear una nueva etiqueta-->
                <div class="d-flex justify-content-center">
                <div class="modal fade" id="crearEtiquetaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Crear Etiqueta</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- Formulario para crear etiqueta -->
                            <form @submit.prevent="createTag">
                            <div class="mb-3">
                                <label for="nombreEtiqueta" class="form-label">Nombre de la Etiqueta</label>
                                <input type="text" class="form-control" id="name" v-model="newTag" placeholder="Ingrese el nombre de la etiqueta" required>
                            </div>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Guardar</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                <!--aqui termina-->
                <div class="d-flex justify-content-center">
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
    import Swal from 'sweetalert2';
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
            userId : null,
            newTag : null,
        }
    },
    created(){
        this.taskService = new TaskService();
        this.tagService = new TagService();
    },
    mounted(){
        try {
            this.userId = this.$store.getters['getUserId'];
            console.log("ID del usuario reconocido en create task : " + this.userId);
            if(this.userId == null){
                console.log("No hay usuario logueado");
                this.$router.push({ name: 'login'});
            }
            try {
                this.tagService.getAllTagsByUserId(this.userId).then((data) => {
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
            this.taskService.insertTaskForUser(this.userId, this.task.dueDateDate, this.task.dueDateHour, this.task.name).then((data) => {
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
                this.taskService.insertTagOfTask(taskId,tag, this.userId).then((data) => {
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
    createTag(){
            console.log("se recuperó la nueva etiqueta:" + this.newTag);
            this.tagService.insertTagForUser(this.userId, this.newTag).then((data) => {
                console.log("codigo de respuesta http: "+ data.data.code);
                if(data.data.code == "T-000"){
                    //se insertó correctamente la etiqueta :D
                    console.log('se creó la etiqueta correctamente :D');
                    this.tagService.getAllTagsByUserId(this.userId).then((data) => {
                        this.tags = data.data.content;
                        console.log(this.tags);
                    });
                    Swal.fire(
                        '¡Creado!',
                        'La etiqueta ha sido creada.',
                        'success'
                    )
                }else{
                    console.log('no se pudo crear la etiqueta :(');
                }
            }
            );
        },
    },
}
</script>