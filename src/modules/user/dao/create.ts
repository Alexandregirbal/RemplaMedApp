import { prisma } from "server/db";
import { type z } from "zod";
import { type UserDescriptionSchema } from "../../../../prisma/generated/schemas";
import { hashPassword } from "../services/password";

export const createOneUser = async (params: {
    email: string;
    password: string;
    name: string;
    description: z.infer<typeof UserDescriptionSchema>;
    phoneNumber?: string;
}) => {
    const { email, password, name, description, phoneNumber } = params;
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            email: email.toLowerCase(),
            password: hashedPassword,
            name,
            description,
            phoneNumber,
        },
    });

    return user;
};
