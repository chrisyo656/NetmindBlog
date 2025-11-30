import { Divider, User } from "@heroui/react";
import { formatDateLong } from "../utils/date";
import type { PostHeaderProps } from "../types";

export function PostHeader({ post }: PostHeaderProps) {
    return (
        <>
            {post.bannerImageBase64 && (
                <div className="relative w-full overflow-hidden bg-default-100">
                    <img
                        alt={post.title}
                        className="h-full w-full max-h-[400px] object-contain"
                        src={`data:image/jpeg;base64,${post.bannerImageBase64}`}
                    />
                </div>
            )}

            <div className="flex flex-col items-start gap-y-7 p-8">
                <User
                    name={post.authorFullName}
                    description={formatDateLong(post.createdAt)}
                    classNames={{
                        name: "text-lg font-medium",
                        description: "text-default-500"
                    }}
                />
                <h1 className="font-roboto text-5xl font-bold text-foreground">
                    {post.title}
                </h1>
            </div>

            <Divider className="bg-default-100" />
        </>
    );
}