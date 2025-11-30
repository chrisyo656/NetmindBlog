import { Button, Textarea } from "@heroui/react";
import { Send } from "lucide-react";
import type { CommentFormProps } from "../types";

export function CommentForm({
    commentText,
    onCommentChange,
    onSubmit,
    onAuthPrompt,
    isLogged,
    isSubmitting
}: CommentFormProps) {
    return (
        <div className="space-y-4">
            <Textarea
                placeholder={isLogged ? "Escribe tu comentario..." : "Inicia sesión para comentar"}
                value={commentText}
                onValueChange={onCommentChange}
                onClick={onAuthPrompt}
                minRows={3}
                maxRows={8}
                variant="bordered"
                isReadOnly={!isLogged}
                classNames={{
                    input: !isLogged ? "cursor-pointer" : ""
                }}
            />
            <div className="flex justify-end">
                <Button
                    color="primary"
                    startContent={<Send className="h-4 w-4" />}
                    onPress={onSubmit}
                    isLoading={isSubmitting}
                    isDisabled={!isLogged || !commentText.trim()}
                >
                    Publicar comentario
                </Button>
            </div>
        </div>
    );
}