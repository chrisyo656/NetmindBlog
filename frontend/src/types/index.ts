export type CardPostProps = {
    post: PostData;
};

export type LoginPayload = {
    userName: string;
    password: string;
};

export type RegisterPayload = {
    name: string;
    lastName: string;
    userName: string;
    password: string;
};

export type AuthResponse = {
    idUser: number;
    userName: string;
    fullName: string;
    token: string;
};

export type UserProfile = Pick<AuthResponse, "idUser" | "userName" | "fullName">;

export type LoginServiceSuccess = {
    access_token?: string;
    token?: string;
    fullName?: string;
    idUser?: number;
    userName?: string;
    data?: {
        token?: string;
        fullName?: string;
        idUser?: number;
        userName?: string;
    };
};


export type RegisterResponse = AuthResponse & {
    detail?: string;
};

export type Comment = {
    idComment: number;
    content: string;
    commentedAt: string | null | undefined;
    createdAt: string;
    authorUserName: string;
    authorFullName: string;
    idPost: number;
};

export type CreateCommentPayload = {
    idPost: number
    content: string;
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
    recentComments: Comment[]
}

export type AuthTab = "login" | "signup";

export type AuthFormCardProps = {
    mode?: AuthTab;
};

export type SignUpFormState = RegisterPayload & { confirmPassword: string };

export type CommentsSectionProps = {
    postId: number;
};

export type CommentFormProps = {
    commentText: string;
    onCommentChange: (value: string) => void;
    onSubmit: () => void;
    onAuthPrompt: () => void;
    isLogged: boolean;
    isSubmitting: boolean;
};

export type PasswordStrength = {
    score: number;
    label: string;
    checks: {
        len8: boolean;
        lower: boolean;
        upper: boolean;
        number: boolean;
        symbol: boolean;
    };
};

export type PasswordIndicatorProps = {
    strength: PasswordStrength;
};

export type CommentCardProps = {
    comment: Comment;
    variant?: "compact" | "full";
};

export type ImageUploadAreaProps = {
    imagePreview?: string;
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: () => void;
};

export type ImageUploadState = {
    imageFile?: File;
    imagePreview?: string;
    bannerImageBase64?: string;
    imageMimeType?: string;
};

export type PostFormFields = {
    title: string;
    content: string;
};

export type CardPostErrorProps = {
    isRetrying: boolean;
    message: string;
    onRetry: () => void;
};

export type AuthState = {
    profile: UserProfile | null;
    isLogged: boolean;
    initializing: boolean;
    networkDown: boolean;
    isLoggingIn: boolean;
    isRegistering: boolean;
    login: (payload: LoginPayload) => Promise<boolean>;
    register: (payload: RegisterPayload) => Promise<boolean>;
    logout: () => void;
    hydrate: () => void;
};

export type BackButtonProps = {
    to?: string;
    label?: string;
};

export type EmptyStateProps = {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
};

export type ErrorStateProps = {
    message?: string;
};

export type MenuUserProps = {
  profile: UserProfile;
};

export type PostContentProps = {
    content: string;
    postId: number;
};

export type PostErrorStateProps = {
    message?: string;
};

export type PostHeaderProps = {
    post: PostData;
};