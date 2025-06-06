import api from "../interceptors/axiosMock";
import { Infringement } from "../models/Infringements";


export const getInfringements = async (): Promise<Infringement[]> => {
    try {
        const response = await api.get("/infringements");
        return response.data;
    } catch (error) {
        console.error("Error fetching infringements", error);
        return [];
    }
}

export const getInfringementById = async (id: number): Promise<Infringement | null> => {
    try {
        const response = await api.get(`/infringements/${id}`);
        return response.data;
    } catch (error) {
        console.error("Infringement not found", error);
        return null;
    }
};