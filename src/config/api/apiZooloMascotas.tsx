import axios from 'axios'
import * as url from "node:url";

// TODO IP de la pc donde se ejecuta el backend
const urlIP= "http://192.168.2.3:8888";
// Rutas para consumir el api
export const urlAPI = `${urlIP}/api/app`;
// Ruta para verificar el backend
export const urlHealth= `${urlIP}/api/health`;

export const apiZooloMascotas = axios.create({
    baseURL: urlAPI,
    headers:{
        'content-type': 'application/json'
    },
})