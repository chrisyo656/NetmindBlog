import { BASE_API_URL } from "../constants";

export const buildUrl = (path: string) => {
    // Si no hay BASE_API_URL, usar ruta relativa para que Vite proxy funcione
    if (!BASE_API_URL) {
        return path.startsWith("/") ? path : `/${path}`;
    }
    return `${BASE_API_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
};