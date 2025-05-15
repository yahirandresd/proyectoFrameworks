import api from "../interceptors/axiosInterceptor";
import { Restaurant } from "../models/Restaurant"; // Ensure you have this model defined

// Get all restaurants
export const getRestaurants = async (): Promise<Restaurant[]> => {
    try {
        const response = await api.get("/Restaurants");
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants", error);
        return [];
    }
};

// Get a restaurant by ID
export const getRestaurantById = async (id: number): Promise<Restaurant | null> => {
    try {
        const response = await api.get(`/Restaurants/${id}`);
        return response.data;
    } catch (error) {
        console.error("Restaurant not found", error);
        return null;
    }
};

// Create a new restaurant
export const createRestaurant = async (restaurant: Omit<Restaurant, "id">): Promise<Restaurant | null> => {
    try {
        const response = await api.post("/Restaurants", restaurant);
        return response.data;
    } catch (error) {
        console.error("Error creating restaurant", error);
        return null;
    }
};

// Update restaurant
export const updateRestaurant = async (id: number, restaurant: Partial<Restaurant>): Promise<Restaurant | null> => {
    try {
        const response = await api.put(`/Restaurants/${id}`, restaurant);
        return response.data;
    } catch (error) {
        console.error("Error updating restaurant", error);
        return null;
    }
};

// Delete restaurant
export const deleteRestaurant = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/Restaurants/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting restaurant", error);
        return false;
    }
};