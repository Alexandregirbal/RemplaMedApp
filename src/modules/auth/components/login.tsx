"use client";

import { signIn } from "next-auth/react";

const LoginButton = () => {
    const handleLogin = () => {
        console.log("Logging in...");
        signIn()
            .then(() => {
                console.log("Logged in!");
            })
            .catch((error) => {
                console.log("Error logging in: ", error);
            });
    };

    return (
        <button
            className="h-10 rounded-lg bg-button px-8 text-white"
            onClick={() => handleLogin()}
        >
            Connexion
        </button>
    );
};

export default LoginButton;
