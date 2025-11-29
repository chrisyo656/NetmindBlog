import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { Link } from "react-router-dom";

function CardSignIn() {
    return (
        <Card className="w-full border border-default-100 shadow-sm">
            <CardBody className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-default-400">NetmindBlog</p>
                <p className="text-lg font-bold text-foreground">
                    Somos una comunidad de miles de <span className="text-primary">creadores</span> y desarrolladores.
                </p>
                <p className="text-sm text-default-500">
                    Comparte tus aprendizajes, mantente al día con la industria y crece tu carrera.
                </p>
                <Button as={Link} color="primary" to="/signup" variant="bordered">
                    Create account
                </Button>
            </CardBody>
            <CardFooter className="justify-center text-sm">
                <Link className="text-default-600 hover:text-primary" to="/login">
                    Log in
                </Link>
            </CardFooter>
        </Card>
    );
}

export default CardSignIn;
