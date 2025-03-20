
export interface MetricApiResponse {
    success: boolean;
    metrics: {
        total_users: number;
        total_owners: number;
        total_pets: number;
        total_appointments: number;
        total_surgeries: number;
        total_vaccinations: number;
        total_appointment_payments: number;
        total_surgerie_payments: number;
        total_vaccination_payments: number;
        appointments_schedule: number;
        appointments_reschedule: number;
        appointments_statepayment_pending: number;
        appointments_statepayment_partial: number;
        appointments_statepayment_complete: number;
    }
}