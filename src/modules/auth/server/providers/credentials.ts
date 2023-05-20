import { createOneUser } from "modules/user/dao/create";
import { findOneUser } from "modules/user/dao/find";
import { validateUserPassword } from "modules/user/services/password";
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
        let user = await findOneUser(credentials.email);
        if (user) {
            const isPasswordValid = await validateUserPassword(credentials);
            if (!isPasswordValid) {
                return null;
            }
        } else {
            user = await createOneUser(credentials);
        }
        return user;
    },
});

export default credentialsProvider;
