import {useLoginStore} from "../../../actions/owners/ownerLoginState";
import {useState, useEffect} from "react";
import {getOwnerPets} from "../../../actions/owners/ownerPetsActions";
import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {MyCustomLayout} from "../../components/ui/MyCustomLayout";

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



    return (
        <MyCustomLayout>
            <Text>Mascotas de {owner?.names}</Text>
            <Text> {JSON.stringify(pets)} </Text>
        </MyCustomLayout>

    );

}