<template>
    <NavBarBase/>
    <div class="cabecera">
        <h1>Lista de etiquetas</h1>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#crearEtiquetaModal">Nueva Etiqueta</button>
    </div>
    <!--aqui esta el dialog para crear una nueva etiqueta-->
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
    <!--aqui termina-->
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
                            <a href="#" class="btn btn-primary btn-sm mr-2" @click="() => editTag(tag.id_tags, tag.name)" data-bs-toggle="modal" data-bs-target="#editarEtiquetaModal"><i class="fas fa-pencil-alt"></i> Editar</a>
                            <a href="#" class="btn btn-danger btn-sm"  @click="() => deleteTag(tag.id_tags)"><i class="fas fa-trash-alt"></i> Borrar</a>
                        </div>
                        <!--editar  la etiqueta -->
                        <div class="modal fade" id="editarEtiquetaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Editar Etiqueta</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <!-- Formulario para editar etiqueta -->
                                    <form @submit.prevent="updateTag(tag.id_tags)">
                                    <div class="mb-3">
                                        <label for="nombreEtiqueta" class="form-label">Nombre de la Etiqueta</label>
                                        <input type="text" class="form-control" id="nameEdit" v-model="newValue" placeholder="Ingrese el nombre de la etiqueta" required>
                                    </div>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" class="btn btn-primary">Guardar</button>
                                    </form>
                                </div>
                                </div>
                            </div>
                        </div>
                        <!--aqui termina el editar etiqueta-->
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
            newTag : null,
            newValue : null,
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
                title: '¿Estás segur@?',
                text: "Se borrará la etiqueta de todas las tareas que estén relacionadas con ella",
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
        editTag(tagId, name){
            console.log("se recuperó la etiqueta:" + tagId);
            var nameTag = document.getElementById("nameEdit");
            nameTag.value = name;
        },
        //FIXME cerrar el cuadro cuando se edita la etiqueta
        updateTag(tagId){
            console.log("se recuperó la nueva etiqueta:" + this.newValue);
            console.log("se recuperó la etiqueta a modificar:" + tagId);
            console.log("del usuario:" + this.userId);
            this.tagService.updateTag(tagId, this.userId, this.newValue ).then((data) => {
                console.log("codigo de respuesta http: "+ data.data.code);
                if(data.data.code == "T-000"){
                    //se insertó correctamente la etiqueta :D
                    console.log('se editó la etiqueta correctamente :D');
                    this.tagService.getAllTagsByUserId(this.userId).then((data) => {
                        this.tags = data.data.content;
                        console.log(this.tags);
                    });
                    
                    Swal.fire(
                        '¡Editado!',
                        'La etiqueta ha sido editada.',
                        'success'
                    )
                }else{
                    console.log('no se pudo editar la etiqueta :(');
                }
            }
            );
        }
        
    },
}
</script>
<style scoped>

</style>