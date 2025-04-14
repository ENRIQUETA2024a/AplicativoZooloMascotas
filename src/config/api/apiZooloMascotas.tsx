import axios from 'axios'

// TODO IP de la pc donde se ejecuta el backend
//const urlIP= "http://192.168.2.3:8888";
const urlIP= "https://apidb.vetzoolomascotas.online";
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