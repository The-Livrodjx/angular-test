export interface User {
    id: string,
    name: string,
    email: string,
    address: [{
        id: string,
        street: string,
        city: string,
        state: string,
        zipCode: string
    }],
    contacts: [{
        id: string,
        type: string,
        contact: string
    }]

}
