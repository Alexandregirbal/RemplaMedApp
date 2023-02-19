'use client'

import { signIn } from "next-auth/react";

const LoginButton = () => {
    const handleLogin = () => {
        console.log("Logging in...");
        signIn().then(() => {
            console.log("Logged in!");
        }).catch((error) => {
            console.log("Error logging in: ", error);
        });
    };

    return (
        <button 
            className="rounded-lg bg-slate-100 px-4 w-40" 
            onClick={() => handleLogin()}
        >
            Log In
        </button>
    );
};

export default LoginButton;