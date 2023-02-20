"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import UserIcon from "../user/icon"
import type { User } from "./types"

type LoggedProps = {
    user: User
}

export default function Logged({ user }: LoggedProps) {

    const handleSignout = () => {
        console.log("Signing out...");
        signOut().then(() => {
            console.log("Signed out!");
        }).catch((error) => {
            console.log("Error signing out: ", error);
        });
    };

    return (
        <li className="flex gap-8 items-center">
        <button
            className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md "
            onClick={() => handleSignout()}
        >
            Sign Out
        </button>
        {user && user.image && (
            <Link href={"/users/me"}>
                <UserIcon image={user.image}/>
            </Link>
        )}
        </li>
    )
}
