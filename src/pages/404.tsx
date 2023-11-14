import Button from "modules/ui/button";
import Link from "next/link";

const ErrorNotFound = () => {
    return (
        <div className="flex h-4/5 flex-col justify-center gap-4 text-center align-middle ">
            <h1 className="text-2xl font-semibold">{"Erreur 404"}</h1>
            <p className="text-xl">{"Cette page n'existe pas"}</p>
            <Link href={"/"}>
                <Button height={10}>{"Retour à la page d'acceuil"}</Button>
            </Link>
        </div>
    );
};

export default ErrorNotFound;
