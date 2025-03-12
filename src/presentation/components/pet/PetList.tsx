import {List} from "@ui-kitten/components";
import {Pet} from "../../../core/pet/Pet";
import {PetCard} from "./PetCard";

interface Props {
    pets: Pet[];
}

export const PetList = ({pets}: Props) => {

    return (
        <List
            data={pets}
            numColumns={1}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item}) => <PetCard pet={item}/>}
        />
    )
}