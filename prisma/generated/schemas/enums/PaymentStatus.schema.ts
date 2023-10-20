import { z } from "zod";

export const PaymentStatusSchema = z.enum([
    "open",
    "canceled",
    "pending",
    "authorized",
    "expired",
    "failed",
    "paid",
]);
