import { Button } from "@heroui/react";
import { ImagePlus, X } from "lucide-react";
import type { ImageUploadAreaProps } from "../types";

export function ImageUploadArea({ imagePreview, onImageChange, onRemoveImage }: ImageUploadAreaProps) {
    if (imagePreview) {
        return (
            <div className="relative w-full">
                <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border-2 border-default-200"
                />
                <Button
                    isIconOnly
                    color="danger"
                    size="sm"
                    variant="solid"
                    className="absolute top-2 right-2"
                    onPress={onRemoveImage}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        );
    }

    return (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-default-300 rounded-lg cursor-pointer hover:bg-default-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="h-10 w-10 mb-3 text-default-400" />
                <p className="mb-2 text-sm text-default-500">
                    <span className="font-semibold">Click para subir</span> o arrastra y suelta
                </p>
                <p className="text-xs text-default-400">PNG, JPG, GIF (MAX. 5MB)</p>
            </div>
            <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onImageChange}
            />
        </label>
    );
}