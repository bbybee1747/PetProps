export interface Pet {
    id: number; 
    name: string; 
    age: string; 
    gender: string; 
    species: string;
    breed: {
        primary: string;
        secondary: string | null; 
        mixed: boolean; 
    };
    photos: {
        small: string;
        medium: string; 
        large: string;
        full: string;
    }[];
    description: string; 
    contact: {
        email: string | null; 
        phone: string | null; 
        address: {
            address1: string | null; 
            address2: string | null;
            city: string | null; 
            state: string | null; 
            postcode: string | null; 
        };
    };
    status: string; 
}
