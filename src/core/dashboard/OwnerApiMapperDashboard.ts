import {OwnerApiResponseDashboard} from "./OwnerApiResponseDashboard";
import {OwnerDashboard} from "./OwnerDashboard";

export class OwnerApiMapperDashboard {
    static mapOwnerApiResponseToModel(ownerApi: OwnerApiResponseDashboard): OwnerDashboard[] {
        return ownerApi.data.map(owner =>({
            id: owner.id,
            names: owner.names,
            surnames: owner.surnames,
            type_document: owner.type_document,
            n_document: owner.n_document,
            email: owner.email,
            phone: owner.phone,
            address: owner.address,
            city: owner.city,
            emergency_contact: owner.emergency_contact,
            created_at: owner.created_at,
            updated_at: owner.updated_at,
            deleted_at: owner.deleted_at,
        }));
    }

    static mapOwnerModelToApiResponse(owner: OwnerDashboard) {
        return {
            id: owner.id,
            names: owner.names,
            surnames: owner.surnames,
            type_document: owner.type_document,
            n_document: owner.n_document,
            email: owner.email || null,
            phone: owner.phone,
            address: owner.address || null,
            city: owner.city || null,
            emergency_contact: owner.emergency_contact || null,
            created_at: owner.created_at || null,
            updated_at: owner.updated_at || null,
            deleted_at: owner.deleted_at || null,
        }
    }
}