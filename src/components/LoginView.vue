    <template>
        <div class="container">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-md-5">
            <div class="d-flex flex-column align-items-center justify-content-center py-5">
                <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input type="text" class="form-control" id="username" v-model="nickname" required>
                </div>
                <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <button @click="login" class="btn btn-primary w-100">
                <i class="pi pi-user"></i> Login
                </button>
            </div>
            </div>
            <div class="col-md-2">
            <hr class="d-md-none">
            <div class="text-center">
                <b>Bienvenido</b>
            </div>
            </div>
        </div>
        </div>
    </template>
  

<script setup>

</script>

<script>
import UserService from '../service/UserService';
import Swal from 'sweetalert2';
// import { useStore } from 'vuex';
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
        this.userService = new UserService(this.$store);
        
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
                    const userId = data.data.content.id_users;
                    console.log("este es el user id : "+userId);
                    // this.$store.dispatch('user/setUserId', userId);
                    this.$store.commit('setUserId', userId);
                    // Utiliza this.$store.getters para obtener el ID del usuario
                    const idDice = this.$store.getters['getUserId'];
                    console.log("ID del usuario reconocido: " + idDice);
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Exitoso',
                        text: 'Has iniciado sesión con éxito.',
                    });
                    this.$router.push({ name: 'tasks'});
                }else{
                    console.log('no se pudo loguear correctamente :(');
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Fallido',
                        text: 'Usuario o contraseña incorrectos. Por favor, inténtalo nuevamente.',
                    });
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