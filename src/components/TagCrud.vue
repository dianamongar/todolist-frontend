<template>
    <NavBarBase/>
    <div class="cabecera">
        <h1>Lista de etiquetas</h1>
        <div>
            <ButtonComponent @click="createTag" class="p-button p-button-primary"><strong>Nueva etiqueta</strong></ButtonComponent>
        </div> 
    </div>
    <br/>
    <div class="list-group" style="padding:5%" >
                <div v-for="tag in tags" :key="tag.id_tags" class="card" >
                    <div class="card-body">
                        <a href="#" class="list-group-item list-group-item-action ">
                            <div>
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{ tag.name }}</h5>
                                    
                                </div>
                            </div>
                        </a>
                        <br/>
                        <div class="d-flex w-100 justify-content-between">
                            <a href="#" class="btn btn-primary btn-sm mr-2" ><i class="fas fa-pencil-alt"></i> Editar</a>
                            <a href="#" class="btn btn-danger btn-sm"  @click="() => confirmDelete(task.task.id_tasks)"><i class="fas fa-trash-alt"></i> Borrar</a>
                        </div>
                    </div>
                </div>
            <br/>
        </div>
</template>
<script>
import TagService from '../service/TagService';
import NavBarBase from "@/components/NavBarBase.vue";
export default {
    name : 'TagCrud',
    components: {
        NavBarBase,
    },
    data() {
        return {
            tags : null,
        }
    },
    created(){
        this.tagService = new TagService();
    },
    mounted(){
        // Verifica si this.tagService se ha creado antes de llamar a getAllTagsByUserId
        try {
            this.tagService.getAllTagsByUserId(2).then((data) => {
                this.tags = data.data.content;
                console.log(this.tags);
            });
            
        } catch (error) {
            console.error("Se produjo un error al obtener las etiquetas:", error);
        }
    }
}
</script>
<style scoped>

</style>