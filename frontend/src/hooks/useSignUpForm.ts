import { useState, useMemo, type FormEvent } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../stores/useAuthStore";
import { scorePassword } from "../utils/password";
import type { SignUpFormState } from "../types";

const createSignUpState = (): SignUpFormState => ({
    name: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: ""
});

export function useSignUpForm() {
    const [form, setForm] = useState<SignUpFormState>(createSignUpState);
    const registerUser = useAuthStore(state => state.register);
    const isRegistering = useAuthStore(state => state.isRegistering);

    const updateField = <K extends keyof SignUpFormState>(field: K, value: SignUpFormState[K]) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const passwordStrength = useMemo(() => scorePassword(form.password), [form.password]);

    const passwordsMismatch =
        form.confirmPassword.length > 0 && form.confirmPassword !== form.password;

    const isDisabled =
        !form.name ||
        !form.lastName ||
        !form.userName ||
        form.password.length < 6 ||
        passwordsMismatch;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        const success = await registerUser({
            name: form.name,
            lastName: form.lastName,
            userName: form.userName,
            password: form.password
        });

        if (success) {
            setForm(createSignUpState());
        }
    };

    return {
        form,
        updateField,
        handleSubmit,
        isRegistering,
        isDisabled,
        passwordStrength,
        passwordsMismatch
    };
}