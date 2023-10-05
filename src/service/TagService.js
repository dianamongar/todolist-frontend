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
}