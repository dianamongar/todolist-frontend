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
                            <a href="#" class="btn btn-danger btn-sm"  @click="() => deleteTag(tag.id_tags)"><i class="fas fa-trash-alt"></i> Borrar</a>
                        </div>
                    </div>
                </div>
            <br/>
        </div>
</template>
<script>
import TagService from '../service/TagService';
import NavBarBase from "@/components/NavBarBase.vue";
import Swal from 'sweetalert2';
export default {
    name : 'TagCrud',
    components: {
        NavBarBase,
    },
    data() {
        return {
            tags : null,
            userId : null, 
        }
    },
    created(){
        this.tagService = new TagService();
    },
    mounted(){
        // Verifica si this.tagService se ha creado antes de llamar a getAllTagsByUserId
        try {
            this.userId = this.$store.getters['getUserId'];
            console.log("ID del usuario reconocido en tag crud : " + this.userId);
            if(this.userId == null){
                console.log("No hay usuario logueado");
                this.$router.push({ name: 'login'});
            }
            this.tagService.getAllTagsByUserId(this.userId).then((data) => {
                this.tags = data.data.content;
                console.log(this.tags);
            });
            
        } catch (error) {
            console.error("Se produjo un error al obtener las etiquetas:", error);
        }
    },
    methods:{
        deleteTag(tagId){
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText : 'Cancelar',
                confirmButtonText: 'Sí, eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.tagService.deleteTag(tagId, this.userId).then((data) => {
                        if(data.data.code == "T-000"){
                            console.log("Etiqueta borrada");
                            this.tagService.getAllTagsByUserId(this.userId).then((data) => {
                                this.tags = data.data.content;
                                console.log(this.tags);
                            });
                            Swal.fire(
                                '¡Borrado!',
                                'La etiqueta ha sido borrada.',
                                'success'
                            )
                        }
                    });
                }
            })
        },
        },
    }
</script>
<style scoped>

</style>