import api from "../interceptors/axiosInterceptor";
import { Address } from "../models/Address"; // Ensure the file "../models/Address.ts" exists and exports 'Address'

// Obtener todas las direcciones
export const getAddresses = async (): Promise<Address[]> => {
    try {
        const response = await api.get("/addresses");
        return response.data;
    } catch (error) {
        console.error("Error al obtener direcciones", error);
        return [];
    }
};

// Obtener una dirección por ID
export const getAddressById = async (id: number): Promise<Address | null> => {
    try {
        const response = await api.get(`/addresses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Dirección no encontrada", error);
        return null;
    }
};

// Crear una nueva dirección
export const createAddress = async (address: Omit<Address, "id">): Promise<Address | null> => {
    try {
        const response = await api.post("/addresses", address);
        return response.data;
    } catch (error) {
        console.error("Error al crear dirección", error);
        return null;
    }
};

// Actualizar dirección
export const updateAddress = async (id: number, address: Partial<Address>): Promise<Address | null> => {
    try {
        const response = await api.put(`/addresses/${id}`, address);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar dirección", error);
        return null;
    }
};

// Eliminar dirección
export const deleteAddress = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/addresses/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar dirección", error);
        return false;
    }
};
