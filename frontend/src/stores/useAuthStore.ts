import { create } from "zustand";
import { toast } from "sonner";
import {
    fetchCurrentUser,
    login as loginRequest,
    logoutUser,
    register as registerRequest,
    verifySession,
} from "../services/auth";
import type { AuthState } from "../types";
import { isNetworkLike } from "../utils/network";

export const useAuthStore = create<AuthState>(set => ({
    profile: null,
    isLogged: false,
    initializing: true,
    networkDown: false,
    isLoggingIn: false,
    isRegistering: false,

    login: async payload => {
        set({ isLoggingIn: true, networkDown: false });
        try {
            await loginRequest(payload);
            const profile = await fetchCurrentUser();
            set({
                profile,
                isLogged: true
            });
            toast.success(`Bienvenido de nuevo, ${profile.fullName}`);
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
            await registerRequest(payload);
            const profile = await fetchCurrentUser();
            set({
                profile,
                isLogged: true
            });
            toast.success(`¡Bienvenido ${profile.fullName}!`);
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

    logout: async () => {
        try {
            await logoutUser();
        } catch (error) {
            if (!isNetworkLike(error)) {
                toast.error(error instanceof Error ? error.message : "No se pudo cerrar sesión");
            }
        } finally {
            set({
                profile: null,
                isLogged: false,
                networkDown: false
            });
        }
    },

    hydrate: async () => {
        try {
            const session = await verifySession();

            if (session) {
                set({
                    profile: {
                        idUser: session.idUser,
                        userName: session.userName,
                        fullName: session.fullName
                    },
                    isLogged: true,
                    initializing: false,
                    networkDown: false
                });
            } else {
                // No hay sesión activa, esto es normal
                set({
                    profile: null,
                    isLogged: false,
                    initializing: false,
                    networkDown: false
                });
            }
        } catch (error) {
            // Solo errores de red inesperados llegan aquí
            if (isNetworkLike(error)) {
                set({ networkDown: true, initializing: false });
            } else {
                set({
                    profile: null,
                    isLogged: false,
                    initializing: false
                });
            }
        }
    }
}));
