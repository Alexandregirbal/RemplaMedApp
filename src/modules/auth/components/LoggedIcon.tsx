"use client";

import UserIcon from "modules/user/components/userIcon";
import { signOut } from "next-auth/react";
import { useState } from "react";
import type { UserSession } from "../types/user";
import Link from "next/link";

type LoggedProps = {
    user: UserSession;
};

export default function Logged({ user }: LoggedProps) {
    const initials = user.name
        ? user.name?.charAt(0).toUpperCase() +
          user.name?.charAt(1).toUpperCase()
        : user.name;

    const [dropdown, setDropdown] = useState(false);

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

    const toggleDropdow = () => {
        setDropdown(!dropdown);
    };

    return (
        <div className="relative flex items-center gap-8">
            <div onClick={toggleDropdow}>
                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        lineHeight: "50px",
                        fontSize: "20px",
                    }}
                    className="rounded-full bg-primary text-center text-white shadow-xl hover:cursor-pointer"
                >
                    {user.image ? (
                        <UserIcon image={user.image} size={50} />
                    ) : (
                        initials
                    )}
                </div>

                {dropdown && (
                    <ul className="absolute right-0 z-10 mt-2 flex flex-col justify-evenly gap-2 rounded-md border bg-background p-2 shadow-sm">
                        <li>
                            <Link href="users/me">Mon profile</Link>
                        </li>
                        <hr />
                        <li
                            className="hover:cursor-pointer"
                            onClick={handleSignout}
                        >
                            Déconnexion
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}
