import { prisma } from "../../../server/db";
import type { Credentials } from "../../auth/types/credentials";
import bcrypt from "bcrypt";

export const createOneUser = async (credentials: Credentials) => {
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const user = await prisma.user.create({
        data: {
            email: credentials.email,
            password: hashedPassword,
        },
    });

    return user;
};
