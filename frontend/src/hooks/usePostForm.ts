import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../stores/useAuthStore";
import { useAuthPromptStore } from "../stores/useAuthModalStore";
import { createPost } from "../services/posts";
import { useImageUpload } from "./useImageUpload";
import type { CreatePostPayload, PostFormFields } from "../types";

const createPostFields = (): PostFormFields => ({
    title: "",
    content: ""
});

export function usePostForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [fields, setFields] = useState<PostFormFields>(createPostFields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isLogged = useAuthStore(state => state.isLogged);
    const requestAuth = useAuthPromptStore(state => state.requestAuth);

    const { imageState, handleImageChange, handleRemoveImage, resetImage } = useImageUpload();

    const updateField = <K extends keyof PostFormFields>(field: K, value: PostFormFields[K]) => {
        setFields(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isLogged) {
            requestAuth("Debes iniciar sesión para crear un post o comentar.");
            return;
        }

        setIsSubmitting(true);

        try {
            const payload: CreatePostPayload = {
                title: fields.title,
                content: fields.content,
                bannerImageBase64: imageState.bannerImageBase64 ?? '',
                imageMimeType: imageState.imageMimeType ?? ''
            };

            const response = await createPost(payload);
            console.log(response);

            // Invalidar query de posts para que se actualice la lista
            await queryClient.invalidateQueries({ queryKey: ["posts"] });

            toast.success("Post creado exitosamente");
            setFields(createPostFields());
            resetImage();
            navigate("/");
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error(error instanceof Error ? error.message : "Error al crear el post");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormDisabled = !fields.title.trim() || !fields.content.trim();

    return {
        fields,
        updateField,
        imageState,
        handleImageChange,
        handleRemoveImage,
        handleSubmit,
        isSubmitting,
        isFormDisabled
    };
}