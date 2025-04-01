import {useEffect, useState} from "react";
import {UserDashboard, UserFormI} from "../../../../core/dashboard/UserDashboard";
import {
    deleteUser,
    getUserById,
    getUsersForSuperAdmin,
    searchUsers,
    toggleActivateUser,
    updateUser
} from "../../../../actions";
import {Alert} from "react-native";
import {debounce} from "lodash";

export const useUserActions = () => {
    const [users, setUsers] = useState<UserDashboard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    //Creamos los estados iniciales del formulario
    const initialFormState: UserFormI = {
        name: "",
        surname: "",
        email: "",
        phone: "",
        role: "",
    }
    //Creamos un useState de tipo UserFormI
    const [form, setForm] = useState<UserFormI>(initialFormState);

    //Reseteamos el formulario
    const resetForm = () => {
        setForm(initialFormState);
        setSelectedUser(null);
        setIsEditMode(false);
    }

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const userList = await getUsersForSuperAdmin();
            setUsers(userList);
            setError(null);
        } catch (error) {
            setError("Error al cargar los usuarios");
        } finally {
            setLoading(false);
        }
    }

    //Guardar o actualizar usuario
    const handleSaveUsers = async () => {
        if (!form.name || !form.email || !form.phone || !form.surname) {
            Alert.alert(
                "Campos Incompletos",
                "Por favor, completa los campos obligatorios: Nombre, Apellidos, Email, Celular."
            );
            return;
        }
        setLoading(true);
        try {
            if (isEditMode && selectedUser)
                await updateUser(selectedUser.id, form)

            await fetchUsers();
            resetForm();
            setModalVisible(false);
        } catch (error) {
            setError(`Error al ${isEditMode ? "actualizar" : "crear"} el usuario`);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteUser = async (id: number) => {
        Alert.alert("Eliminando Usuario" //Titulo
            , "¿Estás seguro de eliminar este usuario?",//Mensaje
            [
                {
                    text: "Cancelar", //Boton Cancelar
                    style: "cancel", //Estilo predeterminado para cancelar
                },
                {
                    text: "Eliminar", //Boton eliminar
                    style: "destructive", //Estilo destructivo (rojo)
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await deleteUser(id); //LLamar a la fucnion para eliminar
                            await fetchUsers();//Refrescamos la lista
                        } catch (err) {
                            setError("Error al eliminar el usuario")
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ])
    }

    const handleEditUser = async (id: number) => {
        try{
            const user = await getUserById(id)
            setSelectedUser(user)
            setForm({
                name: user.name,
                surname: user.surname,
                email: user.email,
                phone: user.phone,
                role: user.name ,
            })
            setIsEditMode(true);
            setModalVisible(true);
        }
        catch(err){
            setError("Error al cargar los detalles de los usuarios");
        }
    }

    const handleToggleActivate=(id:number,isActive:boolean)=>{
        Alert.alert(
            isActive ? "Activar Usuario" : "Desactivar Usuario",
            `¿Estás seguro de que quieres ${isActive ? "desactivar" : "activar"} esta mascota?`,
            [
                {text: "Cancelar", style: "cancel",},
                {
                    text: isActive ? "Desactivar" : "Activar",
                    style: "default",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const success = await toggleActivateUser(id, isActive);
                            if (success) {
                                await fetchUsers();
                                Alert.alert("Éxito", `Usuario ${isActive ? "desactivado" : "activado"} correctamente`);
                            } else {
                                Alert.alert("Error", "No se pudo cambiar el estado del usuario");
                            }
                        } catch (err) {
                            setError("Error al actualizar el estado del usuario");
                        } finally {
                            setLoading(false);
                        }
                    }
                },
            ])
    }


    const handleSearch = async () => {
        if (!searchQuery) {
            Alert.alert("Búsqueda Inválida", "Por favor, ingresa un término de búsqueda");
            return;
        }
        if (searchQuery.length < 3) {
            // alert("El término de búsqueda debe tener al menos 3 caracteres");
            return;
        }

        setLoading(true);
        setError(null); // Limpiar errores anteriores
        try {
            const users = await searchUsers(searchQuery);
            setUsers(users.length > 0 ? users : []);
            if (users.length === 0) {
                setError("No se encontraron resultados");
            }
        } catch (error) {
            setError("Error al realizar la búsqueda");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const debouncedSearch = debounce(() => {
            if (searchQuery === "") {
                fetchUsers();
            } else {
                handleSearch();
            }
        }, 500); // Retraso de 500ms
        debouncedSearch();
        return () => {
            debouncedSearch.cancel(); // Cancelar el debounce al desmontar el componente
        };
    }, [searchQuery]);


    return {
        //acciones
        fetchUsers,
        handleSaveUsers,
        handleDeleteUser,
        handleEditUser,
        handleToggleActivate,

        //form
        resetForm,
        //setStates
        setForm,
        setModalVisible,
        setSearchQuery,
        handleSearch,
        //States
        isEditMode,
        users,
        loading,
        error,
        modalVisible,
        form,
        searchQuery,
    }
}