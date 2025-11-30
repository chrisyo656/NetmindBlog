import { Divider } from "@heroui/react";
import { CommentsSection } from "./CommentsSection";
import type { PostContentProps } from "../types";

export function PostContent({ content, postId }: PostContentProps) {
    return (
        <div className="flex flex-col grow gap-2 px-8 pb-8">
            <div className="prose prose-lg max-w-none">
                <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
                    {content}
                </p>
            </div>
            <Divider className="bg-default-100" />
            <CommentsSection postId={postId} />
        </div>
    );
}
