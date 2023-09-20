"use client";
import LoginIcon from "modules/ui/icons/login";
import { signIn } from "next-auth/react";

const LoginButton = () => {
    const handleLogin = () => {
        void signIn();
    };

    return (
        <button
            className="h-10 rounded-lg px-4 text-cta"
            onClick={() => handleLogin()}
        >
            <LoginIcon size={30} />
        </button>
    );
};

export default LoginButton;
