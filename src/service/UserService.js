import axios from 'axios';

export default class UserService{

    constructor(store) {
        this.store = store;
    }
    url = "http://localhost:8080/api/v1/login";
    result;
    login(nickname, password){
        const requestData = {
            "nickname" : nickname,
            "password" : password
        }
        return axios.post(this.url, requestData);
        
    }
}