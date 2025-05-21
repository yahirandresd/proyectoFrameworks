// src/models/Order.ts
export interface Order {
    id: number;
    quantity: number; // Cantidad de productos pedidos
    total_price: Number; // Precio total del pedido
    status: string; // Estado del pedido (ej. "pendiente", "completado", etc.)
    motorcycle_id: number; // ID de la motocicleta asociada al pedido
    customer_id: number; // ID del cliente que realizó el pedido
    menu_id: number; // ID del menú asociado al pedido
}
