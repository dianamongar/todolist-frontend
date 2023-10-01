import axios from 'axios';

export default class TagService{
    url = "http://localhost:8080/api/v1/tags";
    
    result;
    getAllTagsByUserId(){
        const headers = {
            'id_users': 2, // Ejemplo de token de autenticación
        };
        return axios.get(this.url,{ headers });
        
    }
}