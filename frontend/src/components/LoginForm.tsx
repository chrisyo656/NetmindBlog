import { Button, Input } from "@heroui/react";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginForm() {
    const { form, updateField, handleSubmit, isLoggingIn, isDisabled } = useLoginForm();

    return (
        <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
            <Input
                autoComplete="username"
                isRequired
                label="Nombre de usuario"
                name="username"
                type="text"
                value={form.userName}
                variant="bordered"
                onValueChange={value => updateField("userName", value)}
            />
            <Input
                autoComplete="current-password"
                isRequired
                label="Contraseña"
                name="password"
                type="password"
                value={form.password}
                variant="bordered"
                onValueChange={value => updateField("password", value)}
            />
            <Button
                className="w-full"
                color="primary"
                isDisabled={isDisabled || isLoggingIn}
                isLoading={isLoggingIn}
                type="submit"
            >
                Entrar
            </Button>
        </form>
    );
}