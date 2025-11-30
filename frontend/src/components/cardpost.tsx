import { Button, Card, CardBody, Divider, User } from "@heroui/react";
import { MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useAuthPromptStore } from "../stores/useAuthModalStore";
import type { CardPostProps } from "../types";
import { formatDate } from "../utils/date";
import { CommentCard } from "./CommentCard";

function CardPost({ post }: CardPostProps) {
    const isLogged = useAuthStore(state => state.isLogged);
    const requestAuth = useAuthPromptStore(state => state.requestAuth);
    const navigate = useNavigate();

    const handleCommentClick = () => {
        if (!isLogged) {
            requestAuth("Inicia sesión para agregar un comentario a este post.");
            return;
        }
        navigate(`/post/${post.idPost}#comments`);
    };

    return (
        <Card
            className="mx-auto w-full overflow-hidden border border-default-200"
            classNames={{
                base: 'shadow-none'
            }}
        >
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
                        to={`/post/${post.idPost}`}
                    >
                        <div className="space-y-3">
                            <User
                                avatarProps={{ isBordered: true, name: post.authorFullName, className: 'text-text1', }}
                                description={formatDate(post.createdAt)}
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
                    <Button
                        radius="full"
                        size="sm"
                        startContent={<MessageCircle aria-hidden className="h-4 w-4" />}
                        variant="bordered"
                        onPress={handleCommentClick}
                    >
                        Comentar ({post.commentCount})
                    </Button>
                </div>
                {post.recentComments.length > 0 && (
                    <div className="space-y-3 pt-2">
                        {post.recentComments.map(comment => (
                            <CommentCard
                                key={comment.idComment}
                                comment={comment}
                                variant="compact"
                            />
                        ))}
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default CardPost;
