export type UserRole = "admin" | "lead" | "developer";

export interface Project {
    id: number;
    name: string;
    status: string;
    createdAt: string;
}