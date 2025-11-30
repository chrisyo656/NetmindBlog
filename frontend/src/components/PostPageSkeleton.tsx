import { Card, CardBody, Divider, Skeleton } from "@heroui/react";

export function PostPageSkeleton() {
    return (
        <div className="mx-auto max-w-4xl space-y-6 p-4">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Card className="border border-default-100 shadow-lg">
                <Skeleton className="h-96 w-full" />
                <CardBody className="space-y-6 p-8">
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-3/4 rounded-lg" />
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32 rounded-lg" />
                                <Skeleton className="h-3 w-48 rounded-lg" />
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full rounded-lg" />
                        <Skeleton className="h-4 w-full rounded-lg" />
                        <Skeleton className="h-4 w-4/5 rounded-lg" />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}