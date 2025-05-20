import api from "../interceptors/axiosInterceptor";
import { Order } from "../models/Order";

// Obtener todos los pedidos
export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await api.get("/orders");
        return response.data;
    } catch (error) {
        console.error("Error al obtener pedidos", error);
        return [];
    }
};

// Obtener un pedido por ID
export const getOrderById = async (id: number): Promise<Order | null> => {
    try {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error("Pedido no encontrado", error);
        return null;
    }
};

// Crear un nuevo pedido
export const createOrder = async (order: Omit<Order, "id">): Promise<Order | null> => {
    try {
        const response = await api.post("/orders", order);
        return response.data;
    } catch (error) {
        console.error("Error al crear pedido", error);
        return null;
    }
};

// Actualizar pedido
export const updateOrder = async (id: number, order: Partial<Order>): Promise<Order | null> => {
    try {
        const response = await api.put(`/orders/${id}`, order);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar pedido", error);
        return null;
    }
};

// Eliminar pedido
export const deleteOrder = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/orders/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar pedido", error);
        return false;
    }
};
