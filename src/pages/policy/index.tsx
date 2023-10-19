import Link from "next/link";

const Policies = () => {
    return (
        <div className=" flex flex-col gap-4 p-6">
            <h1 className="text-center text-2xl">
                Conditions, politique de confidentialité et tarifs
            </h1>
            <p>
                Les conditions autres terms légaux sont disponibles sur les
                pages suivantes:
            </p>
            <ol className="underline">
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
            </ol>
        </div>
    );
};

export default Policies;
