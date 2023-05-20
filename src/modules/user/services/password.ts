import bcrypt from "bcrypt";
import type { Credentials } from "../../auth/types/credentials";
import { findOneUser } from "../dao/find";

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

export const validateUserPassword = async (
    credentials: Credentials
): Promise<boolean> => {
    const { email, password } = credentials;
    const user = await findOneUser(email);
    if (!user || !user.password) {
        return false;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return !!isPasswordValid;
};
