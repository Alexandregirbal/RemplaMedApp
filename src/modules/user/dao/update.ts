import mongooseConnect from "server/database/config/mongoose";
import { UserModel } from "server/database/models/user/model";
import type { UserDescription } from "server/database/models/user/types";

export const addPostViewed = async (params: {
    postId: string;
    userId: string;
}) => {
    const { postId, userId } = params;
    await mongooseConnect();
    return await UserModel.updateOne(
        {
            _id: userId,
        },
        {
            $push: {
                postsViewed: postId,
            },
        }
    );
};

export const updateProfile = async (params: {
    userId: string;
    name?: string;
    phoneNumber?: string;
    description?: UserDescription;
}) => {
    const { userId } = params;
    await mongooseConnect();
    return await UserModel.updateOne(
        {
            _id: userId,
        },
        {
            $set: {
                ...params,
            },
        }
    );
};
