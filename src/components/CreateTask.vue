<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <CardComponent class="p-mb-3" style="width: 500px">
            <template #header>
                <h3>Nueva Tarea</h3>
            </template>
            <template #content>
                <!-- Cuerpo de la tarjeta -->
                <form @submit.prevent="createTask">
                    <label for="title">Descripción:</label>
                    <br/>
                    <div class="p-grid p-justify-center">
                        <TextArea type="text" id="name" v-model="task.name" required :maxlength="100" ></TextArea>
                    </div>
                    <br/>
                    <label for="description">Fecha límite:</label>
                    <br/>
                    <div class="p-grid p-justify-center">
                        <InputText id="dueDateDate" type="date" v-model="task.dueDateDate" required/>
                        <InputText id="dueDateHour" type="time" v-model="task.dueDateHour" required/>
                    </div>
                    <br/>
                    <!--ETIQUETAS PARA ASOCIAR A LA TAREA-->
                    <div class="card">
                        <div class="card flex justify-content-center">
                            <div class="flex flex-column gap-3">
                                <div v-for="tag of tags" :key="tag.id_tags" class="flex align-items-center">
                                    <CheckBox v-model="selectedTags" :inputId="tag.id_tags.toString()" name="id_tags" :value="tag.id_tags" />
                                    <label :for="tag.id_tags">{{ tag.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--FIN ETIQUETAS PARA ASOCIAR A LA TAREA-->
                    <div class="p-grid p-justify-center">
                        <br/>
                        <button type="submit" class="p-button p-button-primary">Guardar</button>
                        <button class="p-button p-button-secondary" @click="cancel">Cancelar</button>
                    </div>
                </form>
            </template>
        </CardComponent>
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