export const formatDate = (value: string) =>
    new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));

export const formatDateLong = (value: string) =>
    new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"}).format(new Date(value));