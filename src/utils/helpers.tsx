// Formatear la fecha de manera más corta y legible
export const formatDate = (date: Date, day: string) => {
    const dateObj = new Date(date);
    return `${day.charAt(0).toUpperCase() + day.slice(1)}, ${dateObj.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short", // Mes abreviado
        year: "numeric",
    })}`;
};




export const formatDateDatePicker = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};