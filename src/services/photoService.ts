import api from "../interceptors/axiosInterceptor";
import { Photo } from "../models/Photo";

// Obtener todas las fotos
export const getPhotos = async (): Promise<Photo[]> => {
    try {
        const response = await api.get("/photos");
        return response.data;
    } catch (error) {
        console.error("Error al obtener fotos", error);
        return [];
    }
};

// Obtener una foto por ID
export const getPhotoById = async (id: number): Promise<Photo | null> => {
    try {
        const response = await api.get(`/photos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Foto no encontrada", error);
        return null;
    }
};

// Crear una nueva foto
export const createPhoto = async (photo: Omit<Photo, "id">): Promise<Photo | null> => {
    try {
        const response = await api.post("/photos", photo);
        return response.data;
    } catch (error) {
        console.error("Error al crear foto", error);
        return null;
    }
};

// Actualizar foto
export const updatePhoto = async (id: number, photo: Partial<Photo>): Promise<Photo | null> => {
    try {
        const response = await api.put(`/photos/${id}`, photo);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar foto", error);
        return null;
    }
};

// Eliminar foto
export const deletePhoto = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/photos/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar foto", error);
        return false;
    }
};
