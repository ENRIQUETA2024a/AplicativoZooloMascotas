import {View} from "react-native";
import {getOwnerPets, useUserLoginStore} from "../../../actions";
import React, {useEffect, useState} from "react";
import {PetList} from "../../components/pet/PetList";
import {MyActivityIndicator} from "../../components";

export const PetScreen = () =>{
    const {user} = useUserLoginStore();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPets = async () => {
            if (!user) return;
            const petList = await getOwnerPets(user.id);
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