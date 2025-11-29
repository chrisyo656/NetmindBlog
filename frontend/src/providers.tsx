import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useHref, useNavigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils/queryClient";

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}

export function Provider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    return (
        <HeroUIProvider navigate={navigate} useHref={useHref}>
            <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>

                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>

            </NextThemesProvider>

        </HeroUIProvider>
    );
}
