import { Button, Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "./BackButton";
import type { PostErrorStateProps } from "../types";

export function PostErrorState({ message = "No pudimos cargar el post." }: PostErrorStateProps) {
    const navigate = useNavigate();

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-4">
            <BackButton />
            <Card className="border border-default-100 shadow-lg">
                <CardBody className="space-y-4 py-12 text-center">
                    <p className="text-lg text-red-500">{message}</p>
                    <Button color="primary" variant="flat" onPress={() => navigate("/")}>
                        Ir al inicio
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}