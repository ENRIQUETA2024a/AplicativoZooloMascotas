import {getAuthToken} from "../user/userLoginActions";
import {apiZooloMascotas} from "../../config/api/apiZooloMascotas";
import {Metric, MetricApiMapper, MetricApiResponse} from "../../core";

export const getDashboardAppMetrics = async (): Promise<Metric> => {
    try {
        //Obtenemos el token almacenado en secureStore
        const {token, userType} = await getAuthToken();
        if (userType !== "owner" && !token) {
            console.warn("No hay token disponible");
            return null; //  Retornamos para evitar que la app se rompa
        }
        //Configuramos las headers con el token
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            Accept: "application/json",
        }

        const {data} = await apiZooloMascotas.get<MetricApiResponse>(`/dashboard/metrics`, config);
        const metrics  = MetricApiMapper.mapMetricsApiResponseToModel(data);
        return metrics;
    } catch (error) {
        console.error(`❌ Error obteniendo las metricas  getDashboardAppMetrics: `, error);
        // Si el error viene de Axios, muestra la respuesta del servidor
        if (error.response) {
            console.error("📌 Código de estado:", error.response.status);
            console.error("📌 Respuesta del servidor:", error.response.data);
        } else {
            console.error("📌 Error general:", error.message);
        }
        //  Devolvemos un array vacío para evitar que la app se rompa
        return null;
    }
}