import axios from 'axios';

export default class TagService{
    url = "http://localhost:8080/api/v1/tags";
    
    result;
    getAllTagsByUserId(userId){
        const headers = {
            'id_users': userId,
        };
        return axios.get(this.url,{ headers });
        
    }
}