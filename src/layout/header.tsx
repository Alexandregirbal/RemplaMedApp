import Logged from "modules/auth/components/logged";
import Login from "modules/auth/components/login";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const { data: session } = useSession();

    return (
        <nav className="flex items-center justify-between p-4 px-6">
            <Link href={"/"}>
                <Image
                    src="/logo-transparent-png-no-text.png"
                    alt="remplamed-logo"
                    width={64}
                    height={64}
                />
            </Link>
            <Link href={"/posts/create"}>Créer un poste</Link>
            {session ? <Logged user={session.user} /> : <Login />}
        </nav>
    );
}
