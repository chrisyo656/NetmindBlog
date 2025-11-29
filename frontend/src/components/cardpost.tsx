import { Button, Card, CardBody, Divider, User } from "@heroui/react";
import { MessageCircle, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { type PostData } from "../services/posts";

const formatPublishedAt = (value: string) =>
    new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));

type ReactionButtonProps = {
    icon: LucideIcon;
    label: string;
    count: number;
};

const ReactionButton = ({ icon: Icon, label, count }: ReactionButtonProps) => (
    <Button
        className="px-3 text-sm font-medium"
        radius="full"
        size="sm"
        startContent={<Icon aria-hidden className="h-4 w-4" />}
        variant="light"
    >
        {count} {label}
    </Button>
);

type CardPostProps = {
    post: PostData;
};

function CardPost({ post }: CardPostProps) {
    return (
        <Card className="mx-auto w-full max-w-2xl overflow-hidden border border-default-100 shadow-lg">
            {post.bannerImageBase64 && (
                <div className="relative w-full overflow-hidden bg-default-100">
                    <img
                        alt={post.title}
                        className="h-full w-full max-h-[200px] object-cover"
                        src={`data:image/jpeg;base64,${post.bannerImageBase64}`}
                    />
                </div>
            )}

            <CardBody className="space-y-6 py-6">
                <header>
                    <Link
                        aria-label={`Abrir artículo ${post.title}`}
                        className="-m-3 block rounded-2xl p-3 transition-colors hover:bg-default-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 group"
                        to={`/blog/${post.idPost}`}
                    >
                        <div className="space-y-3">
                            <User
                                description={formatPublishedAt(post.createdAt)}
                                name={post.authorFullName}
                            />
                            <div className="space-y-2">
                                <h2 className="font-roboto text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                                    {post.title}
                                </h2>
                                <p className="text-base text-default-500 line-clamp-3">{post.content}</p>
                            </div>
                        </div>
                    </Link>
                </header>

                <Divider className="bg-default-100" />
                <div className="flex flex-wrap gap-2">
                    <ReactionButton count={post.commentCount} icon={MessageCircle} label="Comentarios" />
                </div>
            </CardBody>
        </Card>
    );
}

export default CardPost;
