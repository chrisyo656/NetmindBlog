import { create } from "zustand";

type AuthModalState = {
    isOpen: boolean;
    reason?: string;
    requestAuth: (reason?: string) => void;
    closePrompt: () => void;
};

export const useAuthPromptStore = create<AuthModalState>(set => ({
    isOpen: false,
    reason: undefined,

    requestAuth: reason => {
        set({
            isOpen: true,
            reason
        });
    },

    closePrompt: () => {
        set({
            isOpen: false,
            reason: undefined
        });
    }
}));