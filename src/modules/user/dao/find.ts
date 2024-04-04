import type { User } from "@prisma/client";
import { prisma } from "../../../server/db";

export const findOneUser = async (
    email: string | undefined
): Promise<User | null> => {
    if (!email) {
        return null;
    }

    try {
        const user = await prisma.user.findFirstOrThrow({
            where: { email },
        });

        return user;
    } catch (error) {
        return null;
    }
};

export const findUserById = async ({
    userId,
}: {
    userId: string;
}): Promise<Pick<
    User,
    "id" | "email" | "name" | "phoneNumber" | "description"
> | null> => {
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                phoneNumber: true,
                description: true,
            },
        });

        return user;
    } catch (error) {
        return null;
    }
};
