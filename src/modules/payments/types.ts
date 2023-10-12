import type { Payment } from "@mollie/api-client";

export enum Currency {
    EUR = "eur",
    USD = "usd",
}

export type PaymentMetadata = {
    postId: string;
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
