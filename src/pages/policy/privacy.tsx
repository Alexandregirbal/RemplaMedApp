import Head from "next/head";
import Link from "next/link";

const PrivacyPolicy = () => {
    return (
        <>
            <Head>
                <meta
                    httpEquiv="Content-Type"
                    content="text/html; charset=utf-8"
                />
                <title>{"Politique de confidentialité RemplaMed"}</title>
            </Head>
            <div className="flex h-full flex-col gap-4 p-4">
                <h1 className="text-center text-2xl">
                    <strong>{"Politique de confidentialité RemplaMed"}</strong>
                </h1>
                <div className="flex flex-col gap-2">
                    <p>{"Date d'effet : 1er Septembre 2023"}</p>
                    <hr />
                    <p>
                        {
                            "Cette Politique de Confidentialité explique comment RemplaMed collecte, utilise, stocke et protège les informations personnelles des utilisateurs de l'application web RemplaMed. Cette politique s'applique exclusivement aux informations recueillies à travers l'application et décrit les procédures que nous avons mises en place pour garantir la confidentialité et la sécurité de vos informations personnelles."
                        }
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-xl">
                        <strong>{"Informations que nous collectons"}</strong>
                    </p>
                    <p>
                        {
                            "Lorsque vous utilisez RemplaMed, nous collectons certaines informations: "
                        }
                    </p>
                </div>

                <ol type="1" className="flex flex-col gap-2" start={1}>
                    <li>
                        <strong>{"Informations du compte Google: "}</strong>
                        {
                            "Pour utiliser RemplaMed, vous pouvez vous authentifier via votre compte Google. Nous collectons vos informations de profil de base depuis votre compte Google, c'est-à-dire votre nom, adresse e-mail et photo de profil. Nous utilisons ces informations exclusivement pour vous authentifier et ne les partageons pas avec des tiers."
                        }
                    </li>
                </ol>
                <ol type="1" className="flex flex-col gap-2" start={2}>
                    <li>
                        <strong>{"Contenu: "}</strong>
                        {
                            "Lorsque vous interagissez avec RemplaMed, vous pouvez publier du contenu, tel que du texte. Ce contenu peut être associé à votre compte Google et peut être visible par d'autres utilisateurs de RemplaMed."
                        }
                    </li>
                </ol>
                <ol type="1" className="flex flex-col gap-2" start={3}>
                    <li>
                        <strong>{"Données d'utilisation: "}</strong>
                        {
                            "Nous collectons automatiquement des informations sur votre interaction avec RemplaMed, y compris les actions que vous effectuez et les fonctionnalités que vous utilisez."
                        }
                    </li>
                </ol>
                <p className="text-xl">
                    <strong>{"Comment nous utilisons vos informations"}</strong>
                </p>
                <p>{"Les informations collectées sont utilisées pour: "}</p>
                <ol type="1" className="numbered-list" start={1}>
                    <li>
                        <strong>{"Authentification: "}</strong>
                        {
                            "Vos informations de compte Google sont utilisées pour vérifier votre identité et vous donner accès à RemplaMed."
                        }
                    </li>
                </ol>
                <ol type="1" className="numbered-list" start={2}>
                    <li>
                        <strong>{"Contenu généré par l'utilisateur: "}</strong>
                        {
                            "Le contenu que vous publiez sur RemplaMed est utilisé pour afficher vos contributions aux autres utilisateurs et améliorer l'expérience utilisateur globale."
                        }
                    </li>
                </ol>
                <ol type="1" className="numbered-list" start={3}>
                    <li>
                        <strong>{"Amélioration de l'application: "}</strong>
                        {
                            "Nous analysons les données d'utilisation pour comprendre comment nos utilisateurs interagissent avec RemplaMed, identifier les domaines à améliorer et développer de nouvelles fonctionnalités."
                        }
                    </li>
                </ol>
                <ol type="1" className="numbered-list" start={4}>
                    <li>
                        <strong>{"Communication: "}</strong>
                        {
                            "Votre adresse e-mail peut être utilisée pour vous envoyer des mises à jour importantes, des notifications ou des changements liés à RemplaMed."
                        }
                    </li>
                </ol>
                <p className="text-xl">
                    <strong>{"Sécurité des données"}</strong>
                </p>
                <p>
                    {
                        "Nous nous engageons à protéger vos données et mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations contre l'accès non autorisé, la modification, la divulgation ou la destruction."
                    }
                </p>
                <p className="text-xl">
                    <strong>{"Accès par des tiers"}</strong>
                </p>
                <p>
                    {
                        "Nous ne partageons pas vos informations personnelles avec des tiers, sauf comme décrit dans cette politique. Dans l'éventualité où des tiers auraient accès aux données des utilisateurs (par exemple, des fournisseurs de services de stockage de données), nous nous assurerons qu'ils adhèrent à nos normes de confidentialité et sont conformes à la politique de Google."
                    }
                </p>
                <p className="text-xl">
                    <strong>{"Vos choix"}</strong>
                </p>
                <p>
                    {
                        "Vous avez le contrôle sur les informations que vous nous fournissez en gérant les paramètres de votre compte Google. Le choix de ne pas fournir certaines informations peut limiter votre accès à certaines fonctionnalités de RemplaMed."
                    }
                </p>
                <p className="text-xl">
                    <strong>
                        {"Modifications de cette Politique de confidentialité"}
                    </strong>
                </p>
                <p>
                    {
                        "Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Tous les changements seront communiqués par e-mail à nos utilisateurs."
                    }
                </p>
                <p className="text-xl">
                    <strong>{"Contactez-nous"}</strong>
                </p>
                <p>
                    {
                        "Pour toute question, préoccupation ou demande concernant vos informations personnelles ou cette Politique de Confidentialité, veuillez nous contacter à l'adresse e-mail fournie sur la "
                    }
                    <Link href="/about/contact" className="underline">
                        {"page de contact"}
                    </Link>
                    {"."}
                </p>
                <hr />
                <p className="pb-10">
                    {
                        "En utilisant l'application RemplaMed, vous acceptez les termes décrits dans cette Politique de Confidentialité."
                    }
                </p>
            </div>
        </>
    );
};

export default PrivacyPolicy;
