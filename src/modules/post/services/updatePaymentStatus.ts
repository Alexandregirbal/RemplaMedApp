import { type PaymentStatus } from "@mollie/api-client";
import { prisma } from "server/db";

export const updatePaymentStatus = async ({
    postId,
    status,
}: {
    postId: string;
    status: PaymentStatus;
}) => {
    const result = await prisma.post.update({
        data: {
            paymentStatus: status,
        },
        where: {
            id: postId,
        },
    });
    return result;
};
