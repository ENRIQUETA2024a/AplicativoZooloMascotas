import {PetDashboard} from './PetDashboard'

export interface PetApiResponseDashboard{
    message: string;
    data: PetDashboard[];
}