import type { Credentials } from "../../auth/types/credentials";
import { findOneUser } from "../dao/find";
import bcrypt from "bcrypt";

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
