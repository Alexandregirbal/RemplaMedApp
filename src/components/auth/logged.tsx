"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import UserIcon from "../user/icon";
import type { User } from "./types";

type LoggedProps = {
    user: User;
};

export default function Logged({ user }: LoggedProps) {
    const initials = user.name
        ? user.name?.charAt(0).toUpperCase() +
          user.name?.charAt(1).toUpperCase()
        : user.name;

    const handleSignout = () => {
        console.log("Signing out...");
        signOut()
            .then(() => {
                console.log("Signed out!");
            })
            .catch((error) => {
                console.log("Error signing out: ", error);
            });
    };

    return (
        <li className="flex items-center gap-8">
            <button
                className="rounded-md bg-gray-700 px-6 py-2 text-sm text-white "
                onClick={() => handleSignout()}
            >
                Sign Out
            </button>
            {user && (
                <Link href={"/users/me"}>
                    {user.image ? (
                        <UserIcon image={user.image} size={50} />
                    ) : (
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                lineHeight: "50px",
                                fontSize: "20px",
                            }}
                            // tailwind css for center test in a div
                            className="rounded-full bg-primary text-center text-white shadow-lg"
                        >
                            {initials}
                        </div>
                    )}
                </Link>
            )}
        </li>
    );
}
