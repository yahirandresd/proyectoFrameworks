// src/models/Product.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number; // Se recomienda usar "number" para valores decimales
    category: string;
}
