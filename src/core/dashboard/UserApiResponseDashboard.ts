import {UserDashboard} from "./UserDashboard";


export interface UserApiResponseDashboard{
    message:string;
    data: UserDashboard[];
}