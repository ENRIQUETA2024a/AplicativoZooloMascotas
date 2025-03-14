// import {Owner, User, UserApiMapper, UserApiResponse} from "../../core";
// import {create} from "zustand/index";
// import {getAuthToken} from "../owners/ownerLoginActions";
// import * as SecureStore from "expo-secure-store";
// import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
//
//
// import {Alert} from "react-native";
//
// type LoginStatus = "authenticated" | "unauthenticated" | "loading";
// type UserType = "owner" | "user";
//
// export interface AuthState {
//     status: LoginStatus;
//     user?: Owner |User;
//     userType?: UserType;
//     login: (email: string, password: string,type: UserType) => Promise<boolean>;
//     logout: () => Promise<void>;
//     checkAuth: () => Promise<void>; // Funcion para ver
// }
//
// export const useUserLoginStore = create<AuthState>()((set, get) => ({
//     status: "loading", //Estado inicial
//     user: undefined,//No hay user autenticado
//     userType: undefined,
//
//     login: async (email: string, password: string,type: UserType) => {
//         const endpoint = type ==="owner" ? "/login-app": "/user-app";
//         const tokenKey= type ==="owner" ? "ownerAuthToken" : "userAuthToken";
//
//         try {
//
//         }
//         catch (error){
//             Alert.alert("Error", error.response?.data?.message || "Credenciales incorrectas");
//         }
//
//
//         const {userToken, userAccessed} = await userLoginActions(email, password);
//         //
//         if (userAccessed) {
//             //Guardamos el token de manera segura con SecureStore
//             await SecureStore.setItemAsync("authToken",userToken);
//             //Configuramos Axios con el token par futura solicitudes
//             apiZooloMascotas.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
//             //Actualizamos el estado
//             set({status: "authenticated",owner:userAccessed});
//
//             console.log("✅✅✅ Login Exitoso, nuevo estado ZUSTAND:", get().status); // Estado
//             console.log("✅✅✅Token Generado:", userToken); // Token
//             return true;
//         }
//         else {
//             set({status: "unauthenticated", owner: undefined});
//             return false;
//         }
//
//
//
//
//     },
//     checkAuth: async () => {
//         const token = await SecureStore.getItemAsync("authToken");
//         if (token) {
//             apiZooloMascotas.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//             set({status: "authenticated"})
//         } else {
//             set({status: "unauthenticated"});
//         }
//     },
//     logout: async () => {
//         await SecureStore.deleteItemAsync("authToken"); // Eliminamos el token de Secure Store
//         apiZooloMascotas.defaults.headers.common["Authorization"] = "";
//         set({status: "unauthenticated", owner: undefined});
//         console.log("❌ Estado al LOGOUT: ", get().status)
//         console.log("❌ Token Generado: ", getAuthToken() )
//     }
// }))
//
//
//
//
//
// const userLoginActions = async (email: string, password: string) => {
//     try {
//         const {data} = await apiZooloMascotas.post<UserApiResponse>("/user-app", {email, password});
//         const {userToken, userAccessed} = UserApiMapper(data);
//         return ({userToken, userAccessed});
//     } catch (error) {
//
//         if (error.response) {
//             // El backend respondió con un error (ej: 401, 404)
//             Alert.alert("Error", error.response.data.message || "Credenciales incorrectas");
//         } else {
//             // Error de red o desconexión
//             Alert.alert("Error", "No se pudo conectar con el servidor");
//         }
//         return null;
//     }
// }
//
