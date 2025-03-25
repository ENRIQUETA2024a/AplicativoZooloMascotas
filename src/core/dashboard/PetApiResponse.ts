import {Pet} from './Pet'

export interface PetApiResponse{
    message: string;
    data: Pet[];
}