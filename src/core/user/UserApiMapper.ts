import {UserApiResponse} from "./UserApiResponse";
import {User} from "./User";


export const UserApiMapper=( data:UserApiResponse)=>{
    const token = data.token;
    const user : User
        ={
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        email_verified_at: data.user.email_verified_at ,
        surname: data.user.surname,
        avatar: data.user.avatar ,
        phone: data.user.phone ,
        type_document: data.user.type_document,
        n_document: data.user.n_document,
        gender: data.user.gender,
    }
    return {
        userAccessed: user,
        userToken: token,
    }
}