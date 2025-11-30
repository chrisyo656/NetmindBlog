import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Eye, EyeClosed, LockKeyhole } from "lucide-react";
import { useSignUpForm } from "../hooks/useSignUpForm";
import { PasswordStrengthIndicator } from "./PasswordIndicator";

export function SignUpForm() {
    const {
        form,
        updateField,
        handleSubmit,
        isRegistering,
        isDisabled,
        passwordStrength,
        passwordsMismatch
    } = useSignUpForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
            <div className="flex grow gap-x-2">
                <Input
                    autoComplete="name"
                    isRequired
                    label="Nombre completo"
                    name="name"
                    value={form.name}
                    variant="bordered"
                    onValueChange={value => updateField("name", value)}
                />
                <Input
                    autoComplete="family-name"
                    isRequired
                    label="Apellidos"
                    name="lastName"
                    value={form.lastName}
                    variant="bordered"
                    onValueChange={value => updateField("lastName", value)}
                />
            </div>
            <Input
                autoComplete="username"
                description="Este será tu usuario público."
                isRequired
                label="Nombre de usuario"
                name="userName"
                value={form.userName}
                variant="bordered"
                onValueChange={value => updateField("userName", value)}
            />
            <div className="space-y-2">
                <Input
                    autoComplete="new-password"
                    description="Mínimo 8 caracteres, combina letras, números y símbolos."
                    isRequired
                    label="Contraseña"
                    name="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    variant="bordered"
                    startContent={<LockKeyhole className="h-4 w-4 opacity-70" />}
                    endContent={
                        <button
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            className="outline-none"
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    }
                    onValueChange={value => updateField("password", value)}
                />
                <PasswordStrengthIndicator strength={passwordStrength} />
            </div>
            <Input
                autoComplete="new-password"
                isInvalid={passwordsMismatch}
                errorMessage={passwordsMismatch ? "Las contraseñas deben coincidir." : undefined}
                isRequired
                label="Confirma tu contraseña"
                name="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                variant="bordered"
                startContent={<LockKeyhole className="h-4 w-4 opacity-70" />}
                endContent={
                    <button
                        aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
                        className="outline-none"
                        type="button"
                        onClick={() => setShowConfirm(prev => !prev)}
                    >
                        {showConfirm ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                }
                onValueChange={value => updateField("confirmPassword", value)}
            />
            <Button
                className="w-full"
                color="secondary"
                isDisabled={isDisabled || isRegistering}
                isLoading={isRegistering}
                type="submit"
            >
                Crear cuenta
            </Button>
        </form>
    );
}