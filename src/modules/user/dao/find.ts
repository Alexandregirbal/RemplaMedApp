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
