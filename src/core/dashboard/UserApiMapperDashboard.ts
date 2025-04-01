import {UserApiResponseDashboard} from "./UserApiResponseDashboard";
import {Role, UserDashboard} from "./UserDashboard";


export class UserApiMapperDashboard {
    static mapUserApiResponseToModel(userApi: UserApiResponseDashboard): UserDashboard[] {
        return userApi.data.map(user => ({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            role_id: user.role_id,
            avatar: user.avatar,
            created_at: user.created_at,
            deleted_at: user.deleted_at,
            role: user.role_id ?
                {   id: user.role.id,
                    name: user.role.name
                } : undefined,
        }))
    }
}

