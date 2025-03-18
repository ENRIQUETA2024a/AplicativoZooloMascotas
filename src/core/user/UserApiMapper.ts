import {UserApiResponse, UserDashboardApiResponse} from "./UserApiResponse";
import {User} from "./User";

export const UserApiMapper = (data: UserApiResponse) => {
    const token = data.token;
    const user: User
        = {
        id: data.user.id,
        names: data.user.name,
        surnames: data.user.surname,
        type_document: data.user.type_document,
        n_document: data.user.n_document,
        email: data.user.email,
        phone: data.user.phone,
        address: "S/N",
        city: "S/N",
        emergency_contact: "S/N",
        avatar: data.user.avatar,
        // NO USAR email_verified_at: data.user.email_verified_at ,
        // NO USAR gender: data.user.gender,
    }
    const role = data.role;
    return {
        userAccessed: user,
        userToken: token,
        userRole: role,
    }
}

export const UserApiMapperForDashboard = (user: UserDashboardApiResponse) => {
    return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        role_id: user.role_id,
        // avatar: `https://tudominio.com/storage/${user.avatar}`, // Si usas un bucket, ajusta la URL
        avatar: "S/N",
        created_at: new Date(user.created_at).toISOString(),
        role: {
            id: user.role.id,
            name: user.role.name
        }
    }
}