import { env } from "../env.mjs";

export const getDomainUrl = (): string => {
    const domainEnvironment = env.VERCEL_ENV;
    const domainUrl = env.VERCEL_URL;

    if (domainEnvironment === "production") {
        return "https://rempla-med.fr";
    }
    return domainUrl;
};
