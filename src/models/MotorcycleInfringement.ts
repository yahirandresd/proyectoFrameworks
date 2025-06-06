// src/models/MotorcycleInfringement.ts
export interface MotorcycleInfringement {
  motorcycle_id: number;
  infringement_ids: number[];
  date: string; // formato ISO, ej: "2025-05-21T00:00:00.000Z"
}
