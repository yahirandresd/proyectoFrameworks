import api from "../interceptors/axiosInterceptor";
import { Customer } from "../models/Customer";

// Obtener todos los clientes
export const getCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await api.get("/Customers");
        return response.data;
    } catch (error) {
        console.error("Error al obtener clientes", error);
        return [];
    }
};

// Obtener un cliente por ID
export const getCustomerById = async (id: number): Promise<Customer | null> => {
    try {
        const response = await api.get(`/Customers/${id}`);
        return response.data;
    } catch (error) {
        console.error("Cliente no encontrado", error);
        return null;
    }
};

// Crear un nuevo cliente
export const createCustomer = async (customer: Omit<Customer, "id">): Promise<Customer | null> => {
    try {
        const response = await api.post("/Customers", customer);
        return response.data;
    } catch (error) {
        console.error("Error al crear cliente", error);
        return null;
    }
};

// Actualizar cliente
export const updateCustomer = async (id: number, customer: Partial<Customer>): Promise<Customer | null> => {
    try {
        const response = await api.put(`/Customers/${id}`, customer);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar cliente", error);
        return null;
    }
};

// Eliminar cliente
export const deleteCustomer = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/Customers/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar cliente", error);
        return false;
    }
};
