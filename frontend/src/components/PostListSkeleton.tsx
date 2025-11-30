import { Card, CardBody, CardFooter } from "@heroui/react";

export function PostCardSkeleton() {
    return (
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
}

type PostListSkeletonProps = {
    count?: number;
};

export function PostListSkeleton({ count = 2 }: PostListSkeletonProps) {
    return (
        <div className="space-y-6 p-4">
            {Array.from({ length: count }).map((_, i) => (
                <PostCardSkeleton key={i} />
            ))}
        </div>
    );
}