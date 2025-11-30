import { Divider } from "@heroui/react";
import { MessageCircle } from "lucide-react";
import { useComments } from "../hooks/useComments";
import { CommentCard } from "./CommentCard";
import { CommentsSkeleton } from "./CommentsSkeleton";
import { CommentForm } from "./CommentForm";
import { CommentsEmptyState } from "./CommentsEmptyState";
import type { CommentsSectionProps } from "../types";

export function CommentsSection({ postId }: CommentsSectionProps) {
    const {
        comments,
        isLoading,
        commentText,
        setCommentText,
        handleSubmit,
        handleAuthPrompt,
        isLogged,
        isSubmitting
    } = useComments(postId);

    return (
        <div id="comments" className="space-y-6">
            <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-default-500" />
                <h2 className="text-xl font-semibold">
                    Comentarios {comments && `(${comments.length})`}
                </h2>
            </div>

            <Divider />

            <CommentForm
                commentText={commentText}
                onCommentChange={setCommentText}
                onSubmit={handleSubmit}
                onAuthPrompt={handleAuthPrompt}
                isLogged={isLogged}
                isSubmitting={isSubmitting}
            />

            <Divider />

            {isLoading ? (
                <CommentsSkeleton />
            ) : comments && comments.length > 0 ? (
                <div className="space-y-4">
                    {comments.map(comment => (
                        <CommentCard key={comment.idComment} comment={comment} variant="full" />
                    ))}
                </div>
            ) : (
                <CommentsEmptyState />
            )}
        </div>
    );
}