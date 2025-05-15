import api from "../interceptors/axiosInterceptor";
import { Shift } from "../models/Shift";  // Asumiendo que el modelo Shift está definido

// Obtener todos los turnos
export const getShifts = async (): Promise<Shift[]> => {
    try {
        const response = await api.get("/Shifts");  // Endpoint para obtener todos los turnos
        return response.data;
    } catch (error) {
        console.error("Error al obtener turnos", error);
        return [];
    }
};

// Obtener un turno por ID
export const getShiftById = async (id: number): Promise<Shift | null> => {
    try {
        const response = await api.get(`/Shifts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Turno no encontrado", error);
        return null;
    }
};

// Crear un nuevo turno
export const createShift = async (shift: Omit<Shift, "id">): Promise<Shift | null> => {
    try {
        const response = await api.post("/Shifts", shift);
        return response.data;
    } catch (error) {
        console.error("Error al crear turno", error);
        return null;
    }
};

// Actualizar turno
export const updateShift = async (id: number, shift: Partial<Shift>): Promise<Shift | null> => {
    try {
        const response = await api.put(`/Shifts/${id}`, shift);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar turno", error);
        return null;
    }
};

// Eliminar turno
export const deleteShift = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/Shifts/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar turno", error);
        return false;
    }
};
