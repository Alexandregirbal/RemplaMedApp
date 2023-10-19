import Link from "next/link";

const Policies = () => {
    return (
        <div className=" flex flex-col gap-4 p-6">
            <h1 className="text-center text-2xl">
                <strong>
                    Conditions, politique de confidentialité et tarifs
                </strong>
            </h1>
            <p>
                Les conditions et autres termes légaux sont disponibles sur les
                pages suivantes:
            </p>
            <ul className="flex list-inside list-disc flex-col gap-2 underline">
                <li>
                    <Link href={"/policy/privacy"}>
                        {"Politique de confidentialité"}
                    </Link>
                </li>
                <li>
                    <Link href={"/policy/service"}>
                        {"Conditions d'utilisation"}
                    </Link>
                </li>
                <li>
                    <Link href={"/policy/products"}>
                        {"Produits et tarifs"}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Policies;
