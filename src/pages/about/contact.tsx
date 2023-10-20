const ContactPage = () => {
    const emails = {
        info: "info@rempla-med.fr",
        help: "help@rempla-med.fr",
        contact: "contact@rempla-med.fr",
    };
    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-center text-2xl font-bold">
                {"Contactez nous"}
            </h1>
            <ul className="flex list-inside list-disc flex-col gap-2">
                <li>
                    {"Pour une information: "}
                    <a className="underline" href={`emailto:${emails.info}`}>
                        {emails.info}
                    </a>
                </li>
                <li>
                    {"Pour de l'aide: "}
                    <a className="underline" href={`emailto:${emails.help}`}>
                        {emails.help}
                    </a>
                </li>
                <li>
                    {"Pour d'autres sujets: "}
                    <a className="underline" href={`emailto:${emails.contact}`}>
                        {emails.contact}
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ContactPage;
