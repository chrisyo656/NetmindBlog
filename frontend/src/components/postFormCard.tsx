import { useState, type FormEvent, type ChangeEvent } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Textarea } from "@heroui/react";
import { toast } from "sonner";
import { type CreatePostPayload, createPost } from "../services/posts";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { ImagePlus, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

type PostFormState = CreatePostPayload & {
    imageFile?: File;
    imagePreview?: string;
};

const createPostState = (): PostFormState => ({
    title: "",
    content: "",
    bannerImageBase64: undefined,
    imageMimeType: undefined,
    imageFile: undefined,
    imagePreview: undefined
});

function PostFormCard() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [postForm, setPostForm] = useState<PostFormState>(() => createPostState());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isLogged = useAuthStore(state => state.isLogged);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Por favor selecciona un archivo de imagen válido");
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error("La imagen no debe superar los 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String.split(",")[1];

            setPostForm(prev => ({
                ...prev,
                imageFile: file,
                imagePreview: base64String,
                bannerImageBase64: base64Data,
                imageMimeType: file.type
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setPostForm(prev => ({
            ...prev,
            imageFile: undefined,
            imagePreview: undefined,
            bannerImageBase64: undefined,
            imageMimeType: undefined
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isLogged) {
            toast.error("Debes iniciar sesión para crear un post");
            navigate("/login");
            return;
        }

        setIsSubmitting(true);

        try {
            const payload: CreatePostPayload = {
                title: postForm.title,
                content: postForm.content,
                bannerImageBase64: postForm.bannerImageBase64 ?? '',
                imageMimeType: postForm.imageMimeType ?? ''
            };

            const response = await createPost(payload);
            console.log(response)

            // Invalidar query de posts para que se actualice la lista
            await queryClient.invalidateQueries({ queryKey: ["posts"] });

            toast.success("Post creado exitosamente");
            setPostForm(createPostState());
            navigate("/");
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error(error instanceof Error ? error.message : "Error al crear el post");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormDisabled = !postForm.title.trim() || !postForm.content.trim();

    return (
        <Card className="w-full border border-default-100 shadow-lg">
            <CardHeader className="flex flex-col gap-1">
                <p className="text-lg font-semibold text-foreground">Crear Nuevo Post</p>
                <p className="text-sm text-default-500">Comparte tus ideas con la comunidad NetmindBlog</p>
            </CardHeader>
            <Divider className="bg-default-100" />
            <CardBody>
                <form className="space-y-4 pt-2" onSubmit={handleSubmit} id="post-form">
                    <Input
                        isRequired
                        label="Título del post"
                        name="title"
                        placeholder="Escribe un título atractivo..."
                        value={postForm.title}
                        variant="bordered"
                        onValueChange={value => setPostForm(prev => ({ ...prev, title: value }))}
                    />
                    <Textarea
                        isRequired
                        label="Contenido"
                        name="content"
                        placeholder="Escribe el contenido de tu post..."
                        value={postForm.content}
                        variant="bordered"
                        minRows={8}
                        onValueChange={value => setPostForm(prev => ({ ...prev, content: value }))}
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-default-700">
                            Imagen de portada (opcional)
                        </label>

                        {postForm.imagePreview ? (
                            <div className="relative w-full">
                                <img
                                    src={postForm.imagePreview}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-lg border-2 border-default-200"
                                />
                                <Button
                                    isIconOnly
                                    color="danger"
                                    size="sm"
                                    variant="solid"
                                    className="absolute top-2 right-2"
                                    onPress={handleRemoveImage}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
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
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </div>

                    <Button
                        className="w-full"
                        color="primary"
                        isDisabled={isFormDisabled || isSubmitting}
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Publicar Post
                    </Button>
                </form>
            </CardBody>
            <Divider className="bg-default-100" />
            <CardFooter className="text-left">
                <p className="text-xs text-default-500">
                    Tu post será visible públicamente una vez publicado.
                </p>
            </CardFooter>
        </Card>
    );
}

export default PostFormCard;
