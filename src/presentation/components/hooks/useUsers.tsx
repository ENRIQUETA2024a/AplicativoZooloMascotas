import { useEffect, useState } from "react";
import {getUsersForSuperAdmin} from "../../../actions";
import {UserDashboard} from "../../../core/dashboard/UserDashboard";


export const useUsers = () => {
    const [users, setUsers] = useState<UserDashboard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error, refreshUsers: fetchUsers };


};
