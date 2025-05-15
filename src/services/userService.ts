import api from "../interceptors/axiosInterceptor";
import { User } from "../models/User";

// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios", error);
        return [];
    }
};

// Obtener un usuario por ID
export const getUserById = async (id: number): Promise<User | null> => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el usuario", error);
        return null;
    }
};

// Crear un nuevo usuario
export const createUser = async (user: Omit<User, "id">): Promise<User | null> => {
    try {
        const response = await api.post("/", user);
        return response.data;
    } catch (error) {
        console.error("Error al crear usuario", error);
        return null;
    }
};

// Actualizar usuario
export const updateUser = async (id: number, user: Partial<User>): Promise<User | null> => {
    try {
        const response = await api.put(`/${id}`, user);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar usuario", error);
        return null;
    }
};

// Eliminar usuario
export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar usuario", error);
        return false;
    }
};
