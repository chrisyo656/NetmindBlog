import { useState, type FormEvent } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import type { LoginPayload } from "../types";

const createLoginState = (): LoginPayload => ({
    userName: "",
    password: ""
});

export function useLoginForm() {
    const [form, setForm] = useState<LoginPayload>(createLoginState);
    const loginUser = useAuthStore(state => state.login);
    const isLoggingIn = useAuthStore(state => state.isLoggingIn);

    const updateField = <K extends keyof LoginPayload>(field: K, value: LoginPayload[K]) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = await loginUser(form);
        if (success) {
            setForm(createLoginState());
        }
    };

    const isDisabled = !form.userName || !form.password;

    return {
        form,
        updateField,
        handleSubmit,
        isLoggingIn,
        isDisabled
    };
}