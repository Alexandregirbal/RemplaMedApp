import Link from "next/link";

export default function Footer() {
    return (
        <footer className="fixed flex h-6 w-full items-center justify-around bg-background text-sm">
            <Link href={"/about"}>{"À propos"}</Link>
            <Link href={"/policy/privacy"}>
                {"Politique de confidentialité"}
            </Link>
        </footer>
    );
}
