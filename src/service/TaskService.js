import axios from 'axios';

export default class TaskService{
    url = "http://localhost:8080/api/v1/tasks";

    getAllTasksByUserId(userId){
        const headers = {
            'id_users': userId,
        };
        return axios.get(this.url,{ headers });
        
    }
    urlCompleted = "http://localhost:8080/api/v1/tasks?state=Completado";
    getAllTasksByUserIdCompleted(userId){
        const headers = {
            'id_users': userId,
        };
        return axios.get(this.urlCompleted,{ headers });
        
    }
    urlPending = "http://localhost:8080/api/v1/tasks?state=Pendiente";
    getAllTasksByUserIdPending(userId){
        const headers = {
            'id_users': userId,
        };
        return axios.get(this.urlPending,{ headers });
        
    }
}