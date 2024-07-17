import type { Types } from "mongoose";

export type BaseMongooseObject = {
    _id: string | Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
