<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card" style="width: 500px;">
        <div class="card-header">
        <h3 class="card-title">Editar Tarea</h3>
        </div>
        <div class="card-body">
        <!-- Cuerpo de la tarjeta -->
        <form @submit.prevent="updateTask">
            <div class="mb-3">
            <label for="name" class="form-label">Descripción:</label>
            <input type="textArea" id="name" class="form-control" v-model="editTask.name" required :maxlength="100">
            </div>
            <div class="mb-3">
            <label for="dueDateDate" class="form-label">Fecha límite:</label>
            <input type="date" id="dueDateDate" class="form-control" v-model="editTask.dueDateDate" required>
            <input type="time" id="dueDateHour" class="form-control" v-model="editTask.dueDateHour" required>
            </div>
            <!-- ETIQUETAS PARA ASOCIAR A LA TAREA -->
            <div class="card">
            <div class="card-body">
                <div class="form-check" v-for="tag in tags" :key="tag.id_tags">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            :id="'tag' + tag.id_tags"
                            :value="tag.id_tags"
                            v-model="selectedTags"
                            v-bind:checked="true"
                        >
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
    export default{
        name: 'UpdateTask',
        data(){
            return{
                task: {
                    id_tasks: null,
                    name: null,
                    dueDateDate: null,
                    dueDateHour: null,
                    state: null,
                },
                editTask:{
                    id_tasks: null,
                    name : "",
                    dueDateDate : "",
                    dueDateHour : "",
                    state: "",
                },
                editTags : [],
                oldTags : [],
                tags: [],
                selectedTags: [],
                newTag: null,
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
                }else{
                    this.tagService.getAllTagsByUserId(this.userId).then((data) => {
                        this.tags = data.data.content;
                        console.log(this.tags);
                        this.getDataUpdate();
                    });
                    
                }
                
            } catch (error) {
                console.log(error);
            }
        },
        methods:{
            isTagSelected(tag) {
                    return this.editTags.some(editTag => editTag === tag.name);
                },
            getDataUpdate(){
                console.log("hola");
                this.editTask.id_tasks = this.$store.getters['getTaskId'];
                this.editTask.name = this.$store.getters['getTaskName'];
                var date = this.$store.getters['getTaskDueDate'];
                const editDate = new Date(date);
                // Obtener la fecha y la hora por separado
                const formateDate = editDate.toISOString().split('T');
                const fechaDate = formateDate[0]; // Contiene la fecha en formato "YYYY-MM-DD"
                const fechaHour = formateDate[1].split('.')[0]; // Contiene la hora en formato "HH:MM:SS"
                // Asignar los valores a las propiedades de task
                this.editTask.dueDateDate = fechaDate;
                this.editTask.dueDateHour = fechaHour;
                this.editTask.state = this.$store.getters['getTaskState'];
                this.editTags = this.$store.getters['getTaskTags'];
                console.log("..........................................")
                console.log("las tags totales son " + this.tags)
                console.log("las tags que tiene esta pinche tarea son "+ this.editTags)
                console.log("estas son mis tags seleccionadas " + this.selectedTags)
                for (let i = 0; i < this.tags.length; i++) {
                    if(this.editTags.includes(this.tags[i].name)){
                        this.selectedTags.push(this.tags[i].id_tags);
                    }
                }
                //poniendo las selectedTags como oldTags
                this.oldTags = this.selectedTags;
            },
            updateTask(){
                try{
                    console.log("se recuperó la nueva tarea nombre:" + this.editTask.name);
                    console.log("se recuperó la nueva tarea fecha:" + this.editTask.dueDateDate);
                    console.log("se recuperó la nueva tarea hora:" + this.editTask.dueDateHour);
                    console.log("se recuperó la nueva tarea estado:" + this.editTask.state);
                    console.log("se recuperó la nueva tarea id:" + this.editTask.id_tasks);
                    this.taskService.updateTask(this.userId, this.editTask.id_tasks, this.editTask.dueDateDate, this.editTask.dueDateHour, this.editTask.name).then((data) => {
                        console.log("codigo de respuesta http: "+ data.data.code);
                        if(data.data.code == "T-000"){
                            //se recuperó el usuario con exito, se da paso al main
                            console.log("tarea creada con exito");
                            this.deleteTagOfTask(this.editTask.id_tasks);
                        }else{
                            console.log('no se pudo actualizar correctamente :(');
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'No se pudo actualizar la tarea.',
                            });
                        }
                    });
                    
                }catch(error){
                    console.log(error);
                }
            },
            cancel(){
                this.$router.push({ name: 'tasks'});
            },
            deleteTagOfTask(taskId){
                for(let i=0;i<this.oldTags.length;i++){
                    this.taskService.deleteTagOfTask(taskId,this.oldTags[i], this.userId).then((data) => {
                        console.log("codigo de respuesta http: "+ data.data.code);
                        if(data.data.code == "T-000"){
                            //se eliminó correctamente la tarea :D
                            console.log('se eliminó la tarea correctamente :D '+ this.oldTags[i]);
                        }else{
                            console.log('no se pudo eliminar la tarea :(');
                        }
                    });
                }
                this.insertTagOfTask(taskId);
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
                    Swal.fire({
                        icon: 'success',
                        title: 'Se editó correctamente!',
                        text: 'La tarea ha sido editada :)',
                    });
                    this.$router.push({ name: 'tasks'});
                }catch(error){
                    console.log("Se produjo un error al insertar la etiqueta de la tarea:", error);
                }
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
        }
    };
</script>