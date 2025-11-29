import { buildUrl, readErrorDetail } from "./auth";

export type PostComment = {
    id: string;
    author: string;
    message: string;
    postedAgo: string;
};

export type Post = {
    title: string;
    excerpt: string;
    articleUrl: string;
    coverUrl: string;
    category: string;
    publishedAt: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    stats: {
        reactions: number;
        comments: number;
        saves: number;
    };
    comments: PostComment[];
};

export type CreatePostPayload = {
    title: string;
    content: string;
    bannerImageBase64?: string;
    imageMimeType?: string;
};

export type CreatePostResponse = {
    id: number;
    title: string;
    content: string;
    bannerImageUrl?: string;
    createdAt: string;
};

export interface PostData {
    idPost: number
    title: string
    content: string
    bannerImageBase64: string
    createdAt: string
    authorUserName: string
    authorFullName: string
    commentCount: number
}

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
