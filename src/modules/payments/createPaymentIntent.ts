import { getMollieClient } from "./config";
import { type CreatePaymentIntent, Currency } from "./types";

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
            value: amount.toString(),
            currency,
        },
        description,
        webhookUrl,
        redirectUrl,
        metadata,
    });
    return paymentIntent;
};
