import axios from 'axios'
import * as url from "node:url";

// TODO ip de la pc donde se ejecuta el backend
const urlAPI = "http://192.168.2.3:8888/api/app"


export const apiZooloMascotas = axios.create({
    baseURL: urlAPI,
    headers:{
        'content-type': 'application/json'
    },
})


export const setAuthToken = (token) => {
    if(token){
        apiZooloMascotas.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
        delete apiZooloMascotas.defaults.headers.common['Authorization'];
    }
}