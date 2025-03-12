import {Pet} from "../../../core/pet/Pet";
import {StyleSheet} from "react-native";
import {Button, Card} from "@ui-kitten/components";
import {PetPhoto} from "./PetPhoto";
import {StackNavigationProp} from "@react-navigation/stack";
import {MyRootStackScreens} from "../../navigation/MyRootStackScreens";
import {useNavigation} from "@react-navigation/native";

type NavigationProps = StackNavigationProp<MyRootStackScreens, "PetDetailsScreen">;

interface Props {
    pet: Pet;
}

export const PetCard = ({pet}: Props) => {
    const navigation = useNavigation<NavigationProps>();

    return (
        <Card style={styles.cardStyle} status="success">
            <PetPhoto uri={pet.photo} style={{flex: 1, width: "100%", height: 150}}/>
            <Button
                style={styles.button}
                appearance='outline'
                status='info'
                size='medium'
                onPress={() => navigation.navigate("PetDetailsScreen", {idPet: pet.id})}
            >{pet.name}</Button>
        </Card>
    )
}
const styles = StyleSheet.create({
    cardStyle: {
        flex: 1,
        margin: 10,
        borderRadius: 20,
        marginHorizontal: 20,
        width: "75%",
        alignSelf: "center", //
    },
    button: {
        margin: 2,
        alignSelf: "center",
    },
});
