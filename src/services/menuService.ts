import api from "../interceptors/axiosInterceptor";
import { Menu } from "../models/Menu";

// Obtener todos los menús
export const getMenus = async (): Promise<Menu[]> => {
    try {
        const response = await api.get("/menus");
        return response.data;
    } catch (error) {
        console.error("Error al obtener menús", error);
        return [];
    }
};

// Obtener un menú por ID (viewMenu)
export const viewMenu = async (id: number): Promise<Menu | null> => {
  try {
    const response = await api.get(`/menus/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el menú:", error);
    return null;
  }
};


// Obtener un menú por ID
export const getMenuById = async (id: number): Promise<Menu | null> => {
    try {
        const response = await api.get(`/menus/${id}`);
        return response.data;
    } catch (error) {
        console.error("Menú no encontrado", error);
        return null;
    }
};

// Crear un nuevo menú
export const createMenu = async (menu: Omit<Menu, "id">): Promise<Menu | null> => {
    try {
        const response = await api.post("/menus", menu);
        return response.data;
    } catch (error) {
        console.error("Error al crear menú", error);
        return null;
    }
};

// Actualizar menú
export const updateMenu = async (id: number, menu: Partial<Menu>): Promise<Menu | null> => {
    try {
        const response = await api.put(`/menus/${id}`, menu);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar menú", error);
        return null;
    }
};

// Eliminar menú
export const deleteMenu = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/menus/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar menú", error);
        return false;
    }
};
