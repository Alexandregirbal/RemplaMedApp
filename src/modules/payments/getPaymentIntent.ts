import { getMollieClient } from "./config";
import { type GetPaymentIntent } from "./types";

export const getPaymentIntent: GetPaymentIntent = async ({ id }) => {
    const paymentIntent = await getMollieClient().payments.get(id);
    return paymentIntent;
};
