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
            className="w-40 rounded-lg bg-slate-100 px-4"
            onClick={() => handleLogin()}
        >
            Log In
        </button>
    );
};

export default LoginButton;
