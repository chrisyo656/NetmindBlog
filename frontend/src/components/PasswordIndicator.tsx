import { Progress } from "@heroui/react";
import { ShieldCheck } from "lucide-react";
import type { PasswordIndicatorProps } from "../types";

export function PasswordStrengthIndicator({ strength }: PasswordIndicatorProps) {
    return (
        <div className="space-y-2">
            <Progress
                aria-label="Fortaleza de la contraseña"
                className="h-1"
                value={strength.score}
            />
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                <li className={`flex items-center gap-1 ${strength.checks.len8 ? "text-success" : "text-default-500"}`}>
                    <ShieldCheck className="h-3 w-3" /> Min 8 caracteres
                </li>
                <li className={`flex items-center gap-1 ${strength.checks.lower ? "text-success" : "text-default-500"}`}>
                    <ShieldCheck className="h-3 w-3" /> Minúscula
                </li>
                <li className={`flex items-center gap-1 ${strength.checks.upper ? "text-success" : "text-default-500"}`}>
                    <ShieldCheck className="h-3 w-3" /> Mayúscula
                </li>
                <li className={`flex items-center gap-1 ${strength.checks.number ? "text-success" : "text-default-500"}`}>
                    <ShieldCheck className="h-3 w-3" /> Número
                </li>
                <li className={`flex items-center gap-1 ${strength.checks.symbol ? "text-success" : "text-default-500"}`}>
                    <ShieldCheck className="h-3 w-3" /> Símbolo
                </li>
            </ul>
        </div>
    );
}