import {OwnerApiResponse} from "./OwnerApiResponse";
import {Owner} from "./Owner";

export const OwnerApiMapper = (data: OwnerApiResponse
) => {

    const token = data.token;
    const owner: Owner
        = {
        id: data.owner.id,
        names: data.owner.names,
        surnames: data.owner.surnames,
        type_document: data.owner.type_document,
        n_document: data.owner.n_document,
        email: data.owner.email,
        phone: data.owner.phone,
        address: data.owner.address,
        city: data.owner.city,
        emergency_contact: data.owner.emergency_contact,
        avatar: "",
    };
    const role = undefined;
    return {
        userAccessed: owner,
        userToken: token,
        userRole: role,
    }
}
