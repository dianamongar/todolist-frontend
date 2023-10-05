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
    insertTaskForUser(userId, dueDateDate, dueDateTime, name){
        const headers = {
            'id_users': userId,
        };
        const dueDate = dueDateDate + "T" + dueDateTime+":00.000Z";
        const requestData = {
            "name" : name,
            "due_date" : dueDate
        }
        return axios.post(this.url, requestData,{ headers });
    }
    insertTagOfTask(taskId, tagId, userId){
        const headers = {
            'id_users': userId,
        };
        const requestData = {
            "tags" : tagId
        }
        const urlInsertTagOfTask = `http://localhost:8080/api/v1/tasks/${taskId}/tags`;
        console.log(urlInsertTagOfTask);
        return axios.post(urlInsertTagOfTask, requestData,{ headers });
    }
    deleteTask(taskId, userId){
        const headers = {
            'id_users': userId,
        };
        const urlDeleteTask = `http://localhost:8080/api/v1/tasks/${taskId}`;
        return axios.delete(urlDeleteTask,{ headers });
    }
    completeTask(taskId, name, dueDate, userId){
        const headers = {
            'id_users': userId,
        };
        const urlCompleteTask = `http://localhost:8080/api/v1/tasks/${taskId}`;
        const requestData = {
            "name" : name,
            "due_date" : dueDate,
            "state" : "Completado"
        }
        return axios.put(urlCompleteTask, requestData,{ headers });
    }
}