import createMollieClient from "@mollie/api-client";
import { env } from "../../env.mjs";

let mollieClient: undefined | ReturnType<typeof createMollieClient> = undefined;

export const getMollieClient = () => {
    if (!mollieClient) {
        mollieClient = createMollieClient({
            apiKey: env.MOLLIE_API_KEY,
        });
    }

    return mollieClient;
};
