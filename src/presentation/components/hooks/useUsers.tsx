import { useEffect, useState } from "react";
import {UserDashboard} from "../../../core";
import {getUsersForSuperAdmin} from "../../../actions";


export const useUsers = () => {
    const [users, setUsers] = useState<UserDashboard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await getUsersForSuperAdmin();
                setUsers(data);
            } catch (err) {
                setError("Error al obtener la lista de usuarios.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};
