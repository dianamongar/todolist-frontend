
<template>
    <div class="card flex flex-column justify-center items-center">
    <div class="card text-center">
        <div class="flex flex-column md:flex-row">
            <div class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                <div class="flex align-items-center gap-2">
                    <label>Username</label>
                    <InputText v-model="nickname" id="username" type="text" class="w-full" required/>
                </div>
                <div class="flex align-items-center gap-2">
                    <label>Password</label>
                    <InputText v-model="password" id="password" type="password" class="w-full" required/>
                </div>  
                <ButtonComponent @click="login" label="Login" icon="pi pi-user" class="w-10rem"></ButtonComponent>
            </div>
            <div class="w-full md:w-2">
                <DividerComponent layout="horizontal" class="flex md:hidden" align="center"><b>Bienvenido</b></DividerComponent>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>

</script>

<script>
import UserService from '../service/UserService';
export default {
    
    name : 'LoginView',
    data() {
        return {
            user : {
                nickname : null,
                password : null,
            },
        }
    },
    created(){
        this.userService = new UserService();
    },
    mounted(){
        
    },
    methods: {
    async login() {
        //verificando que recupere bien el username y el password
        console.log("Username:", this.nickname);
        console.log("Password:", this.password);
        try {
            this.userService.login(this.nickname, this.password).then((data) => {
                console.log("codigo de respuesta http: "+ data.data.code);
                if(data.data.code == "T-000"){
                    //se recuperó el usuario con exito, se da paso al main
                    this.$router.push('/main');
                }else{
                    console.log('no se pudo loguear correctamente :(');
                }
                console.log(this.user);
            });
            
        } catch (error) {
            console.error("Se produjo un error al obtener las etiquetas:", error);
        }

        
        },
    },
}
</script>
<style scoped>

</style>