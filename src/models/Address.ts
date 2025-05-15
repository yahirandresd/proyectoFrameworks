// src/models/Address.ts
export interface Address {
    id: number;
    street: string; // Calle
    city: string; // Ciudad
    state: string; // Estado
    postal_code: string; // Código postal
    additional_info: string; // Información adicional
}
