import {MetricApiResponse} from "./MetricApiResponse";
import {Metric} from "./Metric";

export class MetricApiMapper {
    static mapMetricsApiResponseToModel(metric: MetricApiResponse):Metric{
        return {
            total_users: metric.metrics.total_users,
            total_owners: metric.metrics.total_owners,
            total_pets: metric.metrics.total_pets,
            total_appointments: metric.metrics.total_appointments,
            total_surgeries: metric.metrics.total_surgeries,
            total_vaccinations: metric.metrics.total_vaccinations,
            total_appointment_payments: metric.metrics.total_appointment_payments,
            total_surgerie_payments: metric.metrics.total_surgerie_payments,
            total_vaccination_payments: metric.metrics.total_vaccination_payments,
            appointments_schedule: metric.metrics.appointments_schedule,
            appointments_reschedule: metric.metrics.appointments_reschedule,
            appointments_statepayment_pending: metric.metrics.appointments_statepayment_pending,
            appointments_statepayment_partial: metric.metrics.appointments_statepayment_partial,
            appointments_statepayment_complete: metric.metrics.appointments_statepayment_complete,
        };
    }
}