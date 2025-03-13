import {paymentState, rescheduleStatus, surgeryOutside} from "./SurgeryTypes";

export interface SurgeryApiResponse {
    veterinary:       string;
    day:              string;
    date_appointment: Date;
    surgerie_type:    string;
    medical_notes:    string;
    state:            surgeryOutside;
    outside:          surgeryOutside;
    reschedule:       rescheduleStatus;
    amount:           number;
    state_pay:        paymentState;
}
