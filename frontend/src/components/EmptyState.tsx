import { Card, CardBody } from "@heroui/react";
import type { EmptyStateProps } from "../types";

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="p-4">
            <Card className="mx-auto w-full max-w-2xl overflow-hidden border border-default-100 shadow-lg">
                <CardBody className="py-12 text-center space-y-4">
                    {icon && <div className="flex justify-center">{icon}</div>}
                    <div>
                        <p className="text-lg text-default-500">{title}</p>
                        {description && <p className="mt-2 text-sm text-default-400">{description}</p>}
                    </div>
                    {action && <div className="flex justify-center mt-4">{action}</div>}
                </CardBody>
            </Card>
        </div>
    );
}