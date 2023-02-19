
import { useSession } from "next-auth/react";
import Image from "next/image"
import Logged from "../auth/logged";
import Login from "../auth/login";

export default function Header() {
    const { data: session, status } = useSession()
    console.log("Session: ", session);
    
    return (
        <nav className="flex justify-between p-4 bg-orange-400">
        <Image 
            src="/logo-transparent-png-no-text.png"
            alt="remplamed-logo"
            width={64}
            height={64}
        />
        <span className="font-medium first-letter:uppercase text-gray-700">
            {status}
        </span>
        {session 
            ? (<Logged/>)
            : (<Login />)
        }
      </nav>
    )
}