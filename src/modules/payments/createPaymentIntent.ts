import type { PaymentData } from "@mollie/api-client/dist/types/src/data/payments/data";
import axios from "axios";
import { getMollieBearerToken } from "./config";
import { Currency, type CreatePaymentIntent } from "./types";

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
    const paymentIntentResult = await axios.post(
        "https://api.mollie.com/v2/payments",
        {
            amount: {
                value: amount.toFixed(2),
                currency,
            },
            description,
            webhookUrl: getWebhookUrl(webhookUrl),
            redirectUrl,
            metadata,
        },
        {
            headers: {
                Authorization: getMollieBearerToken(),
            },
        }
    );
    if (!paymentIntentResult)
        throw new Error("Payment intent creation is not defined.");
    if (paymentIntentResult.status !== 201) {
        console.error(paymentIntentResult.status);
        console.error(paymentIntentResult.data);
        throw new Error("Payment intent creation failed.");
    }
    const paymentIntent = paymentIntentResult.data as PaymentData;
    return paymentIntent;
};
