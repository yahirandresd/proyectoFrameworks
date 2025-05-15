import api from "../interceptors/axiosInterceptor";
import { Product } from "../models/Product";

// Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get("/Products");
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos", error);
        return [];
    }
};

// Obtener un producto por ID
export const getProductById = async (id: number): Promise<Product | null> => {
    try {
        const response = await api.get(`/Products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Producto no encontrado", error);
        return null;
    }
};

// Crear un nuevo producto
export const createProduct = async (product: Omit<Product, "id">): Promise<Product | null> => {
    try {
        const response = await api.post("/Products", product);
        return response.data;
    } catch (error) {
        console.error("Error al crear producto", error);
        return null;
    }
};

// Actualizar producto
export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product | null> => {
    try {
        const response = await api.put(`/Products/${id}`, product);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar producto", error);
        return null;
    }
};

// Eliminar producto
export const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/Products/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar producto", error);
        return false;
    }
};
