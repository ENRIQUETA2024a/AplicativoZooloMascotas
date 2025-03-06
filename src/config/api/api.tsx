import axios from 'axios'


const api = axios.create({
    baseURL: 'http://192.168.2.3:8888/api',
    headers:{
        'content-type': 'application/json'
    },
})

export const setAuthToken = (token) => {
    if(token){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
        delete api.defaults.headers.common['Authorization'];
    }
}

export default api;