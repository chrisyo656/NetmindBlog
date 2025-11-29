import { useQuery } from "@tanstack/react-query";
import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import CardPost from "../components/cardpost";
import { getPost, type PostData } from "../services/posts";

const CardPostSkeleton = () => (
    <Card className="mx-auto w-full max-w-2xl overflow-hidden border border-default-100 shadow-lg">
        <div className="h-52 w-full animate-pulse bg-default-100" />
        <CardBody className="space-y-5 py-6">
            <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-default-100" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/5 rounded-full bg-default-100" />
                    <div className="h-4 w-3/5 rounded-full bg-default-100" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-6 w-full rounded-full bg-default-100" />
                <div className="h-4 w-4/5 rounded-full bg-default-100" />
            </div>
        </CardBody>
        <CardFooter className="py-4">
            <div className="h-10 w-full rounded-full bg-default-100" />
        </CardFooter>
    </Card>
);

type CardPostErrorProps = {
    isRetrying: boolean;
    message: string;
    onRetry: () => void;
};

const CardPostError = ({ isRetrying, message, onRetry }: CardPostErrorProps) => (
    <Card className="mx-auto w-full max-w-2xl overflow-hidden border border-default-100 shadow-lg">
        <CardBody className="space-y-4 py-6">
            <p className="text-sm text-red-500">{message}</p>
            <Button color="primary" isLoading={isRetrying} onPress={onRetry} variant="flat">
                Reintentar
            </Button>
        </CardBody>
    </Card>
);

function IndexPage() {
    const { data: posts, isLoading, isError, error, refetch, isFetching } = useQuery<PostData[]>({
        queryKey: ["posts"],
        queryFn: () => getPost(),
        staleTime: 1000 * 60 * 5
    });

    if (isLoading) {
        return (
            <div className="space-y-6 p-4">
                <CardPostSkeleton />
                <CardPostSkeleton />
            </div>
        );
    }

    if (isError || !posts) {
        const message = error instanceof Error ? error.message : "No pudimos cargar los posts.";
        return (
            <div className="p-4">
                <CardPostError isRetrying={isFetching} message={message} onRetry={() => { void refetch(); }} />
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="p-4">
                <Card className="mx-auto w-full max-w-2xl overflow-hidden border border-default-100 shadow-lg">
                    <CardBody className="py-12 text-center">
                        <p className="text-lg text-default-500">No hay posts disponibles aún.</p>
                        <p className="mt-2 text-sm text-default-400">¡Sé el primero en crear uno!</p>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-4">
            {posts.map(post => (
                <CardPost key={post.idPost} post={post} />
            ))}
        </div>
    );
}

export default IndexPage;