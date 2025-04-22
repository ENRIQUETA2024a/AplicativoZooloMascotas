import axios from 'axios'

// TODO IP de la pc donde se ejecuta el backend
const urlIP= "https://apidb.vetzoolomascotas.online";
// Rutas para consumir el api
export const urlAPI = `${urlIP}/api/app`;
// Ruta para verificar el backend
export const urlHealth= `${urlIP}/api/health`;

export const urlAvatarPet= `${urlIP}/storage/`;

export const apiZooloMascotas = axios.create({
    baseURL: urlAPI,
    headers:{
        'content-type': 'application/json'
    },
})