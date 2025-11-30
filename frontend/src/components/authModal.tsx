import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useAuthPromptStore } from "../stores/useAuthModalStore";
import logo from '../assets/react.svg'

export function AuthModal() {
    const navigate = useNavigate();
    const isOpen = useAuthPromptStore(state => state.isOpen);
    const reason = useAuthPromptStore(state => state.reason);
    const closePrompt = useAuthPromptStore(state => state.closePrompt);

    const goTo = (path: "/login" | "/signup") => {
        closePrompt();
        navigate(path);
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={open => {
                if (!open) closePrompt();
            }}
            isDismissable={true}
            size="2xl"
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Necesitas una cuenta
                            <Divider/>
                        </ModalHeader>
                        <ModalBody>
                            <picture className="flex justify-center">
                            <source media="(max-width: 640px)" srcSet={logo} />
                            <img src={logo} width={100} alt="React Logo" />
                        </picture>
                            <p className="text-sm text-default-600 r">
                                {reason ?? "Para continuar debes iniciar sesión o crear una cuenta en NetmindBlog."}
                            </p>

                            <div className="flex flex-col gap-4 max-w-md mx-auto w-full mt-4">
                                <Button color="primary" onPress={() => goTo("/login")}>
                                    Iniciar sesión
                                </Button>
                                <Button variant="light" onPress={() => goTo("/signup")}>
                                    Crear cuenta
                                </Button>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
