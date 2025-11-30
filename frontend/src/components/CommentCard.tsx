import { Avatar, User } from "@heroui/react";
import { formatDate } from "../utils/date";
import type { CommentCardProps } from "../types";

export function CommentCard({ comment, variant = "full" }: CommentCardProps) {
    if (variant === "compact") {
        return (
            <div className="flex gap-x-2">
                <Avatar name={comment.authorFullName} isBordered size="sm" />
                <div className="bg-default-100 rounded-small p-2 w-full">
                    <div className="flex gap-x-2 mb-1 items-center">
                        <p className="font-semibold text-sm">{comment.authorFullName}</p>
                        <p className="text-xs text-default-500">
                            {formatDate(comment.commentedAt ?? comment.createdAt)}
                        </p>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-3">
            <User
                name={comment.authorFullName}
                avatarProps={{
                    isBordered: true,
                    name: comment.authorFullName,
                    className: 'text-text1'
                }}
                description={`@${comment.authorUserName}`}
                classNames={{
                    name: "text-sm font-medium",
                    description: "text-xs text-default-500"
                }}
            />
            <p className="text-sm text-foreground whitespace-pre-wrap pl-12">
                {comment.content}
            </p>
        </div>
    );
}