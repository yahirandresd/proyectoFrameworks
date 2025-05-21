// src/models/Shift.ts
export interface Shift {
    id: number;
    start_time: Date;
    end_time: Date;
    status: string;
    driver_id: number;
    motorcycle_id: number;
}
