import {
    createOwner,
    deleteOwner,
    getOwnerById,
    getOwners,
    searchOwners,
    toggleActivateOwner,
    updateOwner
} from "../../../../actions";
import {useEffect, useState} from "react";
import {Alert} from "react-native";
import {OwnerDashboard} from "../../../../core";
import { debounce } from "lodash";

export const useOwnerActions = () => {
    const [owners, setOwners] = useState<OwnerDashboard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [form, setForm] = useState({
        names: "",
        surnames: "",
        type_document: "",
        n_document: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        emergency_contact: "",
    });

    // Resetear formulario
    const resetForm = () => {
        setForm({
            names: "",
            surnames: "",
            type_document: "",
            n_document: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            emergency_contact: "",
        });
        setSelectedOwner(null);
        setIsEditMode(false);
    };

    // Cargar lista de dueños
    const fetchOwners = async () => {
        setLoading(true);
        try {
            const ownerList = await getOwners();
            setOwners(ownerList || []);
            setError(null);
        } catch (err) {
            setError("Error al cargar los dueños");
        } finally {
            setLoading(false);
        }
    };


    // Crear o actualizar dueño
    const handleSaveOwner = async () => {
        if (!form.names || !form.surnames || !form.type_document || !form.n_document || !form.phone) {
            alert("Por favor, completa los campos obligatorios: Nombres, Apellidos, Tipo de Documento, Número de Documento y Teléfono.");
            return;
        }
        setLoading(true);
        try {
            if (isEditMode) {
                await updateOwner(selectedOwner.id, form);
            } else {
                await createOwner(form);
            }
            await fetchOwners(); // Refrescar lista
            setModalVisible(false);
            resetForm();
        } catch (err) {
            setError(`Error al ${isEditMode ? "actualizar" : "crear"} el dueño`);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar dueño
    const handleDeleteOwner = async (id) => {
        Alert.alert("Eliminando Dueño" //Titulo
            , "¿Estás seguro de eliminar este dueño?",//Mensaje
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
                            await deleteOwner(id); //LLamar a la fucnion para eliminar
                            await fetchOwners();//Refrescamos la lista
                        } catch (err) {
                            setError("Error al eliminar el dueño")
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ])
    };

    // Ver detalles y preparar edición
    const handleEditOwner = async (id) => {
        try {
            const owner = await getOwnerById(id);
            setSelectedOwner(owner);
            setForm({
                names: owner.names || "",
                surnames: owner.surnames || "",
                type_document: owner.type_document || "",
                n_document: owner.n_document || "",
                email: owner.email || "",
                phone: owner.phone || "",
                address: owner.address || "",
                city: owner.city || "",
                emergency_contact: owner.emergency_contact || "",
            });
            setIsEditMode(true);
            setModalVisible(true);
        } catch (err) {
            setError("Error al cargar los detalles del dueño");
        }
    };

    // Activar/Desactivar un dueño
    const handleToggleActivate = async (id: number, isActive: boolean) => {
        Alert.alert("Activar Dueño", "¿Estas seguro de que quieres activar este dueño?",
            [
                {text: "Cancelar", style: "cancel",},
                {
                    text: "Activar", style: "default",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const success = await toggleActivateOwner(id, isActive);
                            if (success) {
                                await fetchOwners();
                                Alert.alert("Éxito", `Dueño ${isActive ? "desactivado" : "activado"} correctamente`);
                            } else {
                                Alert.alert("Error", "No se pudo cambiar el estado del dueño");
                            }
                        } catch (err) {
                            setError("Error al actualizar el estado del dueño");
                        } finally {
                            setLoading(false);
                        }
                    }
                },
            ])
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            alert("Por favor, ingresa un término de búsqueda");
            return;
        }
        if (searchQuery.length < 3) {
           // alert("El término de búsqueda debe tener al menos 3 caracteres");
            return;
        }

        setLoading(true);
        setError(null); // Limpiar errores anteriores
        try {
            const owners = await searchOwners(searchQuery);
            setOwners(owners.length > 0 ? owners : []);
            if (owners.length === 0) {
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
                fetchOwners();
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
        fetchOwners,
        handleSaveOwner,
        handleDeleteOwner,
        handleEditOwner,
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
        owners,
        loading,
        error,
        modalVisible,
        form,
        searchQuery,

    }
}