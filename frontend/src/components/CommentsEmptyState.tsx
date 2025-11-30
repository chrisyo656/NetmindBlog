import { Card, CardBody } from "@heroui/react";
import { MessageCircle } from "lucide-react";

export function CommentsEmptyState() {
    return (
        <Card className="border border-default-100 shadow-sm">
            <CardBody className="py-12 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-default-300" />
                <p className="text-default-500">No hay comentarios aún</p>
                <p className="text-sm text-default-400 mt-1">¡Sé el primero en comentar!</p>
            </CardBody>
        </Card>
    );
}