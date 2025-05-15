// src/models/Issue.ts
export interface Issue {
    id: number;
    description: string;
    issue_type: string;
    date_reported: Date; 
    status: string;
}
