import type { AuthResponse, LoginPayload, LoginServiceSuccess, RegisterPayload, RegisterResponse, UserProfile } from "../types";
import { processDetail, readErrorDetail } from "../utils/detail";
import { buildUrl } from "../utils/url";

const mapAuthResponse = (response: LoginServiceSuccess): AuthResponse => ({
    idUser: response.idUser ?? response.data?.idUser ?? 0,
    userName: response.userName ?? response.data?.userName ?? "",
    fullName: response.fullName ?? response.data?.fullName ?? response.userName ?? "Usuario",
    token: response.access_token ?? response.token ?? response.data?.token ?? ""
});

export async function login(payload: LoginPayload): Promise<AuthResponse> {
    if (!payload.userName || !payload.password) {
        throw new Error("Ingresa tu correo y contraseña.");
    }

    try {
        const response = await fetch(buildUrl("/api/Auth/login"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ username: payload.userName, password: payload.password })
        });

        if (response.ok) {
            const data = (await response.json()) as LoginServiceSuccess;
            return mapAuthResponse({ ...data, userName: data.userName ?? 'Inicio exitoso'});
        }

        const detail = await readErrorDetail(response);
        const message = await processDetail(detail);
        throw new Error(message);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(message);
    }

}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
        const response = await fetch(buildUrl("/api/Auth/register"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(payload)
        });

        if (response.status === 200) {
            const data = (await response.json()) as RegisterResponse;
            return mapAuthResponse(data);
        }

        const fetchProcessed = await readErrorDetail(response);
        const message = await processDetail(fetchProcessed);
        throw new Error(message);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(message);
    }
}

export async function fetchCurrentUser(): Promise<UserProfile> {
    const response = await fetch(buildUrl("/api/Auth/me"), {
        method: "GET",
        credentials: "include"
    });

    if (response.ok) {
        return response.json() as Promise<UserProfile>;
    }

    const detail = await readErrorDetail(response);
    const message = await processDetail(detail);
    throw new Error(message);
}

export async function logoutUser(): Promise<void> {
    const response = await fetch(buildUrl("/api/Auth/logout"), {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        const detail = await readErrorDetail(response);
        const message = await processDetail(detail);
        throw new Error(message);
    }
}

export async function verifySession(): Promise<UserProfile | null> {
    try {
        const response = await fetch(buildUrl("/api/Auth/me"), {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            return response.json() as Promise<UserProfile>;
        }

        // 401 o 403 significa que no hay sesión activa, esto es normal
        if (response.status === 401 || response.status === 403) {
            return null;
        }

        // Otros errores también devuelven null silenciosamente
        return null;
    } catch {
        // Errores de red u otros problemas
        return null;
    }
}

