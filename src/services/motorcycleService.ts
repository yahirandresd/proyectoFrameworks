import api from "../interceptors/axiosInterceptor";
import { Motorcycle } from "../models/Motorcycle";

// Obtener todas las motocicletas
export const getMotorcycles = async (): Promise<Motorcycle[]> => {
    try {
        const response = await api.get("/Motorcycles");
        return response.data;
    } catch (error) {
        console.error("Error al obtener motocicletas", error);
        return [];
    }
};

// Obtener una motocicleta por ID
export const getMotorcycleById = async (id: number): Promise<Motorcycle | null> => {
    try {
        const response = await api.get(`/Motorcycles/${id}`);
        return response.data;
    } catch (error) {
        console.error("Motocicleta no encontrada", error);
        return null;
    }
};

// Crear una nueva motocicleta
export const createMotorcycle = async (motorcycle: Omit<Motorcycle, "id">): Promise<Motorcycle | null> => {
    try {
        const response = await api.post("/Motorcycles", motorcycle);
        return response.data;
    } catch (error) {
        console.error("Error al crear motocicleta", error);
        return null;
    }
};

// Actualizar motocicleta
export const updateMotorcycle = async (id: number, motorcycle: Partial<Motorcycle>): Promise<Motorcycle | null> => {
    try {
        const response = await api.put(`/Motorcycles/${id}`, motorcycle);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar motocicleta", error);
        return null;
    }
};

// Eliminar motocicleta
export const deleteMotorcycle = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/Motorcycles/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar motocicleta", error);
        return false;
    }
};
