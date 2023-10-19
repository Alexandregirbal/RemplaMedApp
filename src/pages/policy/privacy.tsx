import Head from "next/head";
import Link from "next/link";

const PrivacyPolicy = () => {
    return (
        <>
            <Head>
                <meta
                    http-equiv="Content-Type"
                    content="text/html; charset=utf-8"
                />
                <title>{"Politique de confidentialité RemplaMed"}</title>
            </Head>
            <div className="flex h-full flex-col gap-4 p-4">
                <h1 className="text-center text-2xl">
                    <strong>{"Politique de confidentialité RemplaMed"}</strong>
                </h1>
                <div className="flex flex-col gap-2">
                    <p>{"Date d'effet: 1er Septembre 2023"}</p>
                    <hr />
                    <p>
                        {
                            "Cette Politique de confidentialité décrit comment RemplaMed collecte, utilise, conserve et protège les informations personnelles des utilisateurs de l'application web RemplaMed. Cette politique s'applique uniquement aux informations collectées via l'application et explique les procédures que nous avons mises en place pour garantir votre vie privée et la sécurité de vos informations personnelles."
                        }
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-xl">
                        <strong>{"Informations que nous collectons"}</strong>
                    </p>
                    <p>
                        {
                            "Nous recueillons certaines informations lorsque vous utilisez l'application RemplaMed :"
                        }
                    </p>
                </div>

                <ol type="1" className="flex flex-col gap-2" start={1}>
                    <li>
                        <strong>{"Informations du compte Google:"}</strong>{" "}
                        {
                            "Afin d'utiliser RemplaMed, vous pouvez vous authentifier via votre compte Google. Nous collectons vos informations de profil de base depuis votre compte Google, notamment votre nom, votre adresse e-mail et votre photo de profil."
                        }
                    </li>
                </ol>
                <ol type="1" className="flex flex-col gap-2" start={2}>
                    <li>
                        <strong>{"Contenu:"}</strong>{" "}
                        {
                            "Lorsque vous interagissez avec RemplaMed, vous pouvez publier du contenu, tel que du texte. Ce contenu peut être associé à votre compte Google et peut être visible par d'autres utilisateurs de RemplaMed."
                        }
                    </li>
                </ol>
                <ol type="1" className="flex flex-col gap-2" start={3}>
                    <li>
                        <strong>{"Données d'utilisation"}:</strong>{" "}
                        {
                            "Nous collectons automatiquement certaines informations sur votre interaction avec RemplaMed, y compris les actions que vous effectuez et les fonctionnalités que vous utilisez."
                        }
                    </li>
                </ol>
                <p className="text-xl">
                    <strong>{"Comment nous utilisons vos informations"}</strong>
                </p>
                <p>
                    {
                        "Nous utilisons les informations collectées pour fournir et améliorer nos services, notamment:"
                    }
                </p>
                <ol type="1" className="numbered-list" start={1}>
                    <li>
                        <strong>{"Authentification:"}</strong>{" "}
                        {
                            "Vos informations de compte Google sont utilisées pour vérifier votre identité et vous donner accès à RemplaMed."
                        }
                    </li>
                </ol>
                <ol type="1" className="numbered-list" start={2}>
                    <li>
                        <strong>{"Contenu généré par l'utilisateur"}</strong>{" "}
                        {
                            "Le contenu que vous publiez sur RemplaMed est utilisé pour afficher vos contributions aux autres utilisateurs et améliorer l'expérience globale de l'utilisateur."
                        }
                    </li>
                </ol>
                <ol type="1" className="numbered-list" start={3}>
                    <li>
                        <strong>{"Amélioration de l'application"}</strong>{" "}
                        {
                            "Nous analysons les données d'utilisation pour mieux comprendre comment les utilisateurs interagissent avec RemplaMed, identifier les domaines à améliorer et développer de nouvelles fonctionnalités."
                        }
                    </li>
                </ol>
                <ol type="1" className="numbered-list" start={4}>
                    <li>
                        <strong>{"Communication:"}</strong>{" "}
                        {
                            "Nous pouvons utiliser votre adresse e-mail pour vous communiquer des mises à jour importantes, des notifications ou des changements liés à RemplaMed."
                        }
                    </li>
                </ol>
                <p className="text-xl">
                    <strong>{"Sécurité des données"}</strong>
                </p>
                <p>
                    {
                        "Nous prenons la sécurité des données au sérieux et mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos informations contre tout accès, altération, divulgation ou destruction non autorisée."
                    }
                </p>
                <p className="text-xl">
                    <strong>{"Accès par des tiers"}</strong>
                </p>
                <p>
                    {
                        "Nous ne partageons pas vos informations personnelles avec des tiers, sauf tel que décrit dans cette politique. Vos informations de compte Google sont utilisées uniquement à des fins d'authentification et ne sont pas partagées avec des prestataires de services tiers."
                    }
                </p>
                <p className="text-xl">
                    <strong>{"Vos choix"}</strong>
                </p>
                <p>
                    {
                        "Vous pouvez contrôler les informations que vous nous fournissez en gérant les paramètres de votre compte Google. Vous pouvez choisir de ne pas fournir certaines informations, mais cela peut limiter votre accès à certaines fonctionnalités de RemplaMed."
                    }
                </p>
                <p className="text-xl">
                    <strong>
                        {"Modifications de cette Politique de confidentialité"}
                    </strong>
                </p>
                <p>
                    {
                        "Nous pouvons mettre à jour cette Politique de confidentialité de temps à autre. Toutes les modifications seront communiquées par e-mail."
                    }
                </p>
                <p className="text-xl">
                    <strong>{"Contactez-nous"}</strong>
                </p>
                <p>
                    {
                        "Si vous avez des questions, des préoccupations ou des demandes concernant vos informations personnelles ou cette Politique de confidentialité, veuillez nous contacter à l'adresse e-mail de contact fournie sur "
                    }
                    <Link href="/contact" className="underline">
                        {"rempal-med.fr/contact"}
                    </Link>
                    {"."}
                </p>
                <hr />
                <p className="pb-10">
                    {
                        "En utilisant l'application RemplaMed, vous acceptez les termes décrits dans cette Politique de confidentialité. Si vous n'acceptez pas ces termes, veuillez ne pas utiliser l'application RemplaMed."
                    }
                </p>
            </div>
        </>
    );
};

export default PrivacyPolicy;
