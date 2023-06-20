"use client";
import { signIn } from "next-auth/react";

const LoginButton = () => {
    const handleLogin = () => {
        void signIn();
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
