import { Link } from "react-router-dom";

function DesignSystemArticlePage() {
    return (
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-wide text-default-500">Product Design</p>
                <h1 className="text-3xl font-bold text-foreground">3 patrones para acelerar tu Design System</h1>
                <p className="text-sm text-default-500">Publicado el 11 dic 2024 · 6 min de lectura</p>
            </header>

            <section className="space-y-4 text-base leading-relaxed text-default-600">
                <p>
                    Este es un borrador del artículo completo. Aquí podrás ampliar el contenido del post con
                    ejemplos, fragmentos de código y cualquier recurso adicional que necesites para tu blog.
                </p>
                <p>
                    Mantuvimos el layout principal, así que al navegar desde la tarjeta de inicio solo cambia este
                    contenido central.
                </p>
            </section>

            <footer className="flex justify-end">
                <Link className="text-primary hover:underline" to="/">
                    ← Volver al inicio
                </Link>
            </footer>
        </article>
    );
}

export default DesignSystemArticlePage;
