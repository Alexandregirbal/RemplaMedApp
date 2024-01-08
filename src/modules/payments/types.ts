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

export type CreatePaymentIntent = (params: {
    amount: number;
    description: string;
    webhookUrl: string;
    redirectUrl: string;
    metadata: PaymentMetadata;
    currency?: Currency;
}) => Promise<Payment>;

export type GetPaymentIntent = (params: { id: string }) => Promise<Payment>;
