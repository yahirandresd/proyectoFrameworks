// src/models/Order.ts
export interface Order {
    id: number;
    quantity: number; // Cantidad de productos pedidos
    total_price: number; // Precio total del pedido
    status: string; // Estado del pedido (ej. "pendiente", "completado", etc.)
}
