import {AppointmentApiResponse} from "./AppointmentApiResponse";
import {Appointment} from "./Appointment";

export class AppointmentApiMapper {

    // #TODO Convierte desde API "JSON" hacia Modelo "Clase", lee los datos de la API y convierte a nuestro modelo
    static mapApiResponseToModel(appointment: AppointmentApiResponse): Appointment {
        return {
            id: appointment.id,
            veterinary: appointment.veterinary,
            day: appointment.day,
            date_appointment: appointment.date_appointment,
            reason: appointment.reason,
            reschedule: appointment.reschedule,
            state: appointment.state,
            state_pay: appointment.state_pay,
            amount: appointment.amount,
            hour_start: appointment.hour_start,
            hour_end: appointment.hour_end,
        }


    }

    // #TODO Convierte desde Modelo "Clase" hacia API "JSON", enviamos datos a la API
    static mapToModelToApiResponse(appointment: Appointment): AppointmentApiResponse {
        return {
            id: appointment.id,
            veterinary: appointment.veterinary,
            day: appointment.day,
            date_appointment: appointment.date_appointment,
            reason: appointment.reason,
            reschedule: appointment.reschedule,
            state: appointment.state,
            state_pay: appointment.state_pay,
            amount: appointment.amount,
            hour_start: appointment.hour_start,
            hour_end: appointment.hour_end,
        }
    }
}