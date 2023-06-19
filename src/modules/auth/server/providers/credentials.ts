import { findOneUser } from "modules/user/dao/find";
import { validatePassword } from "modules/user/services/password";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsProvider = CredentialsProvider({
    id: "credentials",
    name: "Credentials",
    type: "credentials",
    credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
            return null;
        }
        const user = await findOneUser(credentials.email);
        if (user) {
            const isPasswordValid = await validatePassword({
                password: credentials.password,
                hashedPassword: user.password ?? "no_password",
            });
            if (!isPasswordValid) {
                return null;
            }
            return user;
        }
        return null;
    },
});

export default credentialsProvider;
