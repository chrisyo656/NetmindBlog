import { create } from "zustand";
import { toast } from "sonner";
import { login as loginRequest, register as registerRequest, verifySession, type LoginPayload, type RegisterPayload } from "../services/auth";

const AUTH_PROFILE_KEY = "netmindblog:profile";

type StoredProfile = {
    idUser: number;
    userName: string;
    fullName: string;
};

type AuthState = {
    profile: StoredProfile | null;
    isLogged: boolean;
    initializing: boolean;
    networkDown: boolean;
    isLoggingIn: boolean;
    isRegistering: boolean;
    login: (payload: LoginPayload) => Promise<boolean>;
    register: (payload: RegisterPayload) => Promise<boolean>;
    logout: () => void;
    hydrate: () => void;
};

const isBrowser = () => typeof window !== "undefined";

const readStoredProfile = (): StoredProfile | null => {
    if (!isBrowser()) {
        return null;
    }

    try {
        const profileRaw = window.localStorage.getItem(AUTH_PROFILE_KEY);
        return profileRaw ? (JSON.parse(profileRaw) as StoredProfile) : null;
    } catch {
        return null;
    }
};

const persistProfile = (profile: StoredProfile) => {
    if (!isBrowser()) return;
    window.localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(profile));
};

const clearStoredProfile = () => {
    if (!isBrowser()) return;
    window.localStorage.removeItem(AUTH_PROFILE_KEY);
};

const isNetworkLike = (error: unknown) => {
    if (error instanceof TypeError) return true;
    const message = typeof error === "object" && error !== null ? String((error as { message?: string }).message ?? "") : "";
    return /Failed to fetch|NetworkError|ECONNREFUSED|ERR_CONNECTION|ERR_NETWORK/i.test(message);
};

const initialProfile = readStoredProfile();

export const useAuthStore = create<AuthState>(set => ({
    profile: initialProfile,
    isLogged: Boolean(initialProfile),
    initializing: true,
    networkDown: false,
    isLoggingIn: false,
    isRegistering: false,

    login: async payload => {
        set({ isLoggingIn: true, networkDown: false });
        try {
            const response = await loginRequest(payload);
            const profile = {
                idUser: response.idUser,
                userName: response.userName,
                fullName: response.fullName
            };
            persistProfile(profile);
            set({
                profile,
                isLogged: true
            });
            toast.success(`Bienvenido de nuevo, ${response.fullName}`);
            return true;
        } catch (error) {
            if (isNetworkLike(error)) {
                set({ networkDown: true });
                toast.error("Sin conexión con el servidor");
            } else {
                const message = error instanceof Error ? error.message : "Error al iniciar sesión";
                toast.error(message);
            }
            return false;
        } finally {
            set({ isLoggingIn: false, initializing: false });
        }
    },

    register: async payload => {
        set({ isRegistering: true, networkDown: false });
        try {
            const response = await registerRequest(payload);
            const profile = {
                idUser: response.idUser,
                userName: response.userName,
                fullName: response.fullName
            };
            persistProfile(profile);
            set({
                profile,
                isLogged: true
            });
            toast.success(`¡Bienvenido ${response.fullName}!`);
            return true;
        } catch (error) {
            if (isNetworkLike(error)) {
                set({ networkDown: true });
                toast.error("Sin conexión con el servidor");
            } else {
                const message = error instanceof Error ? error.message : "No pudimos crear tu cuenta";
                toast.error(message);
            }
            return false;
        } finally {
            set({ isRegistering: false, initializing: false });
        }
    },

    logout: () => {
        clearStoredProfile();
        set({
            profile: null,
            isLogged: false,
            networkDown: false
        });
    },

    hydrate: async () => {
        const storedProfile = readStoredProfile();

        // Si hay perfil guardado, verificar la sesión con el servidor
        if (storedProfile) {
            try {
                const sessionData = await verifySession();
                if (sessionData) {
                    // Sesión válida, actualizar el perfil por si cambió
                    const profile = {
                        idUser: sessionData.idUser,
                        userName: sessionData.userName,
                        fullName: sessionData.fullName
                    };
                    persistProfile(profile);
                    set({
                        profile,
                        isLogged: true,
                        initializing: false
                    });
                    return;
                }
            } catch (error) {
                // Error al verificar, limpiar sesión
                clearStoredProfile();
            }
        }

        // No hay perfil o sesión inválida
        set({
            profile: null,
            isLogged: false,
            initializing: false
        });
    }
}));
