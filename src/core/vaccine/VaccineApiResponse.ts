import {paymentState, rescheduleStatus, vaccineOutside, vaccineState} from "./VaccineTypes";

export interface VaccineApiResponse {
    veterinary: string;         // Nombre completo del veterinario
    vaccine_names: string;      // Nombre de la vacuna
    day: string;                // Día de la cita
    date_appointment: string;   // Fecha de la cita (YYYY-MM-DD HH:MM:SS)
    next_due_date: string;      // Próxima fecha de vacunación (YYYY-MM-DD HH:MM:SS)
    reason: string;             // Razón de la vacunación
    state: vaccineState; // Estado de la cita
    outside: vaccineOutside;        // Tipo de atención
    reschedule: rescheduleStatus;     // Estado de reprogramación
    amount: number;             // Costo de la vacunación
    state_pay: paymentState; // Estado del pago
}