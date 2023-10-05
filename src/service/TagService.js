import axios from 'axios';
export default class TagService{
    url = "http://localhost:8080/api/v1/tags";

    getAllTagsByUserId(userId){
        const headers = {
            'id_users': userId,
        };
        return axios.get(this.url,{ headers });
        
    }
    deleteTag(tagId, userId){
        const headers = {
            'id_users': userId,
        };
        const urlDeleteTag = `http://localhost:8080/api/v1/tags/${tagId}`;
        return axios.delete(urlDeleteTag,{ headers });
    }
    insertTagForUser(userId, name){
        const headers = {
            'id_users': userId,
        };
        const requestData = {
            "name" : name
        }
        return axios.post(this.url, requestData,{ headers });
    }
    updateTag(tagId, userId, name){
        const headers = {
            'id_users': userId,
        };
        const requestData = {
            "name" : name
        }
        const urlUpdateTag = `http://localhost:8080/api/v1/tags/${tagId}`;
        return axios.put(urlUpdateTag, requestData,{ headers });
    }
}