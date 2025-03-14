import {VaccineApiResponse} from "./VaccineApiResponse";
import {Vaccine} from "./Vaccine";

export class VaccineApiMapper {
    // #TODO Convierte desde API "JSON" hacia Modelo "Clase", lee los datos de la API y convierte a nuestro modelo
    static mapApiResponseToModel(vaccine: VaccineApiResponse):Vaccine{
        return {
            veterinary: vaccine.veterinary,
            vaccine_names: vaccine.vaccine_names,
            day:vaccine.day,
            date_appointment: vaccine.date_appointment,
            next_due_date: vaccine.next_due_date,
            reason: vaccine.reason,
            state: vaccine.state,
            outside: vaccine.outside,
            reschedule: vaccine.reschedule,
            amount: vaccine.amount,
            state_pay: vaccine.state_pay,
        }
    }
}