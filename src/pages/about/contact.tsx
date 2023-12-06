import { REMPLAMED_EMAILS } from "modules/utils/constants";

const ContactPage = () => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-center text-2xl font-bold">
                {"Contactez-nous"}
            </h1>
            <ul className="flex list-inside list-disc flex-col gap-2">
                <li>
                    {"Pour une information : "}
                    <a
                        className="underline"
                        href={`mailto:${REMPLAMED_EMAILS.info}`}
                    >
                        {REMPLAMED_EMAILS.info}
                    </a>
                </li>
                <li>
                    {"Pour de l'aide : "}
                    <a
                        className="underline"
                        href={`mailto:${REMPLAMED_EMAILS.help}`}
                    >
                        {REMPLAMED_EMAILS.help}
                    </a>
                </li>
                <li>
                    {"Pour d'autres sujets : "}
                    <a
                        className="underline"
                        href={`mailto:${REMPLAMED_EMAILS.contact}`}
                    >
                        {REMPLAMED_EMAILS.contact}
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ContactPage;
