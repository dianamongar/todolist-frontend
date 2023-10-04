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
                        <button class="p-button p-button-secondary">Cancelar</button>
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
                tags : [],
            },
            tags : [],
            selectedTags: [], // Lista de etiquetas seleccionadas
        }
    },
    created(){
        this.taskService = new TaskService();
        this.tagService = new TagService();
    },
    mounted(){
        
        try {
            const idUser = this.$store.getters['getUserId'];
            console.log("ID del usuario reconocido en create task : " + idUser);
            if(idUser == null){
                console.log("No hay usuario logueado");
                this.$router.push({ name: 'login'});
            }
            try {
                this.tagService.getAllTagsByUserId(idUser).then((data) => {
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
        this.$router.push({ name: 'createTask'});
    },
    },
}
</script>