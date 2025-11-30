import { usePost } from "../hooks/usePost";
import { PostPageSkeleton } from "../components/PostPageSkeleton";
import { PostErrorState } from "../components/PostErrorState";
import { BackButton } from "../components/BackButton";
import { PostHeader } from "../components/PostHeader";
import { PostContent } from "../components/PostContent";

function PostPage() {
    const { post, isLoading, isError, error } = usePost();

    if (isLoading) {
        return <PostPageSkeleton />;
    }

    if (isError || !post) {
        const message = error instanceof Error ? error.message : "No pudimos cargar el post.";
        return <PostErrorState message={message} />;
    }

    return (
        <div className="space-y-6 p-4">
            <BackButton />
            <div className="border border-default-100 shadow-lg">
                <PostHeader post={post} />
                <PostContent content={post.content} postId={post.idPost} />
            </div>
        </div>
    );
}

export default PostPage;