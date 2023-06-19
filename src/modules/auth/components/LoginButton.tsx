"use client";
import { useRouter } from "next/router";

const LoginButton = () => {
    const router = useRouter();

    const handleLogin = () => {
        void router.push("/auth/signin");
    };

    return (
        <button
            className="h-10 rounded-lg bg-cta px-8 text-white"
            onClick={() => handleLogin()}
        >
            Connexion
        </button>
    );
};

export default LoginButton;
