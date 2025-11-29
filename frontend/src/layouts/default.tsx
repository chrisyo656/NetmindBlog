import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import TopBar from "../components/navbar";
import CardSignIn from "../components/cardsignin";

export default function DefaultLayout() {
    const location = useLocation();
    const hideSidePanels = location.pathname.startsWith("/login") || location.pathname.startsWith("/signup");

    return (
        <section id="app" className={` text-foreground bg-background relative h-screen scroll-smooth`} >
            <header className="[grid-area:header]">
                <TopBar />
            </header>
            {!hideSidePanels && (
                <aside
                    className={`
        [grid-area:aside]
          inset-y-0 left-0
          p-1 mt-1
          sm:block 
          hidden
        `}
                >
                    <CardSignIn />
                </aside>
            )}
            <main className={`[grid-area:main] overflow-hidden`}>
                <Outlet />
            </main>
            {!hideSidePanels && <div className="[grid-area:right]" />}
            <Toaster richColors />
        </section>
    );
}
