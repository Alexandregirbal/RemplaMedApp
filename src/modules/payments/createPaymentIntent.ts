import { getMollieClient } from "./config";
import { Currency, type CreatePayment } from "./types";

const getWebhookUrl = (url: string) => {
    if (url.includes("localhost")) {
        return "https://rempla-med.fr/api/payment/webhook/local_will_fail";
    }
    return url;
};

export const createPayment: CreatePayment = async ({
    amount,
    description,
    webhookUrl,
    redirectUrl,
    metadata,
    cancelUrl,
    currency = Currency.EUR,
}) => {
    const mollieClient = getMollieClient();
    const payment = await mollieClient.payments.create({
        amount: {
            value: amount.toFixed(2),
            currency,
        },
        description,
        webhookUrl: getWebhookUrl(webhookUrl),
        redirectUrl,
        metadata,
        cancelUrl,
    });

    return payment;
};
