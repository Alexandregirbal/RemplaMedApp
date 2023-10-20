import { getMollieClient } from "./config";
import { type CreatePaymentIntent, Currency } from "./types";

const getWebhookUrl = (url: string) => {
    if (url.includes("localhost")) {
        return "https://rempla-med.fr/api/payment/webhook/local_will_fail";
    }
    return url;
};

export const createPaymentIntent: CreatePaymentIntent = async ({
    amount,
    description,
    webhookUrl,
    redirectUrl,
    metadata,
    currency = Currency.EUR,
}) => {
    const paymentIntent = await getMollieClient().payments.create({
        amount: {
            value: amount.toFixed(2),
            currency,
        },
        description,
        webhookUrl: getWebhookUrl(webhookUrl),
        redirectUrl,
        metadata,
    });
    return paymentIntent;
};
