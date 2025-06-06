// src/services/motorcycleInfringementService.ts
import apiMock from "../interceptors/axiosMock";
import { MotorcycleInfringement } from "../models/MotorcycleInfringement";

const BASE_URL = "/motorcycle-infringement";

export const createMotorcycleInfringement = async (data: MotorcycleInfringement) => {
  try {
    const response = await apiMock.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating MotorcycleInfringement", error);
    throw error;
  }
};

export const updateMotorcycleInfringement = async (id: number, data: MotorcycleInfringement) => {
  try {
    const response = await apiMock.put(`${BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating MotorcycleInfringement", error);
    throw error;
  }
};
