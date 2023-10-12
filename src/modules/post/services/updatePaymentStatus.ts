import { type PaymentStatus } from "@mollie/api-client";

export const updatePaymentStatus = ({
    paymentId,
    status,
}: {
    paymentId: string;
    status: PaymentStatus;
}): number => {
    // TODO: faire la feature bro
    return 0;
};
