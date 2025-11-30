export const isNetworkLike = (error: unknown) => {
    if (error instanceof TypeError) return true;
    const message = typeof error === "object" && error !== null ? String((error as { message?: string }).message ?? "") : "";
    return /Failed to fetch|NetworkError|ECONNREFUSED|ERR_CONNECTION|ERR_NETWORK/i.test(message);
};