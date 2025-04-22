import {useEffect, useState} from "react";
import {PetDashboard, PetFormI} from "../../../../core";
import {
    deletePet,
    getPetById,
    getPets,
    searchPets,
    toggleActivatePet,
    updatePet
} from "../../../../actions/pets/petActions";
import {Alert} from "react-native";
import {debounce} from "lodash";

export const usePetActions = () => {
    //Estados principales
    const [pets, setPets] = useState<PetDashboard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    //Formulario
    //Creamos los estados del formulario
    const initialFormState: PetFormI = {
        specie: "",
        name: "",
        breed: "",
        birth_date: new Date().toISOString(),
        gender: "",
        color: "",
        weight: "",
        photo: "",
        medical_notes: "",
    }
    //Creamos un useState de tipo PetFormI
    const [form, setForm] = useState<PetFormI>(initialFormState);

    //Reseteamos el formulario
    const resetForm = () => {
        setForm(initialFormState);
        setSelectedPet(null);
        setIsEditMode(false);
    }

    const fetchPets = async () => {
        setLoading(true);
        try {
            const petList = await getPets();
            setPets(petList || []);
            setError(null);
        } catch (error) {
            setError("Error al cargar las mascotas");
        } finally {
            setLoading(false);
        }
    }
// Guardar o actualizar mascota
    const handleSavePets = async () => {
        if (!form.name || !form.specie || !form.breed) {
            Alert.alert(
                "Campos Incompletos",
                "Por favor, completa los campos obligatorios: Nombre, Especie, Raza."
            );
            return;
        }
        setLoading(true);
        try {
            if (isEditMode && selectedPet)
                await updatePet(selectedPet.id, form);

            //codigo agregado
            await fetchPets();
            resetForm();
            setModalVisible(false);
            //codigo agregado
        } catch (error) {
            setError(`Error al ${isEditMode ? "actualizar" : "crear"} el dueño`);
        } finally {
            setLoading(false);
        }
    }


    // Eliminar mascota
    const handleDeletePets = async (id) => {
        Alert.alert("Eliminando Mascota" //Titulo
            , "¿Estás seguro de eliminar esta mascota?",//Mensaje
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
                            await deletePet(id); //LLamar a la fucnion para eliminar
                            await fetchPets();//Refrescamos la lista
                        } catch (err) {
                            setError("Error al eliminar la mascota")
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ])
    }

    // Editar mascota
    const handleEditPet = async (id: number) => {
        try {
            const pet = await getPetById(id);
            setSelectedPet(pet);

            setForm({
                specie: pet.specie,
                name: pet.name,
                breed: pet.breed,
                birth_date: pet.birth_date,
                gender: pet.gender,
                color: pet.color,
                weight: pet.weight.toString(),
                photo: pet.photo,
                medical_notes: pet.medical_notes || "",
            });

            setIsEditMode(true);
            setModalVisible(true);
        } catch (err) {
            console.warn('Error editing pet:', err);
            setError("Error al cargar los detalles de la mascota");
        }
    }

    // Activar/Desactivar un dueño
    const handleToggleActivate = async (id: number, isActive: boolean) => {
        Alert.alert(
            isActive ? "Activar Mascota" : "Desactivar Mascota",
            `¿Estás seguro de que quieres ${isActive ? "desactivar" : "activar"} esta mascota?`,
            [
                {text: "Cancelar", style: "cancel",},
                {
                    text: isActive ? "Desactivar" : "Activar",
                    style: "default",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const success = await toggleActivatePet(id, isActive);
                            if (success) {
                                await fetchPets();
                                Alert.alert("Éxito", `Mascota ${isActive ? "desactivada" : "activada"} correctamente`);
                            } else {
                                Alert.alert("Error", "No se pudo cambiar el estado de la mascota");
                            }
                        } catch (err) {
                            setError("Error al actualizar el estado de la mascota");
                        } finally {
                            setLoading(false);
                        }
                    }
                },
            ])
    };


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
            const pets = await searchPets(searchQuery);
            setPets(pets.length > 0 ? pets : []);
            if (pets.length === 0) {
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
                fetchPets();
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
        fetchPets,
        handleSavePets,
        handleDeletePets,
        handleEditPet,
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
        pets,
        loading,
        error,
        modalVisible,
        form,
        searchQuery,
    }

}