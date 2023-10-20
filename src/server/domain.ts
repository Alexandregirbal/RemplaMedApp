import { env } from "../env.mjs";

export const getDomainUrl = (): string => {
    const domainUrl = env.VERCEL_BRANCH_URL;
    switch (env.VERCEL_ENV) {
        case "production":
            return "https://rempla-med.fr";
        case "preview":
            return `https://${domainUrl}`;
        case "development":
            return `http://${domainUrl}`;
        default:
            return "http://localhost:3000";
    }
};
