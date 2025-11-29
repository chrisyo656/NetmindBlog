import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export function useAuthHydration() {
    const hydrate = useAuthStore(state => state.hydrate);
    const initializing = useAuthStore(state => state.initializing);

    useEffect(() => {
        if (initializing) {
            void hydrate();
        }
    }, [hydrate, initializing]);

    return { initializing };
}
