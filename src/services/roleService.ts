import api from "../interceptors/axiosInterceptor";
import { Role } from "../models/Role";

// Obtener todos los roles
export const getRoles = async (): Promise<Role[]> => {
    try {
        const response = await api.get("/roles");
        return response.data;
    } catch (error) {
        console.error("Error al obtener roles", error);
        return [];
    }
};

// Obtener un rol por ID
export const getRoleById = async (id: number): Promise<Role | null> => {
    try {
        const response = await api.get(`/roles/${id}`);
        return response.data;
    } catch (error) {
        console.error("Rol no encontrado", error);
        return null;
    }
};

// Crear un nuevo rol
export const createRole = async (role: Omit<Role, "id">): Promise<Role | null> => {
    try {
        const response = await api.post("/roles", role);
        return response.data;
    } catch (error) {
        console.error("Error al crear rol", error);
        return null;
    }
};

// Actualizar rol
export const updateRole = async (id: number, role: Partial<Role>): Promise<Role | null> => {
    try {
        const response = await api.put(`/roles/${id}`, role);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar rol", error);
        return null;
    }
};

// Eliminar rol
export const deleteRole = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/roles/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar rol", error);
        return false;
    }
};
