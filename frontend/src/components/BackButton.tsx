import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { BackButtonProps } from "../types";

export function BackButton({ to = "/", label = "Volver" }: BackButtonProps) {
    const navigate = useNavigate();

    return (
        <Button
            variant="light"
            startContent={<ArrowLeft className="h-4 w-4" />}
            onPress={() => navigate(to)}
        >
            {label}
        </Button>
    );
}