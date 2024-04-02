import { UserModel } from "server/database/models/user/model";
import type { User } from "server/database/models/user/types";
import mongooseConnect from "server/database/mongoose";

export const findOneUser = async (
    email: string | undefined
): Promise<User | null> => {
    if (!email) {
        return null;
    }

    try {
        await mongooseConnect();
        const user = await UserModel.findOne({
            where: { email },
        }).lean();

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
