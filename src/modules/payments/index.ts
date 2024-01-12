import { createPaymentIntent } from "./createPaymentIntent";

export const getPayment = async ({
    paymentIntentParams,
}: {
    paymentIntentParams: Parameters<typeof createPaymentIntent>[0];
}) => {
    const paymentIntent = await createPaymentIntent(paymentIntentParams);

    const molliePaymentUrl = paymentIntent._links.checkout?.href;
    if (!molliePaymentUrl) throw new Error("Payment url is not defined."); // Undefined for recurring payments
    const paymentId = paymentIntent.id;

    return { paymentUrl: molliePaymentUrl, paymentId };
};
