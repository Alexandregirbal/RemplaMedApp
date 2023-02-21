import Credentials from "next-auth/providers/credentials";

const credentialsProvider = Credentials({
    id: "credentials_provider",
    name: "Credentials",
    type: "credentials",
    credentials: {
        email: {
            label: "email",
            type: "email",
            placeholder: "email@gmail.com",
        },
        password: { label: "Password", type: "password" },
    },
    authorize(credentials) {
        console.log(credentials);
        const user = {
            id: "1",
            name: "John Smith",
        };
        if (!user) {
            return null;
        }
        return user;
    },
});

export default credentialsProvider;
