import type { Comment, CreateCommentPayload, CreatePostPayload, CreatePostResponse, PostData } from "../types";
import { readErrorDetail } from "../utils/detail";
import { buildUrl } from "../utils/url";

export async function getPost(): Promise<PostData[]> {
    const url = buildUrl("/api/Posts");

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    if (!response.ok) {
        const error = await readErrorDetail(response);
        throw new Error(typeof error === "string" ? error : "No fue posible crear el post");
    }
    const data = response.json()
    console.log(data)
    return data as Promise<PostData[]>;
}

export async function getPostById(id: number): Promise<PostData> {
    const url = buildUrl(`/api/Posts/${id}`);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    if (!response.ok) {
        const error = await readErrorDetail(response);
        throw new Error(typeof error === "string" ? error : "No fue posible cargar el post");
    }

    return response.json() as Promise<PostData>;
}

export async function createPost(payload: CreatePostPayload): Promise<CreatePostResponse> {
    const url = buildUrl("/api/Posts");
    console.log(payload)
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
    });
    console.log(response)
    if (!response.ok) {
        const error = await readErrorDetail(response);
        throw new Error(typeof error === "string" ? error : "No fue posible crear el post");
    }

    // Verificar si hay contenido en la respuesta
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json() as Promise<CreatePostResponse>;
    }

    // Si no hay contenido JSON, retornar un objeto vacío con valores por defecto
    return {
        id: 0,
        title: payload.title,
        content: payload.content,
        createdAt: new Date().toISOString()
    } as CreatePostResponse;
}

export async function getComments(postId: number): Promise<Comment[]> {
    const url = buildUrl(`api/Comments/post/${postId}`);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    if (!response.ok) {
        const error = await readErrorDetail(response);
        throw new Error(typeof error === "string" ? error : "No fue posible cargar los comentarios");
    }

    return response.json() as Promise<Comment[]>;
}

export async function createComment(postId: number, payload: CreateCommentPayload): Promise<Comment> {
    const url = buildUrl(`api/Comments`);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const error = await readErrorDetail(response);
        throw new Error(typeof error === "string" ? error : "No fue posible crear el comentario");
    }

    return response.json() as Promise<Comment>;
}
