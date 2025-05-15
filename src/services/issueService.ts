import api from "../interceptors/axiosInterceptor";
import { Issue } from "../models/Issue";

// Obtener todos los issues
export const getIssues = async (): Promise<Issue[]> => {
    try {
        const response = await api.get("/Issues");
        return response.data;
    } catch (error) {
        console.error("Error al obtener issues", error);
        return [];
    }
};

// Obtener un issue por ID
export const getIssueById = async (id: number): Promise<Issue | null> => {
    try {
        const response = await api.get(`/Issues/${id}`);
        return response.data;
    } catch (error) {
        console.error("Issue no encontrado", error);
        return null;
    }
};

// Crear un nuevo issue
export const createIssue = async (issue: Omit<Issue, "id">): Promise<Issue | null> => {
    try {
        const response = await api.post("/Issues", issue);
        return response.data;
    } catch (error) {
        console.error("Error al crear issue", error);
        return null;
    }
};

// Actualizar issue
export const updateIssue = async (id: number, issue: Partial<Issue>): Promise<Issue | null> => {
    try {
        const response = await api.put(`/Issues/${id}`, issue);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar issue", error);
        return null;
    }
};

// Eliminar issue
export const deleteIssue = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/Issues/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar issue", error);
        return false;
    }
};
