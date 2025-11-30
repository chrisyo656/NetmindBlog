import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getComments, createComment } from "../services/posts";
import { useAuthStore } from "../stores/useAuthStore";
import { useAuthPromptStore } from "../stores/useAuthModalStore";

export function useComments(postId: number) {
    const [commentText, setCommentText] = useState("");
    const queryClient = useQueryClient();
    const isLogged = useAuthStore(state => state.isLogged);
    const requestAuth = useAuthPromptStore(state => state.requestAuth);

    const { data: comments, isLoading } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => getComments(postId),
        staleTime: 1000 * 60 * 5
    });

    const createCommentMutation = useMutation({
        mutationFn: (content: string) => createComment(postId, { idPost: postId, content }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            queryClient.invalidateQueries({ queryKey: ["post", String(postId)] });
            setCommentText("");
            toast.success("Comentario publicado");
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Error al publicar comentario");
        }
    });

    const handleSubmit = () => {
        if (!isLogged) {
            requestAuth("Inicia sesión para agregar un comentario a este post.");
            return;
        }

        if (!commentText.trim()) {
            toast.error("El comentario no puede estar vacío");
            return;
        }

        createCommentMutation.mutate(commentText);
    };

    const handleAuthPrompt = () => {
        if (!isLogged) {
            requestAuth("Inicia sesión para agregar un comentario a este post.");
        }
    };

    return {
        comments,
        isLoading,
        commentText,
        setCommentText,
        handleSubmit,
        handleAuthPrompt,
        isLogged,
        isSubmitting: createCommentMutation.isPending,
        isEmpty: comments?.length === 0
    };
}