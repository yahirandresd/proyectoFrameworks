import api from "../interceptors/axiosInterceptor";
import { Driver } from "../models/Driver";

// Obtener todos los drivers
export const getDrivers = async (): Promise<Driver[]> => {
    try {
        const response = await api.get("/drivers");
        return response.data;
    } catch (error) {
        console.error("Error al obtener drivers", error);
        return [];
    }
};

// Obtener un driver por ID
export const getDriverById = async (id: number): Promise<Driver | null> => {
    try {
        const response = await api.get(`/drivers/${id}`);
        return response.data;
    } catch (error) {
        console.error("Driver no encontrado", error);
        return null;
    }
};

// Crear un nuevo driver
export const createDriver = async (driver: Omit<Driver, "id">): Promise<Driver | null> => {
    try {
        const response = await api.post("/drivers", driver);
        return response.data;
    } catch (error) {
        console.error("Error al crear driver", error);
        return null;
    }
};

// Actualizar driver
export const updateDriver = async (id: number, driver: Partial<Driver>): Promise<Driver | null> => {
    try {
        const response = await api.put(`/drivers/${id}`, driver);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar driver", error);
        return null;
    }
};

// Eliminar driver
export const deleteDriver = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/drivers/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar driver", error);
        return false;
    }
};
