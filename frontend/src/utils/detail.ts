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

export const readErrorDetail = async (response: Response): Promise<unknown> => {
    try {
        const data = await response.json();
        return data?.message ?? data;
    } catch {
        return response.statusText || response.status;
    }
};

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
