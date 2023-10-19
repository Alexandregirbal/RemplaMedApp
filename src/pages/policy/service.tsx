import Head from "next/head";
import Link from "next/link";

const ServicePolicy = () => {
    return (
        <>
            <Head>
                <meta
                    http-equiv="Content-Type"
                    content="text/html; charset=utf-8"
                />
                <title>{"RemplaMed | Conditions d'utilisation"}</title>
            </Head>
            <article className="flex h-full flex-col gap-2 p-4">
                <h1 className="text-center text-2xl">
                    <strong>{"Conditions d'utilisation de RemplaMed"}</strong>
                </h1>
                <div className="flex flex-col gap-2">
                    {
                        "En utilisant l'application web RemplaMed, vous acceptez les conditions suivantes :"
                    }
                </div>
                <p className="">
                    <strong>1. Utilisation de RemplaMed</strong>
                </p>
                <p className="">
                    RemplaMed est fourni uniquement pour votre usage personnel.
                    Vous ne pouvez pas utiliser RemplaMed à des fins
                    commerciales, sauf si vous avez obtenu une autorisation
                    écrite de RemplaMed. Vous ne pouvez pas utiliser RemplaMed
                    pour enfreindre les lois ou règlements applicables.
                </p>
                <p className="">
                    <strong>{"2. Contenu généré par l'utilisateur"}</strong>
                </p>
                <p className="">
                    Vous êtes seul responsable du contenu que vous publiez sur
                    RemplaMed. Vous déclarez et garantissez que vous avez tous
                    les droits nécessaires pour publier un tel contenu et que ce
                    contenu ne viole pas les lois ou règlements applicables. En
                    publiant du contenu sur RemplaMed, vous accordez à RemplaMed
                    une licence non exclusive, cessible, sous-licenciable, sans
                    redevance et mondiale pour utiliser, reproduire, modifier,
                    créer des œuvres dérivées, distribuer, afficher
                    publiquement, exécuter publiquement et exploiter de toute
                    autre manière ce contenu dans tous les formats et canaux de
                    distribution connus ou développés ultérieurement.
                </p>
                <p className="">
                    <strong>3. Propriété intellectuelle</strong>
                </p>
                <p className="">
                    {`L'application RemplaMed et tout le contenu et autres
                        matériaux disponibles via RemplaMed, y compris, mais
                        sans s'y limiter, les marques de commerce, logos,
                        marques de service et habillage commercial
                        (collectivement, le "Contenu RemplaMed"), sont la
                        propriété de RemplaMed ou de ses concédants de licence
                        et sont protégés par le droit d'auteur, les marques de
                        commerce et d'autres lois sur la propriété
                        intellectuelle. Vous ne pouvez pas copier, modifier,
                        distribuer, vendre ou louer une partie de RemplaMed ou
                        du Contenu RemplaMed.`}
                </p>
                <p className="">
                    <strong>4. Limitation de responsabilité</strong>
                </p>
                <p className="">
                    RemplaMed ne sera pas responsable envers vous pour des
                    dommages indirects, accessoires, spéciaux, consécutifs ou
                    punitifs découlant de votre utilisation de RemplaMed ou du
                    Contenu RemplaMed. La responsabilité de RemplaMed envers
                    vous pour des dommages directs sera limitée au montant payé
                    par vous, le cas échéant, pour accéder ou utiliser
                    RemplaMed.
                </p>
                <p className="">
                    <strong>5. Exclusion de garanties</strong>
                </p>
                <p className="">
                    {
                        "RemplaMed fournit RemplaMed et le Contenu RemplaMed tel quel et sans aucune garantie ou condition, expresse, implicite ou légale. RemplaMed décline expressément toute garantie implicite de qualité marchande, d'adéquation à un usage particulier, de non-contrefaçon et toute garantie découlant de la pratique commerciale ou de l'usage du commerce."
                    }
                </p>
                <p className="">
                    <strong>6. Loi applicable et règlement des litiges</strong>
                </p>
                <p className="">
                    {
                        "Ces Conditions d'utilisation seront régies par et interprétées conformément aux lois de la France, sans donner effet à aucun principe de conflit de lois. Tout litige découlant de ou lié à ces Conditions d'utilisation ou à votre utilisation de RemplaMed sera résolu exclusivement devant les tribunaux français."
                    }
                </p>
                <p className="">
                    <strong>
                        {"7. Modifications de ces Conditions d'utilisation"}
                    </strong>
                </p>
                <p className="">
                    {
                        "Nous pouvons mettre à jour ces Conditions d'utilisation de temps à autre. Toute modification sera communiquée par e-mail."
                    }
                </p>
                <p className="text-xl">
                    <strong>{"Contactez-nous"}</strong>
                </p>
                <p className="pb-10">
                    {
                        "Si vous avez des questions, des préoccupations ou des demandes concernant vos informations personnelles ou cette Politique de confidentialité, veuillez nous contacter à l'adresse e-mail de contact fournie sur "
                    }
                    <Link href="/contact" className="underline">
                        {"rempal-med.fr/contact"}
                    </Link>
                    {"."}
                </p>
                <hr />
            </article>
        </>
    );
};
export default ServicePolicy;
