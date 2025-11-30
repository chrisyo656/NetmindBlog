import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import { Link } from "react-router-dom";
import type { AuthFormCardProps } from "../types";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

const AUTH_CONFIG = {
    login: {
        title: "Bienvenido de nuevo",
        description: "Ingresa tus credenciales para continuar publicando y comentando.",
        footer: (
            <p className="text-sm">
                ¿Aún no tienes cuenta?{" "}
                <Link className="text-primary hover:underline" to="/signup">
                    Crea una ahora
                </Link>
                .
            </p>
        )
    },
    signup: {
        title: "Crea tu cuenta NetmindBlog",
        description: "Comparte tu nombre, usuario y contraseña para comenzar a publicar.",
        footer: (
            <p className="text-xs text-default-500">
                Al continuar aceptas nuestros{" "}
                <a className="text-primary hover:underline" href="/terminos">
                    términos y condiciones
                </a>{" "}
                y la{" "}
                <a className="text-primary hover:underline" href="/privacidad">
                    política de privacidad
                </a>
                .
            </p>
        )
    }
} as const;

function AuthFormCard({ mode = "login" }: AuthFormCardProps) {
    const config = AUTH_CONFIG[mode];

    return (
        <Card className="w-full border border-default-100 shadow-lg">
            <CardHeader className="flex flex-col gap-1">
                <p className="text-lg font-semibold text-foreground">{config.title}</p>
                <p className="text-sm text-default-500">{config.description}</p>
            </CardHeader>
            <Divider className="bg-default-100" />
            <CardBody>
                {mode === "login" ? <LoginForm /> : <SignUpForm />}
            </CardBody>
            <Divider className="bg-default-100" />
            <CardFooter className="text-left">{config.footer}</CardFooter>
        </Card>
    );
}

export default AuthFormCard;