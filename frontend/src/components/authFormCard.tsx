import { useMemo, useState, type FormEvent } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Progress } from "@heroui/react";
import { toast } from "sonner";
import { type LoginPayload, type RegisterPayload } from "../services/auth";
import { Link } from "react-router-dom";
import { Eye, EyeClosed, LockKeyhole, ShieldCheck } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

export type AuthTab = "login" | "signup";

type AuthFormCardProps = {
    mode?: AuthTab;
};

type SignUpFormState = RegisterPayload & { confirmPassword: string };

const createLoginState = (): LoginPayload => ({
    userName: "",
    password: ""
});

const createSignUpState = (): SignUpFormState => ({
    name: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: ""
});

const scorePassword = (pwd: string) => {
    const checks = {
        len8: pwd.length >= 8,
        lower: /[a-z]/.test(pwd),
        upper: /[A-Z]/.test(pwd),
        number: /[0-9]/.test(pwd),
        symbol: /[!@#$%^&*()?]/.test(pwd)
    };
    const passed = Object.values(checks).filter(Boolean).length;
    const score = Math.round((passed / 5) * 100);
    const label = score < 34 ? "Débil" : score < 67 ? "Aceptable" : "Fuerte";
    return { score, label, checks };
};

function AuthFormCard({ mode = "login" }: AuthFormCardProps) {
    const isLoginMode = mode === "login";
    const [loginForm, setLoginForm] = useState<LoginPayload>(() => createLoginState());
    const [signUpForm, setSignUpForm] = useState<SignUpFormState>(() => createSignUpState());
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const loginUser = useAuthStore(state => state.login);
    const registerUser = useAuthStore(state => state.register);
    const isLoggingIn = useAuthStore(state => state.isLoggingIn);
    const isRegistering = useAuthStore(state => state.isRegistering);

    const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = await loginUser(loginForm);
        if (success) {
            setLoginForm(createLoginState());
        }
    };

    const handleSignUpSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (signUpForm.password !== signUpForm.confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        const success = await registerUser({
            name: signUpForm.name,
            lastName: signUpForm.lastName,
            userName: signUpForm.userName,
            password: signUpForm.password
        });

        if (success) {
            setSignUpForm(createSignUpState());
        }
    };

    const isLoginDisabled = !loginForm.userName || !loginForm.password;
    const passwordsMismatch =
        signUpForm.confirmPassword.length > 0 && signUpForm.confirmPassword !== signUpForm.password;
    const isSignUpDisabled =
        !signUpForm.name ||
        !signUpForm.lastName ||
        !signUpForm.userName ||
        signUpForm.password.length < 6 ||
        passwordsMismatch;

    const loginHeader = {
        title: "Bienvenido de nuevo",
        description: "Ingresa tus credenciales para continuar publicando y comentando."
    };

    const signupHeader = {
        title: "Crea tu cuenta NetmindBlog",
        description: "Comparte tu nombre, usuario y contraseña para comenzar a publicar."
    };

    const headerContent = isLoginMode ? loginHeader : signupHeader;

    const renderLoginForm = () => (
        <form className="space-y-4 pt-2" onSubmit={handleLoginSubmit}>
            <Input
                autoComplete="username"
                isRequired
                label="Nombre de usuario"
                name="username"
                type="text"
                value={loginForm.userName}
                variant="bordered"
                onValueChange={value => setLoginForm(prev => ({ ...prev, userName: value }))}
            />
            <Input
                autoComplete="current-password"
                isRequired
                label="Contraseña"
                name="password"
                type="password"
                value={loginForm.password}
                variant="bordered"
                onValueChange={value => setLoginForm(prev => ({ ...prev, password: value }))}
            />
            <Button
                className="w-full"
                color="primary"
                isDisabled={isLoginDisabled || isLoggingIn}
                isLoading={isLoggingIn}
                type="submit"
            >
                Entrar
            </Button>
        </form>
    );

    const passwordStrength = useMemo(() => scorePassword(signUpForm.password), [signUpForm.password]);

    const renderSignUpForm = () => (
        <form className="space-y-4 pt-2" onSubmit={handleSignUpSubmit}>
            <div className="flex grow gap-x-2">
                <Input
                autoComplete="name"
                isRequired
                label="Nombre completo"
                name="name"
                value={signUpForm.name}
                variant="bordered"
                onValueChange={value => setSignUpForm(prev => ({ ...prev, name: value }))}
            />
            <Input
                autoComplete="family-name"
                isRequired
                label="Apellidos"
                name="lastName"
                value={signUpForm.lastName}
                variant="bordered"
                onValueChange={value => setSignUpForm(prev => ({ ...prev, lastName: value }))}
            />
            </div>
            <Input
                autoComplete="username"
                description="Este será tu usuario público."
                isRequired
                label="Nombre de usuario"
                name="userName"
                value={signUpForm.userName}
                variant="bordered"
                onValueChange={value => setSignUpForm(prev => ({ ...prev, userName: value }))}
            />
            <div className="space-y-2">
                <Input
                    autoComplete="new-password"
                    description="Mínimo 8 caracteres, combina letras, números y símbolos."
                    isRequired
                    label="Contraseña"
                    name="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={signUpForm.password}
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
                    onValueChange={value => setSignUpForm(prev => ({ ...prev, password: value }))}
                />
                <div className="space-y-2">
                    <Progress aria-label="Fortaleza de la contraseña" className="h-1" value={passwordStrength.score} />
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                        <li className={`flex items-center gap-1 ${passwordStrength.checks.len8 ? "text-success" : "text-default-500"}`}>
                            <ShieldCheck className="h-3 w-3" /> Min 8 caracteres
                        </li>
                        <li className={`flex items-center gap-1 ${passwordStrength.checks.lower ? "text-success" : "text-default-500"}`}>
                            <ShieldCheck className="h-3 w-3" /> Minúscula
                        </li>
                        <li className={`flex items-center gap-1 ${passwordStrength.checks.upper ? "text-success" : "text-default-500"}`}>
                            <ShieldCheck className="h-3 w-3" /> Mayúscula
                        </li>
                        <li className={`flex items-center gap-1 ${passwordStrength.checks.number ? "text-success" : "text-default-500"}`}>
                            <ShieldCheck className="h-3 w-3" /> Número
                        </li>
                        <li className={`flex items-center gap-1 ${passwordStrength.checks.symbol ? "text-success" : "text-default-500"}`}>
                            <ShieldCheck className="h-3 w-3" /> Símbolo
                        </li>
                    </ul>
                </div>
            </div>
            <Input
                autoComplete="new-password"
                isInvalid={passwordsMismatch}
                errorMessage={passwordsMismatch ? "Las contraseñas deben coincidir." : undefined}
                isRequired
                label="Confirma tu contraseña"
                name="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={signUpForm.confirmPassword}
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
                onValueChange={value => setSignUpForm(prev => ({ ...prev, confirmPassword: value }))}
            />
            <Button
                className="w-full"
                color="secondary"
                isDisabled={isSignUpDisabled || isRegistering}
                isLoading={isRegistering}
                type="submit"
            >
                Crear cuenta
            </Button>
        </form>
    );

    const footerContent = isLoginMode ? (
        <p className="text-sm">
            ¿Aún no tienes cuenta?
            {" "}
            <Link className="text-primary hover:underline" to="/signup">
                Crea una ahora
            </Link>
            .
        </p>
    ) : (
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
    );

    return (
        <Card className="w-full border border-default-100 shadow-lg">
            <CardHeader className="flex flex-col gap-1">
                <p className="text-lg font-semibold text-foreground">{headerContent.title}</p>
                <p className="text-sm text-default-500">{headerContent.description}</p>
            </CardHeader>
            <Divider className="bg-default-100" />
            <CardBody >{isLoginMode ? renderLoginForm() : renderSignUpForm()}</CardBody>
            <Divider className="bg-default-100" />
            <CardFooter className="text-left">{footerContent}</CardFooter>
        </Card>
    );
}

export default AuthFormCard;
