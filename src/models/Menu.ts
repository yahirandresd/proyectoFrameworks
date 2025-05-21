// src/models/Menu.ts
export interface Menu {
    id: number;
    price: number; // Usamos "number" para precios con decimales
    availability: boolean; // Disponibilidad del menú
    restaurant_id?: number;
    product_id?: number;
}
