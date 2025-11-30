import { useQuery } from "@tanstack/react-query";
import type { PostData } from "../types";
import { getPost } from "../services/posts";

export function usePosts() {
    const { data: posts, isLoading, isError, error } = useQuery<PostData[]>({
        queryKey: ["posts"],
        queryFn: () => getPost(),
        staleTime: 1000 * 60 * 5
    });

    return {
        posts,
        isLoading,
        isError,
        error,
        isEmpty: posts?.length === 0
    };
}