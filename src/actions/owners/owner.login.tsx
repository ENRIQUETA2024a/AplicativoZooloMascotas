import {apiZooloMascotas} from '../../config/api/apiZooloMascotas'
import {OwnerResponse} from "../../infraestructure/interfaces/owner.response";
import {OwnerModel} from "../../domain/models/OwnerModel";
import {Alert} from "react-native";
import * as SecureStore from "expo-secure-store";

const returnOwnerAccessed = (data: OwnerResponse) => {
    const owner: OwnerModel = {
        id: data.owner.id,
        names: data.owner.names,
        surnames: data.owner.surnames,
        type_document: data.owner.type_document,
        n_document: data.owner.n_document,
        email: data.owner.email,
        phone: data.owner.phone,
        address: data.owner.address,
        city: data.owner.city,
        emergency_contact: data.owner.emergency_contact,
    };
    return {
       ownerAccessed: owner,
    }
}

export const ownerLogin = async (email:string,password:string) => {
    try{
        const {data} = await apiZooloMascotas.post<OwnerResponse>("/login-app", {email, password});
        const {token, owner} = data;

        //Guardamos el token de manera segura con SecureStore
        await SecureStore.setItemAsync("authToken",token);

        //Configuramos Axios con el token par futura solicitudes
        apiZooloMascotas.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        console.log("Usuario Authenticated successfully",owner);
        console.log("Token",token);
        return returnOwnerAccessed({token,owner}).ownerAccessed;
    }
    catch(error){
        // Alert.alert("Error:", "Credenciales incorrectas o problema en la red");
        // console.log(error.response ? error.response.data : error.message);
        // return null;

        if (error.response) {
            // El backend respondió con un error (ej: 401, 404)
            Alert.alert("Error", error.response.data.message || "Credenciales incorrectas");
        } else {
            // Error de red o desconexión
            Alert.alert("Error", "No se pudo conectar con el servidor");
        }
        return null;
    }
}

// Obtener el token para realizar cualquier solicitud Authenticada
export const getAuthToken= async ()=>{
    return await SecureStore.getItemAsync("authToken");
}