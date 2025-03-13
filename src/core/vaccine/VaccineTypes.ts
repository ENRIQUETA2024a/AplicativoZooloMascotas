// Estado de la cirugia
export type vaccineState = "Pendiente" | "Cancelado" | "Atendido" ;

//Tipo de procedimiento
export type vaccineOutside = "Internación" | "Ambulatorio";

// Estado de reprogramación
export type rescheduleStatus = "Programado" | "Reprogramado";

// Estado del pago
export type paymentState = "Pendiente" | "Parcial" | "Completo" ;