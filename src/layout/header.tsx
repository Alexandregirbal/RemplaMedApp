import { useSession } from "next-auth/react";
import Image from "next/image";
import Logged from "../modules/auth/components/logged";
import Login from "../modules/auth/components/login";

export default function Header() {
    const { data: session, status } = useSession();
    console.log("Session: ", session);

    return (
        <nav className="flex justify-between bg-orange-400 p-4">
            <Image
                src="/logo-transparent-png-no-text.png"
                alt="remplamed-logo"
                width={64}
                height={64}
            />
            <span className="font-medium text-gray-700 first-letter:uppercase">
                {status}
            </span>
            {session ? <Logged user={session.user} /> : <Login />}
        </nav>
    );
}
