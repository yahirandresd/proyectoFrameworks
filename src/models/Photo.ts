// src/models/Photo.ts
export interface Photo {
    id: number;
    image_url: string;
    caption: string;
    taken_at: Date; 
    issue_id: number; // ID de la issue asociada a la foto
}
