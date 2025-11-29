import AuthFormCard from "../components/authFormCard";

function LoginPage() {
    return (
        <section className="flex w-full p-4">
            <AuthFormCard mode="login" />
        </section>
    );
}

export default LoginPage;
