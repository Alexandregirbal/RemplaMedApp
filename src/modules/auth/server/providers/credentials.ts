import { findOneUser } from "modules/user/dao/find";
import { validatePassword } from "modules/user/services/password";
import Credentials from "next-auth/providers/credentials";

const credentialsProvider = Credentials({
    id: "credentials_provider",
    name: "Credentials",
    type: "credentials",
    credentials: {
        email: { label: "email", type: "email" },
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
