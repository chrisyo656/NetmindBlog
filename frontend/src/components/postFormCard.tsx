import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Textarea } from "@heroui/react";
import { usePostForm } from "../hooks/usePostForm";
import { ImageUploadArea } from "./ImageUploadArea";

function PostFormCard() {
    const {
        fields,
        updateField,
        imageState,
        handleImageChange,
        handleRemoveImage,
        handleSubmit,
        isSubmitting,
        isFormDisabled
    } = usePostForm();

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
                        value={fields.title}
                        variant="bordered"
                        onValueChange={value => updateField("title", value)}
                    />
                    <Textarea
                        isRequired
                        label="Contenido"
                        name="content"
                        placeholder="Escribe el contenido de tu post..."
                        value={fields.content}
                        variant="bordered"
                        minRows={8}
                        onValueChange={value => updateField("content", value)}
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-default-700">
                            Imagen de portada (opcional)
                        </label>
                        <ImageUploadArea
                            imagePreview={imageState.imagePreview}
                            onImageChange={handleImageChange}
                            onRemoveImage={handleRemoveImage}
                        />
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
