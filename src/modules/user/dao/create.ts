import { prisma } from "../../../server/db";
import type { Credentials } from "../../auth/types/credentials";
import { hashPassword } from "../services/password";

export const createOneUser = async (credentials: Credentials) => {
    const hashedPassword = await hashPassword(credentials.password);
    const user = await prisma.user.create({
        data: {
            email: credentials.email,
            password: hashedPassword,
        },
    });

    return user;
};
