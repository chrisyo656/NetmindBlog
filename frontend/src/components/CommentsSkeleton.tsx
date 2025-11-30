import { Card, CardBody, Skeleton } from "@heroui/react";

export function CommentsSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map(i => (
                <Card key={i} className="border border-default-100 shadow-sm">
                    <CardBody className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-32 rounded-lg" />
                                <Skeleton className="h-2 w-24 rounded-lg" />
                            </div>
                        </div>
                        <Skeleton className="h-16 w-full rounded-lg" />
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}