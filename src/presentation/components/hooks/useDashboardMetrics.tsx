import { useState, useEffect } from "react";
import {getDashboardAppMetrics} from "../../../actions";

export const useDashboardMetrics = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMetrics = async () => {
        setLoading(true);
        try {
            const data = await getDashboardAppMetrics();
            setMetrics(data);
        } catch (err) {
            setError("Error al obtener métricas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMetrics();
    }, []);

    return { metrics, loading, error, refreshMetrics: fetchMetrics };
};
