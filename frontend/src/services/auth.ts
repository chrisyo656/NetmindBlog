export type LoginPayload = {
    userName: string;
    password: string;
};

export type RegisterPayload = {
    name: string;
    lastName: string;
    userName: string;
    password: string;
};

export type AuthResponse = {
    idUser: number;
    userName: string;
    fullName: string;
    token: string;
};

type LoginServiceSuccess = {
    access_token?: string;
    token?: string;
    fullName?: string;
    idUser?: number;
    userName?: string;
    data?: {
        token?: string;
        fullName?: string;
        idUser?: number;
        userName?: string;
    };
};


type RegisterResponse = AuthResponse & {
    detail?: string;
};

export const BASE_API_URL: string = import.meta.env.VITE_API_URL ?? "";

export const buildUrl = (path: string) => {
    // Si no hay BASE_API_URL, usar ruta relativa para que Vite proxy funcione
    if (!BASE_API_URL) {
        return path.startsWith("/") ? path : `/${path}`;
    }
    return `${BASE_API_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
};

const mapAuthResponse = (response: LoginServiceSuccess): AuthResponse => ({
    idUser: response.idUser ?? response.data?.idUser ?? 0,
    userName: response.userName ?? response.data?.userName ?? "",
    fullName: response.fullName ?? response.data?.fullName ?? response.userName ?? "Usuario",
    token: response.access_token ?? response.token ?? response.data?.token ?? ""
});

export const readErrorDetail = async (response: Response): Promise<unknown> => {
    try {
        const data = await response.json();
        return data?.message ?? data;
    } catch {
        return response.statusText || response.status;
    }
};

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

export async function verifySession(): Promise<AuthResponse | null> {
    try {
        const response = await fetch(buildUrl("/api/Auth/verify"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json();
            return mapAuthResponse(data);
        }

        return null;
    } catch {
        return null;
    }
}

export async function processDetail(detail: unknown): Promise<string> {
    if (typeof detail === "number") {
        return mapDetailCode(detail);
    }

    if (typeof detail !== "string") {
        return "Error desconocido";
    }

    if (detail === "token is expired") {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return "Token expirado";
    }

    const numeric = Number(detail);
    if (!Number.isNaN(numeric)) {
        return mapDetailCode(numeric);
    }

    if (detail.includes("[")) {
        const inside = detail.split("[")[1]?.split("]")[0];
        const code = Number(inside);
        if (!Number.isNaN(code)) {
            return mapDetailCode(code);
        }
    }

    return detail;
}

const mapDetailCode = (code: number) => {
    switch (code) {
        case 23000:
            return "Este elemento tiene relaciones existentes en la base de datos";
        case 1062:
            return "Este elemento ya existe en la base de datos";
        case 1406:
            return "Valor demasiado grande para la columna";
        default:
            return `Error (${code})`;
    }
};
