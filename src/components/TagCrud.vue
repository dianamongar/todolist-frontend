<template>
    <h1>hola :D </h1>
</template>
<script>
import TagService from '../service/TagService';
export default {
    name : 'TagCrud',
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
    if (this.tagService) {
        this.tagService.getAllTagsByUserId().then((data) => {
            console.log(data);
        });
        } else {
            console.error("this.tagService no se ha inicializado correctamente.");
        }
    }
}
</script>
<style scoped>

</style>