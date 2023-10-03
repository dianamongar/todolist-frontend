<template>
    <NavBarBase/>
    <h1>hola :D </h1>
    <DataTable :value="tags" removableSort tableStyle="min-width: 50rem">
        <ColumnComponent field="" header="N°" sortable style="width: 25%"></ColumnComponent>
        <ColumnComponent field="name" header="Name" sortable style="width: 25%"></ColumnComponent>
    </DataTable>
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