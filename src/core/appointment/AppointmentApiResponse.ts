import {appointmentState, paymentState, rescheduleStatus} from "./AppointmentTypes";

export interface AppointmentApiResponse {
    id:               number;
    veterinary:       string;
    day:              string;
    date_appointment: Date;
    reason:           string;
    reschedule :      rescheduleStatus;
    state:            appointmentState;
    state_pay:        paymentState;
    amount:           number;
    hour_start:       string;
    hour_end:         string;
}