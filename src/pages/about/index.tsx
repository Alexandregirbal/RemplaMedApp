import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-center text-2xl font-bold">À propos de nous</h1>
            <p>
                {
                    "RemplaMed est une application web qui permet aux professionnels de santé de trouver des remplaçants, des remplacements, des cessions de cabinet, etc..."
                }
            </p>
            <p>
                {
                    "L'accès au réseau est 100% gratuit sous réserve d'inscription. Nous proposons un service payant pour publier vos annonces."
                }
            </p>
            <p>{`Dans le futur, RemplaMed compte agrandir son réseau à un maximum de professions médicales et paramédicales en France. 
            Nous comptons apporter de nouvelles fonctionnalités à l'application web régulièrement afin de vous servir au mieux.
            Si vous avez une idée de fonctionnalité ou un retour quelconque à nous faire, n'hésitez pas à nous contacter.
            `}</p>
            <hr />
            <p>
                {
                    "Vous trouverez les adresses email de contact sur la page suivante: "
                }
                <Link href="/about/contact" className="underline">
                    {"rempla-med.fr/about/contact"}
                </Link>
            </p>
            <hr />
            <p>
                {
                    "Conditions, politique de confidentialité, tarifs et autres mentions légales, merci de vous réferer à la page suivante: "
                }
                <Link href="/policy" className="underline">
                    {"rempla-med.fr/policy"}
                </Link>
            </p>
        </div>
    );
};

export default AboutPage;
