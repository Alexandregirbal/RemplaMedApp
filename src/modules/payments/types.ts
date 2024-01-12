import type { PaymentData } from "@mollie/api-client/dist/types/src/data/payments/data";

export enum Currency {
    EUR = "EUR",
    USD = "USD",
}

export type PaymentMetadata = {
    userId: string;
    userEmail: string;
    postId: string;
    domain: string;
    origin: "desktop" | "mobile";
};

export type CreatePaymentIntent = (params: {
    amount: number;
    description: string;
    webhookUrl: string;
    redirectUrl: string;
    metadata: PaymentMetadata;
    cancelUrl: string;
    currency?: Currency;
}) => Promise<PaymentData>;

export type GetPaymentIntent = (params: { id: string }) => Promise<PaymentData>;
