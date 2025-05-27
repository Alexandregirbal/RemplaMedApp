import type { Payment } from "@mollie/api-client";
import { getMollieClient } from "./config";

export type GetPayment = (params: { id: string }) => Promise<Payment>;

export const getPayment: GetPayment = async ({ id }) => {
    return getMollieClient().payments.get(id);
};
