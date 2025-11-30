import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle } from "@heroui/navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/react.svg'
import MenuUser from "./menuUser";
import { Button } from "@heroui/react";
import { useAuthStore } from "../stores/useAuthStore";
import { useShallow } from "zustand/shallow";

export type OpcionOV = { OperadorID: number };

export default function TopBar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { isLogged, profile } = useAuthStore(
        useShallow(state => ({
            isLogged: state.isLogged,
            profile: state.profile
        }))
    );


    return (
        <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} >
            <NavbarContent className="flex sm:hidden basis-1/5 sm:basis-full " justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                <NavbarBrand>
                    <Link aria-label="Volver al inicio" className="inline-flex items-center" to="/">
                        <picture>
                            <source media="(max-width: 640px)" srcSet={logo} />
                            <img src={logo} width={100} alt="React Logo" />
                        </picture>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarBrand className="hidden sm:flex">
                <Link aria-label="Volver al inicio" className="inline-flex items-center gap-2 text-lg font-semibold" to="/">
                    <img alt="React Logo" className="h-10 w-10" src={logo} />
                    <span className="text-foreground">NetmindBlog</span>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="hidden sm:flex gap-2">
                    {isLogged && profile ? (
                        <>
                            <Button as={Link} color="primary" to="/newPost" variant="bordered">
                                Nuevo Post
                            </Button>
                            <MenuUser profile={profile} />
                        </>
                    ) : (
                        <div className="flex gap-2">
                            <Button as={Link} to="/login" variant="light">
                                Log in
                            </Button>
                            <Button as={Link} color="primary" to="/signup" variant="bordered">
                                Create Account
                            </Button>
                        </div>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

