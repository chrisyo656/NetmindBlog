import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import type { ImageUploadState } from "../types";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export function useImageUpload() {
    const [imageState, setImageState] = useState<ImageUploadState>({});

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Por favor selecciona un archivo de imagen válido");
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            toast.error("La imagen no debe superar los 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String.split(",")[1];

            setImageState({
                imageFile: file,
                imagePreview: base64String,
                bannerImageBase64: base64Data,
                imageMimeType: file.type
            });
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImageState({});
    };

    const resetImage = () => {
        setImageState({});
    };

    return {
        imageState,
        handleImageChange,
        handleRemoveImage,
        resetImage
    };
}