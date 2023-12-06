import Button from "modules/ui/button";
import { REMPLAMED_EMAILS } from "modules/utils/constants";
import Link from "next/link";

const InternalError = () => {
    return (
        <div className="flex h-4/5 flex-col justify-center gap-4 text-center align-middle ">
            <h1 className="text-2xl font-semibold">{"Erreur 500"}</h1>
            <p className="text-xl">
                {
                    "Le problème vient de chez nous, n'hésitez pas à nous contacter si il persiste: "
                }
                <a
                    className="underline"
                    href={`mailto:${REMPLAMED_EMAILS.help}`}
                >
                    {REMPLAMED_EMAILS.help}
                </a>
            </p>

            <Link href={"/"}>
                <Button height={10}>{"Retour à la page d'acceuil"}</Button>
            </Link>
        </div>
    );
};

export default InternalError;
