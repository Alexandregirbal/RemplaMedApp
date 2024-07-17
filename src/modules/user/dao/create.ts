import { UserModel } from "server/database/models/user/model";
import mongooseConnect from "server/database/mongoose";
import { hashPassword } from "../services/password";

export const createOneUser = async (params: {
    email: string;
    password: string;
    name: string;
    description: string;
    phoneNumber?: string;
}) => {
    try {
        await mongooseConnect();
        const { email, password, name, description, phoneNumber } = params;
        const hashedPassword = await hashPassword(password);
        const user = await UserModel.create({
            email: email.toLowerCase(),
            password: hashedPassword,
            name,
            description,
            phoneNumber,
        });

        return user;
    } catch (error) {
        return null;
    }
};
