import CardPost from "../components/cardpost";
import { usePosts } from "../hooks/usePosts";
import { PostListSkeleton } from "../components/PostListSkeleton";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";

function IndexPage() {
    const { posts, isLoading, isError, isEmpty } = usePosts();

    if (isLoading) {
        return <PostListSkeleton />;
    }

    if (isError || !posts) {
        return <ErrorState message="No se pudieron cargar los posts" />;
    }

    if (isEmpty) {
        return (
            <EmptyState
                title="No hay posts disponibles aún."
                description="¡Sé el primero en crear uno!"
            />
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