import {SurgeryApiResponse} from "./SurgeryApiResponse";
import {Surgery} from "./Surgery";


export class SurgeryApiMapper {
    static mapApiResponseToModel(surgery: SurgeryApiResponse): Surgery {
        return {
            veterinary: surgery.veterinary,
            day: surgery.day,
            date_appointment: surgery.date_appointment,
            surgerie_type: surgery.surgerie_type,
            medical_notes: surgery.medical_notes,
            state: surgery.state,
            outside: surgery.outside,
            reschedule: surgery.reschedule,
            amount: surgery.amount,
            state_pay: surgery.state_pay,
        }
    }
}