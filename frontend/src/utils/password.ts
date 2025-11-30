import type { PasswordStrength } from "../types";

export const scorePassword = (pwd: string): PasswordStrength => {
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