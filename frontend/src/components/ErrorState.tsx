import { Card, CardBody } from "@heroui/react";
import type { ErrorStateProps } from "../types";

export function ErrorState({ message = "Ocurrió un error al cargar los datos" }: ErrorStateProps) {
    return (
        <div className="p-4">
            <Card className="mx-auto w-full max-w-2xl overflow-hidden border border-default-100 shadow-lg">
                <CardBody className="space-y-4 py-6">
                    <p className="text-sm text-red-500">{message}</p>
                </CardBody>
            </Card>
        </div>
    );
}