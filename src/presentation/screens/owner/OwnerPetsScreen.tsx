import {useLoginStore,getOwnerPets} from "../../../actions";
import React, {useState, useEffect} from "react";
import { Text, View} from "react-native";
import {PetList} from "../../components/pet/PetList";
import {MyActivityIndicator} from "../../components/ui/MyActivityIndicator";

export const OwnerPetsScreen = () => {
    const {owner} = useLoginStore();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPets = async () => {
            if (!owner) return;
            const petList = await getOwnerPets(owner.id);
            setPets(petList || []);
            setLoading(false);
        }
        fetchPets();
    }, []);

    if (loading) {
        return (
           <MyActivityIndicator />
        );
    }

    return (
        <View>
            <Text>Mascotas de {owner && owner?.names}</Text>
            <PetList pets={pets} />
        </View>

    );

}