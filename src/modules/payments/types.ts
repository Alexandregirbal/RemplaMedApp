import type { Payment } from "@mollie/api-client";

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

export type CreatePayment = (params: {
    amount: number;
    description: string;
    webhookUrl: string;
    redirectUrl: string;
    metadata: PaymentMetadata;
    cancelUrl: string;
    currency?: Currency;
}) => Promise<Payment>;
