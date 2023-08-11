import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

export const validatePassword = async (params: {
    password: string;
    hashedPassword: string;
}): Promise<boolean> => {
    const { password, hashedPassword } = params;

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return !!isPasswordValid;
};
