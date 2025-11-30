import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";
import { getPostById } from "../services/posts";

export function usePost() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const { data: post, isLoading, isError, error } = useQuery({
        queryKey: ["post", id],
        queryFn: () => getPostById(Number(id)),
        enabled: !!id,
        staleTime: 1000 * 60 * 5
    });

    useEffect(() => {
        if (location.hash === "#comments" && post) {
            setTimeout(() => {
                const commentsElement = document.getElementById("comments");
                if (commentsElement) {
                    commentsElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        }
    }, [location.hash, post]);

    return {
        post,
        isLoading,
        isError,
        error
    };
}