import { UserModel } from "server/database/models/user/model";
import mongooseConnect from "server/database/mongoose";

export const addPostViewed = async (params: {
    postId: string;
    userId: string;
}) => {
    const { postId, userId } = params;
    await mongooseConnect();
    return await UserModel.updateOne(
        {
            id: userId,
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
    const { userId, name } = params;
    await mongooseConnect();
    return await UserModel.updateOne(
        {
            id: userId,
        },
        {
            $set: {
                name,
            },
        }
    );
};
