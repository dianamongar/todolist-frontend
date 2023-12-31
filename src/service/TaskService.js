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
    getAllCompletedTasksByUserId(userId){
        const headers = {
            'id_users': userId,
        };
        return axios.get(this.urlCompleted,{ headers });
        
    }
    urlPending = "http://localhost:8080/api/v1/tasks?state=Pendiente";
    getAllPendingTasksByUserId(userId){
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
    deleteTagOfTask(taskId, tagId, userId){
        const headers = {
            'id_users': userId,
        };
        const urlInsertTagOfTask = `http://localhost:8080/api/v1/tasks/${taskId}/tags/${tagId}`;
        
        return axios.delete(urlInsertTagOfTask, { headers });
    }
    deleteTask(taskId, userId){
        const headers = {
            'id_users': userId,
        };
        const urlDeleteTask = `http://localhost:8080/api/v1/tasks/${taskId}`;
        return axios.delete(urlDeleteTask,{ headers });
    }
    completeTask(taskId, name, dueDate, userId, state){
        const headers = {
            'id_users': userId,
        };
        const urlCompleteTask = `http://localhost:8080/api/v1/tasks/${taskId}`;
        const requestData = {
            "name" : name,
            "due_date" : dueDate,
            "state" : state
        }
        return axios.put(urlCompleteTask, requestData,{ headers });
    }
    updateTask(userId, taskId, dueDateDate, dueDateTime, name){
        const headers = {
            'id_users': userId,
        };
        const dueDate = dueDateDate + "T" + dueDateTime+".000Z";
        const requestData = {
            "name" : name,
            "due_date" : dueDate,
            "state" : "Pendiente"
        }   
        const urlUpdateTask = `http://localhost:8080/api/v1/tasks/${taskId}`;
        return axios.put(urlUpdateTask, requestData,{ headers });
    }
}