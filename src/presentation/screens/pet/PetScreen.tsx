import {Text, View} from "react-native";
import {getOwnerPets, useLoginStore} from "../../../actions";
import React, {useEffect, useState} from "react";
import {MyActivityIndicator} from "../../components/ui/MyActivityIndicator";
import {PetList} from "../../components/pet/PetList";

export const PetScreen = () =>{
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
            <PetList pets={pets} />
        </View>

    );
}