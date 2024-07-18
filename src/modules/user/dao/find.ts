import mongooseConnect from "server/database/config/mongoose";
import { UserModel } from "server/database/models/user/model";
import type { User } from "server/database/models/user/types";

export const findOneUser = async (
    email: string | undefined
): Promise<User | null> => {
    if (!email) {
        return null;
    }

    try {
        await mongooseConnect();
        const user = await UserModel.findOne({
            email,
        }).lean();

        return user;
    } catch (error) {
        return null;
    }
};

export const findUserById = async ({ userId }: { userId: string }) => {
    try {
        await mongooseConnect();
        const user = await UserModel.findOne(
            {
                _id: userId,
            },
            {
                id: true,
                email: true,
                name: true,
                phoneNumber: true,
                description: true,
            }
        ).lean();

        return user;
    } catch (error) {
        return null;
    }
};
